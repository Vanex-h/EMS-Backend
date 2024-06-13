const joi= require('joi');
const CreateEmployee = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    national_id: joi.string().required(),
    telephone: joi.string().required(),
    email: joi.string().email().required(),
    department: joi.string().required(),
    position: joi.string().required(),
    laptop_manufacturer: joi.string().required(),
    model: joi.string().required(),
    serial_number: joi.number().required(),

   
});
module.exports = {
    CreateEmployee,
}