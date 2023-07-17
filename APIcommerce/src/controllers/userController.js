const Category = require("../models/Category")
const State = require("../models/State")
const User = require("../models/User")
const Ad = require("../models/ad")
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt')

module.exports = {
    getStates: async (req, res) => {
        const states = await State.find()
        res.json({ states })
    },
    info: async (req, res) => {
        const { token } = req.query
        const user = await User.findOne({ token })
        const state = await State.findById(user.state)
        const ads = await Ad.find(user.id.toString())

        let adlist = []
        for (let i in ads) {
            const category = await Category.findById(ads[i].category)
            adlist.push({ ...ads[i], category: category.slug })
        }

        res.json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adlist
        })
    },
    edit: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        const updates = {};

        if (data.name) {
            updates.name = name;
        }

        if (data.email) {
            const emailCheck = await User.findOne({ email: data.email });
            if (emailCheck) {
                return res.json({ error: 'Email já existente.' });
            }
            updates.email = email;
        }

        if (data.state) {
            const stateCheck = await User.findById(data.state);
            if (!stateCheck) {
                return res.json({ error: 'Estado não existe.' });
            }
            updates.state = data.state;
        }

        if (data.password) {
            updates.passwordHash = await bcrypt.hash(data.password, 10);
        }

        await User.findOneAndUpdate({ token: data.token }, { $set: updates });

        res.json({});
    }
}