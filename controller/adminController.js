const { userModel } = require("../database");

const adminController = {

    listSessions: (req, res) => {

        // gets all the active sessions and parses(converts) them into a object
        const parseSession = JSON.parse(JSON.stringify(req.sessionStore.sessions))
        res.render('admin/index', {
            sessions: parseSession,
            userModel: userModel,
        });
    },

    revokeSession: (req, res) => {
        req.sessionStore.destroy(req.params.sessionId);
        res.redirect('/admin');
    },
}

module.exports = adminController;