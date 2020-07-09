const knex = require('knex')

exports.up = function(knex) {
    return knex.schema.createTable('user_interest', table => {
        table.increments('id')
        table.string('userId').references('users.id')
        table.integer('interestId').unsigned().notNullable()
        table.foreign('interestId').references('id').inTable('interests')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('user_interest')
}