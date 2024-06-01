const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "mysql",
  username: "Vanessa",
  password: "myroxane5",
  database: "first",
  host: "localhost",
  port: 3306, 
});

const Employee = sequelize.define(
  "employees",
  {
    ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    FirstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    National_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Telephone: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Laptop_manufacturer: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Serial_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        name: "tb_firstName",
        fields: ["FirstName"],
      },
      {
        name: "tb_lastName",
        fields: ["LastName"],
      },
      {
        name: "tb_national_id",
        fields: ["National_id"],
      },
      {
        name: "tb_telephone",
        fields: ["Telephone"],
      },
      {
        name: "tb_email",
        fields: ["Email"],
      },
      {
        name: "tb_department",
        fields: ["Department"],
      },
      {
        name: "tb_position",
        fields: ["Position"],
      },
      {
        name: "tb_laptop_manufacturer",
        fields: ["Laptop_manufacturer"],
      },
      {
        name: "tb_model",
        fields: ["Model"],
      },
      {
        name: "tb_serial_number",
        fields: ["Serial_number"],
      },
  
    ],
  }
);
Employee.sync({ alter: true })
  .then(() => {
    console.log("Employee table created successfully");
  })
  .catch((error) => {
    console.error("Error creating Data table:", error);
  });

module.exports = Employee;
