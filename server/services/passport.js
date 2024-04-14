const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

//Create Local Strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    console.log(user, "useruser", password);
    //Compare passowrds
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return done(err, false);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  //See if the user ID in the payload exists in our database
  //If it does, call 'done' with that other
  //otherwise, call done without a user object
  User.findById(payload.sub, (err, user) => {
    console.log(err, user);
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
passport.use(jwtLogin);
passport.use(localLogin);
