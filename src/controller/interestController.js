const knex = require('../database/connections')

module.exports = {

    async create(req, res) {
        const { name } = req.body
        if (!name || name === '') return res.status(400).json({ error: 'Nome não pode ser vazio' })

        const formatName = name.toLowerCase()
        const interest = await knex('interests').select('*').where('name', formatName).first()

        if (interest) return res.status(400).json({ error: 'Ja existe esse interesse cadastrado' })

        await knex('interests').insert({
            name: formatName
        }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(400).json({ error: error })
        })

    },

    async get(req, res) {
        const { id } = req.params
        if (!id) return res.status(400).json({ error: 'inavlid id' })

        const interest = await knex('interests').select('*').where('id', id).first()
        if (!interest) return res.status(400).json({ error: 'interesse não encontrado' })

        return res.json(interest)
    },

    async getAll(req, res) {
        const interests = await knex('interests').select('*')
        if (!interests) return res.status(400).json({ error: 'sem registro' })

        return res.json(interests)
    }


}