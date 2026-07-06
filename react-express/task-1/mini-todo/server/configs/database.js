module.exports = {
  development: {
    client: "postgres",
    dialect: "postgres",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "admin123",
      database: "learning_db",
    },
  },
};
