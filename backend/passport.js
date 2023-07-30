const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const passport = require("passport");
const User = require('./models/User');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET
TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({ 
          accountId : profile.id,
          provider : profile.provider
      })
      if(!user){
        console.log("Adding new fb user to Db...");
        const user = new User({
          accountId : profile.id,
          userName : profile.displayName,
          provider : profile.provider,
        });
        await user.save();
        return cb(null, profile);
      }
      // User.findOrCreate({googleId:profile.id} , function(err,user){
      //   return cb(err,user);
      // })
      console.log("Facebook user already exists in Db...");
      cb(null, profile);
    } 
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({ 
          accountId : profile.id,
          provider : profile.provider
      })
      if(!user){
        console.log("Adding new fb user to Db...");
        const user = new User({
          accountId : profile.id,
          userName : profile.displayName,
          provider : profile.provider,
        });
        await user.save();
        return cb(null, profile);
      }
      // User.findOrCreate({googleId:profile.id} , function(err,user){
      //   return cb(err,user);
      // })
      console.log("Facebook user already exists in Db...");
      cb(null, profile);
    } 
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({ 
          accountId : profile.id,
          provider : profile.provider
      })
      if(!user){
        console.log("Adding new fb user to Db...");
        const user = new User({
          accountId : profile.id,
          userName : profile.displayName,
          provider : profile.provider,
        });
        await user.save();
        return cb(null, profile);
      }
      // User.findOrCreate({googleId:profile.id} , function(err,user){
      //   return cb(err,user);
      // })
      console.log("Facebook user already exists in Db...");
      cb(null, profile);
    } 
  )
);



passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "/auth/twitter/callback"
},
function(accessToken, refreshToken, profile,  done) {
  done(null , profile)
  // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
}
));


//needed if you want to use sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
