const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const authservice = require('../../app/services/authService')

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            var user = await authservice.findUserAdmin(username)

            if(!user) {
                return done(null,false,{message:'Invalid User'})
            }
            if(!validPassword(user,password)){
                return  done(null,false,{message:'Invalid Password'})
            }

            return done(null,user)
        }catch (e) {
            return done(e)
        }

    }
));
// check password
function validPassword(username,password){
    return username.PASS === password
}
// setting session passport
passport.serializeUser(function(user, done) {
    return done(null, user );
});

passport.deserializeUser(function(user, done) {
    return done (null, user)
})

module.exports = passport
