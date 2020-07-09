const knex = require('../database/connections')

module.exports = {

    async create(req, res) {
        const { name } = req.body
        if (!name || name === '') return res.status(400).json({ error: 'Nome não pode ser vazio' })

        const formatName = name.toLowerCase()
        const interest = await knex('interests').select('*').where('name',formatName).first()

        if(interest) return res.status(400).json({error:'Ja existe esse interesse cadastrado'})

        await knex('interests').insert({
            name:formatName
        }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return  res.status(400).json({ error: error })
        })

    }
}