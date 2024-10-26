import GoogleStrategy from 'passport-google-oidc';
import UserService from './UserService.js';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
        },
        async function verify(issuer, profile, cb) {
            try {
                const photoUrl =
                    profile.photos && profile.photos.length > 0
                        ? profile.photos[0].value
                        : null;
                const email = profile.emails[0].value;
                let existingUser = await UserService.getUser(email);
                if (existingUser) {
                    existingUser.photoUrl = photoUrl;
                    return cb(null, existingUser);
                } else {
                    const payload = {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        photoUrl: photoUrl,
                    };
                    let newUser = await UserService.createUser(payload);
                    console.log('create user success');
                    return cb(null, newUser);
                }
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    ),
);
