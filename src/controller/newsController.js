const knex = require('../database/connections')

module.exports = {
    async create(req, res) {

        const { title, description, text, idAuthor } = req.body
        if (!title || title === '') return res.status(400).json({ error: 'titulo não pode ser vazio' })
        if (!text || text === '') return res.status(400).json({ error: 'Conteudo não pode ser vazio' })
        if (!idAuthor) return res.status(400).json({ error: 'Necessário um autor' })

        await knex('news').insert({
            title,
            description,
            image: req.file.filename ? req.file.filename : '',
            text,
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
        image: `http://192.168.15.11:3333/uploads/newsPics/${data.image}`,
        description: data.description,
        text: data.text,
        idAuthor: data.idAuthor,
    }

}