const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

//Create Local Strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    console.log(err, user, "err, usererr, user");
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    //Compare passowrds
    bcrypt.compare(password, user.password, (err, isMatch) => {
      console.log(err, isMatch, "err, isMatcherr, isMatch");
      if (err) {
        return done(err, false);
      }

      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    });
  });
});

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_SECRET,
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  //See if the user ID in the payload exists in our database
  //If it does, call 'done' with that other
  //otherwise, call done without a user object
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//Tell passport to use this strategy
passport.use(localLogin);
passport.use(jwtLogin);
