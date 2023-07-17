const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt')
const User = require('../models/User');
const State = require('../models/State');

module.exports = {
    signin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() })
        }

        const data = matchedData(req)

        const user = await User.findOne({
            email: data.email
        })
        if (!user) {
            res.json({ error: 'E-mail ou senha errados!' })
        }

        const match = await bcrypt.compare(data.password, user.passwordHash)
        if (!match) {
            res.json({ error: 'E-mail ou senha errados!' })
        }

        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)
        user.token = token
        await user.save()

        res.json({ token, email: data.email })

    },
    signup: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() })
        }

        const data = matchedData(req)

        const user = await User.findOne({
            email: data.email
        })
        if (user) {
            res.json({
                error: { email: { msg: "Email já existe." } }
            })
        }
        res.json({ status: true, data })


        const stateItem = await State.findById(data.state)
        if (!stateItem) {
            res.json({
                error: { state: { msg: "Estado já existe." } }
            })
        }
        const passwordHash = await bcrypt(data.password, 10)
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        })
        await newUser.save()

        res.json({ token })
    }
}