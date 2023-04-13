const passport = require("passport");
const ActiveDirectoryStrategy = require("passport-activedirectory");
const dotenv = require("dotenv");

dotenv.config();

class AdConnector {
    init() {
        const AD_URL = process.env.AD_URL;
        const AD_USERNAME = process.env.AD_USERNAME;
        const AD_PASSWORD = process.env.AD_PASSWORD;
        const AD_BASE_DN = process.env.AD_BASE_DN;

        const url = new URL(AD_URL);
        const identifier = 'cn';

        passport.use(new ActiveDirectoryStrategy({
            integrated: false,
            group: 'user',
            ldap: {
                url: url.href,
                baseDN: AD_BASE_DN,
                username: AD_USERNAME,
                password: AD_PASSWORD,
                filter: (username) => {
                    // return `(&(dn=${username})(objectClass=*))`;
                    return `(${identifier}=${username})`;
                }
            }
        }, function (profile, ad, done) {
            ad.isUserMemberOf(profile._json.dn, '', function (err) {
                if (err) return done(err)
                return done(null, profile)
            })
        }))
    }
}

module.exports = AdConnector;
