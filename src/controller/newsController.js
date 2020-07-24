const knex = require('../database/connections')
const constats = require('../config/constants')

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
    },

    async get(req, res) {
        const { id } = req.params
        if (!id) return res.status(400).json({ error: 'invalid id' })

        const news = await knex('news').select('*').where('id', id).first()

        if (!news) return res.status(400).json({ error: 'não encontramos essa noticia' })

        return res.json(formatData(news, 'get'))
    },

    async getAll(req, res) {
        const news = await knex('news').select('*')

        if (!news) return res.status(400).json({ error: 'sem registros' })

        return res.json(formatData(news, 'getAll'))
    },

}

function formatData(data, type) {
   // console.log(data.length)
    if (type === 'get') {
       // console.log('i')
        return formatUser = {
            id: data.id,
            title: data.title,
            image: `${constats.IP_SERVER()}:3333/uploads/newsPics/${data.image}`,
            description: data.description,
            text: data.text,
            idAuthor: data.idAuthor,
        }

    } else {
        var newData = []
        data.map(d => {
            newData.push({
                id: d.id,
                title: d.title,
                image: `${constats.IP_SERVER()}:3333/uploads/newsPics/${d.image}`,
                description: d.description,
                text: d.text,
                idAuthor: d.idAuthor,
            })
        })

      //  console.log(constats.IP_SERVER())
        return newData
    }

}