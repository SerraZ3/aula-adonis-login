"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PersonSchema extends Schema {
  up() {
    this.create("people", (table) => {
      table.increments();
      table.string("name", 100).notNullable();
      table.integer("cpf").notNullable();
      table.enu("sexo", ["M", "F", "O"]).default("O");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("people");
  }
}

module.exports = PersonSchema;
