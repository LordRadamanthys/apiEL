const knex = require('knex')

exports.up = function(knex) {
    return knex.schema.createTable('interests', table => {
        table.increments('id')
        table.string('name').notNullable()

    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('interests')

}