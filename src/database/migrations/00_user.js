const knex = require('knex')

exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('password').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('sex').notNullable()
        table.string('image')
        table.string('instagram')
        table.string('twitter')
        table.string('linkedin')

    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users')

}