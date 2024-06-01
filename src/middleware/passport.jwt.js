const db = require("../../model/database")
const UserModel = db.user

const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy
const   ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'chien2811';

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {

    const user = await UserModel.findOne({where:{"id": jwt_payload.id}})

    if(!user) return done(err, false);
    
    return done(null, user);
}));

