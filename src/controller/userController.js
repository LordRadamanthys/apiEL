const knex = require('../database/connections')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcrypt')
const authConfig = require('../config/hash.json')
const { use } = require('../routes')
const constats = require('../config/constants')


module.exports = {
    async create(req, res) {
        var { name, password, email, whatsapp, sex, interests, instagram } = req.body
        if (!name || name === '' || name === undefined) return res.status(400).json({ error: 'Nome não pode ser vazio' })
        if (!password || password === ''|| password === undefined) return res.status(400).json({ error: 'Senha não pode ser vazio' })
        if (!email || email === ''|| email === undefined) return res.status(400).json({ error: 'E-mail não pode ser vazio' })
        if (!whatsapp || whatsapp === ''|| whatsapp === undefined) return res.status(400).json({ error: 'Whatsapp não pode ser vazio' })
        if (!sex || sex === ''|| sex === undefined) return res.status(400).json({ error: 'Sexo não pode ser vazio' })
        if (!req.file || req.file.filename === '' ) return res.status(400).json({ error: 'Imagem não pode ser vazio' })

        var hashPassword
        name = name.toLowerCase()
        email = email.toLowerCase()
        sex = sex.toLowerCase()

        const userExist = await knex('users').select('*').where('email', email).first()
        if (userExist) return res.status(400).json({ error: 'Usuario ja existe' })

        await bcryptjs.hash(password, 4).then(response => {
            hashPassword = response
        }).catch(error => {
            console.log(error)
        })

        const trx = await knex.transaction()

        const user = {
            name: name,
            password: hashPassword,
            image: req.file.filename ? req.file.filename : '',
            email: email,
            whatsapp: whatsapp,
            instagram: !instagram ? '' : instagram.toLowerCase() ,
            sex: sex
        }

        const insertedsId = await trx('users').insert(user)
        const user_id = insertedsId[0]

        const interestItems = await interests.split(',')
            .map((item) => Number(item.trim()))
            .map((item_id) => {
                return {
                    userId: user_id,
                    interestId: item_id,
                }
            })
        // console.log(interestItems)
        await trx('user_interest').insert(interestItems)
        trx.commit()
        res.json(user)
        console.log(user)
        // await knex('users').insert({
        //     name: name,
        //     password: hashPassword,
        //     image: req.file.filename ? req.file.filename : '',
        //     email: email,
        //     whatsapp: whatsapp,
        //     sex: sex
        // }).then(response => {

        //     return res.status(200).json(response)
        // }).catch(error => {
        //     return res.status(400).json({ error: error })
        // })
    },

    async update(req, res) {
        var { name, password, whatsapp,instagram } = req.body
        // console.log(whatsapp)
        const user = await knex('users').select('*').where('id', req.userId).first()


        var hashPassword
        name = name.toLowerCase()


        // const user = await knex('users').select('*').where('email', email).first()
        // if (user) return res.status(400).json({ error: 'Usuario ja existe' })
        if (password) {
            await bcryptjs.hash(password, 4).then(response => {
                hashPassword = response
            }).catch(error => {
                console.log(error)
            })
        }

        await knex('users').update({
            name: name ? name : user.name,
            password: password ? hashPassword : user.password,
            image: req.file.filename ? req.file.filename : user.image,
            instagram: instagram,
            whatsapp: whatsapp ? whatsapp : use.whatsapp,
            // sex: sex
        }).where('id', req.userId).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(400).json({ error: error })
        })
    },

    async login(req, res) {
        var { email, password } = req.body

        if (!email || email === '') return res.status(401).json({ error: 'Email ivalido' })
        if (!password || password === '') return res.status(401).json({ error: 'password ivalido' })
        email = email.toLowerCase()
        var user = await knex('users').select().where('email', email).first()
        if (!user) return res.status(400).json({ error: 'Usuario não encontrado' })


        bcryptjs.compare(password, user.password, function (err, result) {
            if (!result) {
                return res.status(400).send({ error: 'invalid password' })
            } else {
                return res.json(formatUserLogin(user, generateToken({ id: user.id })))
            }
        });

    },

    async get(req, res) {
        const { id } = req.params

        await knex('users').select('*').where('id', id).first().then(response => {
            return res.status(200).json(formatUserLogin(response))
        }).catch(error => {
            return res.status(400).json({ error: 'Usuario não encontrado' })
        })
    },

    async getAll(req, res) {

        await knex('users').select('*').then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(400).json({ error: 'nenhum ususario registrado' })
        })
    },


}

function formatUserLogin(user, token) {
    return formatUser = {
        id: user.id,
        token: token,
        name: user.name,
        email: user.email,
        instagram: user.instagram,
        password: user.password,
        image: `${constats.IP_SERVER()}:3333/uploads/profilePics/${user.image}`,
        whatsapp: user.whatsapp,
        sex: user.sex,
    }

}

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.token, {
        expiresIn: 86400,
    })
}