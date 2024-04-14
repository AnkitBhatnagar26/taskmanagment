const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = (app) => {
  app.get("/api", (req, res) => {
    res.status(200).json({
      code: 200,
      msg: "Welcome to server!!!",
    });
  });
  app.post("/signIn", requireSignin, Authentication.signIn);
  app.post("/signUp", Authentication.signUp);

  app.post("/forgotPassword", Authentication.forgotPassword);

  app.get("/resetPassword/:id/:token", Authentication.resetPassword);

  app.post("/resetPassword/:id/:token", Authentication.resetUserPassword);
};
