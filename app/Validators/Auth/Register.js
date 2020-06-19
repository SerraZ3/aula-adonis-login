"use strict";

class AuthRegister {
  get rules() {
    return {
      // validation rules
      email: "required|email|unique:users,email|string",
      password: "required|confirmed|string",
      username: "required|string",
    };
  }
  get validateAll() {
    return true;
  }
  get messages() {
    return {
      required: "O {{field}} é obrigatório",
      string: "O {{field}} deve ser uma string",
      "email.email": "O e-mail não é válido",
      "email.unique": "bla bla bla",
    };
  }
}

module.exports = AuthRegister;
