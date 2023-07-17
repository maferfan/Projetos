const User = require("../models/User")

module.exports = {
    private: async (req, res, next) => {
        const token = req.query.token || req.body.token;

        if (!token) {
            res.json({ notallowed: true });
            return;
        }

        const user = await User.findOne({ token });

        if (!user) {
            res.json({ notallowed: true });
            return;
        }

        next();
    }
}