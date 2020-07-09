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

    }
}

function formatUserLogin(data) {
    return formatUser = {
        id: data.id,
        title: data.title,
        path: `http://192.168.15.11:3333/uploads/videos/${data.path}`,
        description: data.description,
        idAuthor: data.idAuthor,
    }

}