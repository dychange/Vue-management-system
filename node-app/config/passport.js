const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const {secretKey} = require('./keys')
const query = require('./db/query')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload)
        query('SELECT * FROM users WHERE id = ?', jwt_payload.id)
            .then(user => {
                if (user.length !== 0) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
    }))
}