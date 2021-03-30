const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({
        googleId: profile.id
    }).then(existingUser => {
        if (existingUser) {
            //No work need to be done as  user already exists.
            done(null, existingUser);
        } else {
            //Adding new user.
            new User({
                    googleId: profile.id,
                    name: profile.displayName
                }).save()
                .then(User => {
                    done(null, User);
                });
        }
    })
}));
passport.use(new FacebookStrategy({
    clientID: keys.facebookAppId,
    clientSecret: keys.facebookSecret,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({
        facebookAppId: profile.id
    }).then(existingUser => {
        if (existingUser) {
            //No work need to be done as  user already exists.
            done(null, existingUser);
        } else {
            //Adding new user.
            new User({
                    facebookAppId: profile.id,
                    name: profile.displayName
                }).save()
                .then(User => {
                    done(null, User);
                });
        }
    })
}));