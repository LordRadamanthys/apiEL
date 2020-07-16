const knex = require('../database/connections')

module.exports = {

    async create(req, res) {
        const { title, description, idAuthor } = req.body
        if (!title || title === '') return res.status(400).json({ error: 'titulo não pode ser vazio' })
        if (!description || description === '') return res.status(400).json({ error: 'Conteudo não pode ser vazio' })
        if (!idAuthor) return res.status(400).json({ error: 'Necessário um autor' })

        await knex('videos').insert({
            title,
            description,
            path: req.file.filename ? req.file.filename : '',
            idAuthor
        }).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            res.status(400).json({ error: error })
        })

    },

    async get(req, res) {
        const { id } = req.params
        if (!id) return res.status(400).json({ error: 'invalid id' })

        const video = await knex('videos').select('*').where('id', id).first()

        if (!video) return res.status(400).json({ error: 'não existe o registro' })

        res.json(formatData(video, 'get'))
    },

    async getAll(req, res) {
        const video = await knex('videos').select('*')

        if (!video) return res.status(400).json({ error: 'não existe o registro' })

        res.json(formatData(video, 'getAll'))
    }
}

function formatData(data, type) {
    if (type === 'get') {
        return formatUser = {
            id: data.id,
            title: data.title,
            path: `http://192.168.15.7:3333/uploads/videos/${data.path}`,
            description: data.description,
            idAuthor: data.idAuthor,
        }
    } else {
        var newData = []
        data.map(d => {
            newData.push({
                id: d.id,
                title: d.title,
                path: `http://192.168.15.7:3333/uploads/videos/${d.path}`,
                description: d.description,
                idAuthor: d.idAuthor,
            })
        })

       // console.log(data)
        return newData
    }
}