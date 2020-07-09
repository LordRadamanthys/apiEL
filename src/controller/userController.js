const knex = require('../database/connections')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcrypt')
const authConfig = require('../config/hash.json')


module.exports = {
    async create(req, res) {
        var { name, password, email, whatsapp, sex } = req.body
        var hashPassword
        name = name.toLowerCase()
        email = email.toLowerCase()
        sex = sex.toLowerCase()

        const user = await knex('users').select('*').where('email', email).first()
        if (user) return res.status(400).json({ error: 'Usuario ja existe' })

        await bcryptjs.hash(password, 4).then(response => {
            hashPassword = response
        }).catch(error => {
            console.log(error)
        })

        await knex('users').insert({
            name: name,
            password: hashPassword,
            image: req.file.filename ? req.file.filename : '',
            email: email,
            whatsapp: whatsapp,
            sex: sex
        }).then(response => {

            return res.status(200).json(response)
        }).catch(error => {
            return res.status(400).json({ error: error })
        })
    },

    async login(req, res) {
        var { email, password } = req.body
        email = email.toLowerCase()
        if (!email || email === '') return res.status(401).json({ error: 'Email ivalido' })
        if (!password || password === '') return res.status(401).json({ error: 'password ivalido' })

        var user = await knex('users').select().where('email', email).first()
        if (!user) return res.status(400).json({ error: 'Usuario não encontrado' })


        bcryptjs.compare(password, user.password, function (err, result) {
            if (!result) {
                return res.status(400).send({ error: 'invalid password' })
            } else {
                return res.json(formatUserLogin(user, generateToken({ id: user.id })))
            }
        });



    }
}

function formatUserLogin(user, token) {
    return formatUser = {
        id: user.id,
        toke: token,
        name: user.name,
        email: user.email,
        password: user.password,
        image: `http://192.168.15.11:3333/uploads/profilePics/${user.image}`,
        whatsapp: user.whatsapp,
        sex: user.sex,
    }

}

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.token, {
        expiresIn: 86400,
    })
}