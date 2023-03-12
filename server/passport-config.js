const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByUsername){
    const authenticateUser = async(username, password, done) => {
        const user = getUserByUsername(username)
        if(user == null){
            return done(null, false, {message: 'No User Found' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password Incorrect'})
            }
        } catch (e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy(), authenticateUser)
    passport.serializeUser((user, done) => { })
    passport.deSerializeUser((id, done) => { })
}

module.exports = initialize