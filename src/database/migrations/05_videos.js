const knex = require('knex')

exports.up = function(knex) {
    return knex.schema.createTable('videos', table => {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.string('path').notNullable()
        table.string('description')
        table.integer('idAuthor').unsigned().notNullable()
        table.foreign('idAuthor').references('id').inTable('users')

    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('videos')

}