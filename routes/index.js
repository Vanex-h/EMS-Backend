const express = require("express");
const router = express.Router();

const employeeRoutes = require("./employee.routes");
const userRoutes = require("./user.routes");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.use("/employees", isAuthenticated, employeeRoutes
    /*
#swagger.tags = ['Employee']
#swagger.security = [{
    "bearerAuth": []
    }] 
    */
);
router.use("/users", userRoutes
    /*
#swagger.tags = ['User']
#swagger.security = [{
    "bearerAuth": []
    }] 
    */
);

module.exports = router;