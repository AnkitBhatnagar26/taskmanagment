const jwt = require("jwt-simple");
const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const { SERVER_URL } = require("../constants");
const passport = require("passport");

const requireSignin = passport.authenticate("local");

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, process.env.JWT_SECRET);
};

exports.signIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message }); // Send custom message from Passport.js
    }

    const token = tokenForUser(user);
    res.send({ token, user: { email: user.email, role: user.role } });
  })(req, res, next);
};

exports.signUp = (req, res, next) => {
  //see if a user with the given email exists
  const { email, password, confirmPassword, ...rest } = req.body;

  if (!email || !password) {
    return res.send({ error: "You must provide email and password " });
  }

  if (password !== confirmPassword) {
    return res.send({ error: "Passwords doen't match!" });
  }

  //See if a user with the given email exists
  User.findOne({ email: email }, (err, exisitingUser) => {
    if (err) {
      return next(err);
    }

    if (exisitingUser) {
      return res.send({ error: "Email is in use" });
    }

    const user = new User({
      email,
      password,
      ...rest,
    });

    user.save((err) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        message:
          "Thank you for signing Up, Please login with yout credentials.",
        // message: "An activation email has been sent to your email.",
      });
    });
  });
};

exports.forgotPassword = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.send({ error: "You must provide email" });
  }

  //See if a user with the given email exists
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.send({
        error: `There is no account associated with ${req.body.email}`,
      });
    }

    const { _id: id, email } = user;

    const secret = config.secret + user.password;
    const payload = {
      email,
      id,
    };
    try {
      const token = jsonwebtoken.sign(payload, secret, { expiresIn: "15m" });
      const resetPassworkLink = `${SERVER_URL}/resetPassword/${id}/${token}`;

      console.log(resetPassworkLink, "resetPassworkLink");

      return res.status(200).send({
        message: `Password verification link has been sent to your mail!`,
      });
    } catch ({ message }) {
      return res.status(422).send({ message });
    }
  });
};

exports.resetPassword = (req, res, next) => {
  const { id, token } = req.params;
  console.log("I am here!");
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.send({
        error: `No User found!`,
      });
    }

    const secret = config.secret + user.password;
    try {
      const payload = jsonwebtoken.verify(token, secret);
      console.log(payload, "payload");
      if (payload) {
        res.status(200).json({ message: "Verified User!" });
      }
    } catch (e) {
      return res.send({ error: "Token is not valid!" });
    }
  });
};

exports.resetUserPassword = (req, res, next) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send({
      error: `Passwords doesn't matched!`,
    });
  }

  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.send({
        error: `No User found!`,
      });
    }

    const secret = config.secret + user.password;

    try {
      const payload = jsonwebtoken.verify(token, secret);

      if (payload.id !== id) {
        return next(err);
      }

      User.findOneAndUpdate({ _id: id }, { password }).then(() => {
        user.save((err) => {
          if (err) {
            return next(err);
          }

          return res
            .status(200)
            .json({ message: "Password has been changed!" });
        });
      });
    } catch (e) {}
  });
};
