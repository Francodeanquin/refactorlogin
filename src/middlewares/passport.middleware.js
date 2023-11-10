import passport from 'passport';
import { usersManager } from '../managers/usersManager.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { hashData, compareData } from '../utils.js';


//Local
passport.use("signup", new LocalStrategy(
    {
        usernameField: "email",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const userFound = await usersManager.findByEmail(email);
            if (userFound) {
                return done(null, false);
            }
            const hashedPass = await hashData(password);
            const createdUser = await usersManager.createOne({ ...req.body, password: hashedPass });
            done(null, createdUser);
        } catch (error) {
            done(error);
        }
    }
))


passport.use("login", new LocalStrategy(
    {
        usernameField: "email",
    },
    async (email, password, done) => {
        try {
            const userFound = await usersManager.findByEmail(email);
            if (!userFound) {
                return done(null, false);
            }
            const comparePass = await compareData(password, userFound.password);
            if (!comparePass) {
                return done(null, false);
            }
            done(null, userFound);
        } catch (error) {
            done(error);
        }
    }
))

//Github
passport.use("github", new GithubStrategy(
    {
        clientID: 'Iv1.88d7c3501b644d73',
        clientSecret: '3671e63eed1e36f75d05335b1b986966b0762462',
        callbackURL: "http://localhost:8080/api/users/github"
    },
    async (accessToken, refreshToken, profile, done) => {
        const hashedPass = await hashData("password")
        try {
            const userFound = await usersManager.findByEmail(profile._json.email);
            //login
            if (userFound) {
                if (userFound.from_github) {
                    return done(null, userFound);
                } else {
                    return done(null, false);
                }
            } else {
                //signup
                const newUser = {
                    first_name: profile._json.name.split(" ")[0],
                    last_name: profile._json.name.split(" ")[1],
                    email: profile._json.email,
                    age: 18,
                    password: hashedPass,
                    isAdmin: profile._json.email === "adminCoder@coder.com" && this.password === "adminCod3r123" ? true : false,
                    from_github: true,
                }
                const createdUser = await usersManager.createOne(newUser);
                done(null, createdUser);
            }
        } catch (error) {
            done(error);
        }
    }
))

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await usersManager.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});