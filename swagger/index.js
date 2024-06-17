const swaggerAutogen = require("swagger-autogen")
const doc = {
    info: {
        version: '1.0.0',
        title: 'NE Preparation MS API',
        description: ''
    },
    host: 'localhost:1500',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            LoginDto: {
                username: "",
                password: ""
            },
            CreateUserDto: {
                email: "",
                password: "",
                // phoneNumber: ""
            },
            RegisterLaptopDto: {
                manufacturer: "",
                model: "",
                serialNumber: "",
            },
            CreateEmployeeDto: {
                firstName: "",
                lastName: "",
                nationalIdentity: "",
                telephone: "",
                email: "",
                department: "",
                position: ""
            }
        }
    }
    ,
    tags: [
        {
            name: 'User',
            description: 'User endpoints'
        },
        // {
        //     name: 'Laptop',
        //     description: 'Laptops endpoints'
        // },
        {
            name: 'Employee',
            description: 'Employee endpoints'
        },
        // {
        //     name: 'Auth',
        //     description: 'Auth endpoints'
        // },
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    definitions: {}
}
const outputFile = './swagger/doc/swagger.json';
const routes = ['../routes/index.js'];
swaggerAutogen({ openapi: '3.0.0', autoQuery: false ,autoHeaders:false})(outputFile, routes, doc).then(async () => {
    await import('../index.js');
});