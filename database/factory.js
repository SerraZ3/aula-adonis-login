"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/User", (faker, idx, data) => {
  return {
    username: data.username ? data.username : faker.username(),
    email: data.email ? data.email : faker.email({ domain: "tecnojr.com.br" }),
    password: data.password ? data.password : "henrique123",
  };
});

Factory.blueprint("App/Models/Person", (faker) => {
  return {
    name: faker.name(),
    cpf: faker.integer({ min: 10000000, max: 99999999 }),
  };
});
