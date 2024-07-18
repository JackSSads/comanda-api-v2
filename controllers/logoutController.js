module.exports = class LogoutController {
    static async logout(req, res) {
        res.clearCookie('Authorization', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });
        res.redirect('/login');
    };
};