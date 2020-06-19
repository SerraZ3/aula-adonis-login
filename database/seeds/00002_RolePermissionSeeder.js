"use strict";

/*
|--------------------------------------------------------------------------
| RolePermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Permission = use("Permission");

class RolePermissionSeeder {
  async run() {
    await Permission.create({
      name: "Create Users",
      slug: "create_users",
      description: "Criar usuário",
    });
    await Permission.create({
      name: "Read Users",
      slug: "read_users",
      description: "Visualizar usuário",
    });
    await Permission.create({
      name: "Update Users",
      slug: "update_users",
      description: "Atualizar usuário",
    });
    await Permission.create({
      name: "Delete Users",
      slug: "delete_users",
      description: "Deletar usuário",
    });
  }
}

module.exports = RolePermissionSeeder;
