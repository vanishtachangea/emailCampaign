//prod keys here!!
//pull environment variables from heroku
module.exports = {
    googleClientID: process.env.GOOGLE_Client_ID,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    mongoURI:process.env.MONGO_URI,
    cookieKey:process.env.COOKIE_KEY
}