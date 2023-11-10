import { Router } from 'express';
import passport from 'passport';

const router = Router();

//passport-local
router.post("/login", passport.authenticate('login', {successRedirect: "/products", failureRedirect: "/loginerror"}))

router.post("/signup", passport.authenticate('signup', {successRedirect: "/", failureRedirect: "/signuperror"}))

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
})

//passport-github2
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github', 
  passport.authenticate('github', { failureRedirect: '/loginerror', successRedirect: "/products" }));

export default router;