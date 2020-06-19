# Aula Adonis - TecnoJr

Aula apresentada para [Associação Empresa Junior de Computação da UESC (TecnoJr)](https://www.tecnojr.com.br/) e qualquer outro estudante da área de computação que tenha o desejo de aprender [AdonisJs](https://adonisjs.com/)

**Desenvolvido por:**
[Henrique A. Serra](https://github.com/SerraZ3/) :smile: :metal:

## Configuração inicial

### Configuração .env

Copie o `.env.example` e renomeie para `.env`. Preencha os dados do email de envio e seu banco de dados.

### Chave da aplicação

Rode o seguinte comando para gerar a chave da aplicação

```bash
adonis key:generate
```

### Instalar dependencias

Para instalar as dependencias rode:

```bash
adonis install
```

ou

```bash
npm install
```

ou

```bash
yarn install
```

### Migrations e seeds

Para rodar as migrations e os seed, rode:

```bash
adonis migration:run && adonis seed
```

### Run server

Para rodar o servidor rode:

```bash
adonis serve
```

ou

```bash
adonis serve --dev
```
