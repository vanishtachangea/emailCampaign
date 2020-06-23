const passport = require('passport');
module.exports =function(app){
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email']
    })
    );

    app.get('/auth/google/callback',passport.authenticate('google'));

    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.send(req.user);
    });
    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);//someone who has been authenticated can use the user
    });

}
