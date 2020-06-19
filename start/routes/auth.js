const Route = use("Route");

Route.group(() => {
  // Responsavel por criar um usuario
  Route.post("register", "AuthController.register")
    .as("auth.register")
    .middleware("guest")
    .validator("Auth/Register");

  // Faz log in do usário
  Route.post("login", "AuthController.login")
    .as("auth.login")
    .middleware("guest");

  Route.get("role-permission", "AuthController.rolePermission")
    .as("auth.role-permission")
    .middleware("auth:jwt");

  Route.post("refresh", "AuthController.refresh")
    .as("auth.refresh")
    .middleware("guest");

  Route.post("logout", "AuthController.logout")
    .as("auth.logout")
    .middleware("auth:jwt");

  Route.post("reset-password", "AuthController.forgot")
    .as("auth.forgot")
    .middleware("guest");

  Route.get("reset-password", "AuthController.remember")
    .as("auth.remember")
    .middleware("guest");

  Route.put("reset-password", "AuthController.reset")
    .as("auth.reset")
    .middleware("guest");
})
  .prefix("api/v1")
  .namespace("Auth");
