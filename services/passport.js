const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

//user pulled from database -> take that model and generate info .. turns it into ID in COOKIE
//MONGOOSE MODEL TO COOKIE
passport.serializeUser((user,done)=>{
    done(null, user.id);
});

//id from cookie AND CONVERT IT into user model
//COOKIE TO MONGOOSE MODEL
passport.deserializeUser((id, done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    });
})
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL :'/auth/google/callback'
}, (accessToken, refreshToken, profile, done)=>{
    //console.log('accessToken', accessToken);
    //console.log('refreshToken', refreshToken);
    //console.log('profile', profile);
    User.findOne({googleId:profile.id}).then(
        (existingUser)=>{
            console.log(existingUser);
            if(existingUser){
                //we already have a record with profileId
                done(null, existingUser);
            }
            else 
            {
                //we don't have a user with Id 
                new User({googleId:profile.id}).save().then
                    (user=>done(null,user));
            
                
            }
        }
    )
    
}));