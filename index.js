const express = require('express');
//const passportConfig = require=('./services/passport');

require('./models/User');
const passport = require('passport');


require('./services/passport');
//const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
//const passport = require('passport');

const keys = require('./config/keys');



const app = express();
 app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]
    })
); 
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

//authRoutes(app); // same as below


require('./routes/authRoutes')(app);

app.get('/',(req, res)=>{
res.send({
    hi:"theresdfdsfd sfdsfdsdf"
})
});



const PORT = process.env.PORT || 5000;
app.listen(PORT);