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
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    national_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telephone: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    laptop_manufacturer: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    serial_number: {
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
