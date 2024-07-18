module.exports = class LogoutController {
    static async logout(req, res) {
        res.clearCookie('Authorization');
        res.redirect('/login');
    };
};