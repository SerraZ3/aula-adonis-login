"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * PersonTransformer class
 *
 * @class PersonTransformer
 * @constructor
 */
class PersonTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      // add your transformation object here
      id: model.id,
      name: model.name,
      sexo: model.sexo,
      cpf: model.namecpf,
    };
  }
}

module.exports = PersonTransformer;
