/**
 * Created by john.nana on 11/9/2016.
 */
var express = require('express');
var router = express.Router();

var rek = require("rekuire");
var Employee = rek("Employee");
var empCtrl = rek("empCtrl")(Employee);

//register employee
router.post("/register",empCtrl.register);

router.get("/employees", empCtrl.getEmployees)

/*router
    .route("/user/:id")
    .get(userCtrl.getUser)
    .post(userCtrl.editUser)
    .put(userCtrl.editPassword)
    .delete(userCtrl.deleteUser);*/


module.exports = router;

