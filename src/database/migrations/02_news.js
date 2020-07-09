const knex = require('knex')

exports.up = function(knex) {
    return knex.schema.createTable('news', table => {
        table.increments('id')
        table.string('title').notNullable()
        table.string('image').notNullable()
        table.string('description').notNullable()
        table.string('text').notNullable()
        table.integer('idAuthor').unsigned().notNullable()
        table.foreign('idAuthor').references('id').inTable('users')

    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('news')

}