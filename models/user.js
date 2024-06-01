const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "mysql",
  username: "Vanessa",
  password: "myroxane5",
  database: "first",
  host: "localhost",
  port: 3306, 
});

const User = sequelize.define(
  "users",
  {
    ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Names: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Telephone: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        name: "tb_Names",
        fields: ["Names"],
      },
      {
        name: "tb_email",
        fields: ["Email"],
      },
      {
        name: "tb_telephone",
        fields: ["Telephone"],
      },
      {
        name: "tb_password",
        fields: ["Password"],
      },
    ],
  }
);

User.sync({ alter: true })
  .then(() => {
    console.log("Data table created successfully");
  })
  .catch((error) => {
    console.error("Error creating Data table:", error);
  });

module.exports = User;
