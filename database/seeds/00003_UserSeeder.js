"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UserSeeder {
  async run() {
    // Cria varios usuários
    let users = await Factory.model("App/Models/User").createMany(20);
    // Cria varias pessoas
    let people = await Factory.model("App/Models/Person").makeMany(20);

    // Mapeia usuarios
    await Promise.all(
      users.map(async (user, idx) => {
        // Vincula pessoa a usuário
        await user.person().save(people[idx]);
        // Vincula regra de cliente para usuário
        await user.roles().attach([2]);
      })
    );

    // Cria administrador
    let userAdmin = await Factory.model("App/Models/User").create({
      username: "Henrique",
      email: "henrique123@tecnojr.com.br",
      password: "tecnojr123",
    });

    // Cria pessoa para administrador
    const personAdmin = await Factory.model("App/Models/Person").make();

    // Atribui pessoa para admin
    await userAdmin.person().save(personAdmin);

    // Vincula regra de admin para o userAdmin
    await userAdmin.roles().attach([1]);
  }
}

module.exports = UserSeeder;
