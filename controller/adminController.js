    const adminController = {

        listSessions: (req, res) => {

            const sessionsToShow = [];

            // super cursed, should rewrite soon tm
            Array.of(req.sessionStore.sessions).forEach(sessions => {
                const sessionId =  Object.keys(sessions)[0];
                Object.values(sessions).forEach(session => {
                    sessionsToShow[sessionId] = JSON.parse(session)
                });
            });

            res.render('admin/index', {
                sessions: sessionsToShow
            });
        },

        revokeSession: (req, res) => {
            req.sessionStore.destroy(req.params.sessionId);
            res.redirect('/admin');
        }

    }

    module.exports = adminController;