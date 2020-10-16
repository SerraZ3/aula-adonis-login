"use strict";

const User = use("App/Models/User");
const Database = use("Database");
const Transform = use("App/Transformers/UserTransformer");

const Role = use("Role");

const Token = use("App/Models/Token");
const Mail = use("Mail");
const Hash = use("Hash");

const Env = use("Env");

class AuthController {
  async register({ request, response, transform }) {
    const trx = await Database.beginTransaction();
    try {
      const { email, password, username, person } = request.all();

      let user = await User.create({ email, password, username }, trx);

      if (person) {
        await user.person().create(person, trx);
      }

      const userRole = await Role.findBy("slug", "client");

      await user.roles().attach([userRole.id], null, trx);

      await trx.commit();

      user = await transform.item(user, Transform);

      response.status(201).send(user);
    } catch (error) {
      await trx.rollback();

      response
        .status(401)
        .send({ message: "Não foi possivel cadastrar o usuário" });
    }
  }
  async login({ request, response, auth }) {
    const { email, password } = request.all();

    let data = await auth.withRefreshToken().attempt(email, password);

    return response.send({ data, message: "Seja bem-vindo!" });
  }
  async rolePermission({ response, auth }) {
    let user = await auth.getUser();

    let userRoles = await user.getRoles();

    let userPermissions = await user.getPermissions();

    const data = { roles: userRoles, permissions: userPermissions };

    return response.send({ data });
  }
  async refresh({ request, response, auth }) {
    let refresh_token = request.input("refresh_token");

    if (!refresh_token) {
      refresh_token = request.header("refresh_token");
    }

    let data = await auth
      .newRefreshToken()
      .generateForRefreshToken(refresh_token);

    return response.send({ data });
  }

  async logout({ request, response, auth }) {
    let refresh_token = request.input("refresh_token");

    if (!refresh_token) {
      refresh_token = request.header("refresh_token");
    }

    await auth.authenticator("jwt").revokeTokens([refresh_token], true);

    return response.status(204).send({});
  }
  async forgot({ request, response }) {
    const trx = await Database.beginTransaction();
    try {
      let email = request.input("email");

      let user = await User.findBy("email", email);
      let person = await user.person().fetch();

      if (!user) {
        throw {
          code: 1234,
          message: "E-mail inválido",
        };
      }
      let type = "reset_password";
      let token = await Hash.make(`reset-${user.id}-${type}`);

      let user_id = user.id;
      let is_revoked = false;

      let newToken = await Token.create(
        {
          user_id,
          token,
          type,
          is_revoked,
        },
        trx
      );

      if (!newToken) {
        throw {
          error: 12345,
          message: "Erro ao gerar token",
        };
      }
      let configMail = {
        name: person.name,
        url: `https://tecnojr.com.br/reset-password?token=${token}`,
        equipe: "Equipe TecnoJr",
      };
      let mail = await Mail.send(
        "emails.new-password",
        configMail,
        (message) => {
          message.from("foo@bar.com");
          message.to("serra.henrique3@gmail.com");
          message.subject("Recuperação de senha");
        }
      );

      if (!mail) {
        throw {
          code: 12,
          message: "erro ao enviar email",
        };
      }

      await trx.commit();

      return response
        .status(200)
        .send({ message: "E-mail de recuperação enviado" });
    } catch (error) {
      console.log(error);
      await trx.rollback();
      return response.status(400).send({ message: "Erro ao enviar email" });
    }
  }
  async remember({ request, response }) {
    try {
      let token = request.input("token");

      let tokenConfirm = await Token.query()
        .where({
          token: token,
          is_revoked: false,
          type: "reset_password",
        })
        .fetch();
      if (tokenConfirm.rows.length === 0) {
        throw {
          code: 1234,
          message: "Token inválido",
        };
      }

      return response.status(200).send({ message: "Token válido" });
    } catch (error) {
      return response.status(400).send({ message: "Token inválido" });
    }
  }
  async reset({ request, response }) {
    const trx = await Database.beginTransaction();
    try {
      let { token, password } = request.all();

      let tokenConfirm = await Token.findBy({ token, is_revoked: false });

      if (!tokenConfirm) {
        throw {
          code: 1234,
          message: "Token inválido",
        };
      }
      tokenConfirm.merge({
        is_revoked: true,
      });
      await tokenConfirm.save(trx);

      let user = await User.find(tokenConfirm.user_id);
      user.merge({
        password,
      });

      await user.save(trx);

      await trx.commit();

      return response
        .status(200)
        .send({ message: "Nova senha registrada. Tente realizar Login" });
    } catch (error) {
      await trx.rollback();
      return response.status(400).send({ message: "Erro ao alterar senha" });
    }
  }
}

module.exports = AuthController;
