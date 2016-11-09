var express = require('express');
var router = express.Router();

var rek = require("rekuire"),
    DB= rek("database");
    var User = rek("User");
    var userCtrl = rek("userctrl")(User);




router.get("/testy", (req,res)=> res.send("i don show"));


/* GET users listing. */
router.get('/users', function(req, res, next) {
  //var User = DB.model("User");
  User.find({}).exec().then(function(data){
    res.json(data);
  })
});



//signup
/*router.post('/signup', userCtrl.signup);
router.post('/forgot', userCtrl.forgotPassword);
router.get('/reset/:token',userCtrl.resetPassword);

router
    .route("/user/:id")
    .get(userCtrl.getUser)
    .post(userCtrl.editUser)
    .put(userCtrl.editPassword)
    .delete(userCtrl.deleteUser);

router.get('/sendmail', ()=>{

});*/

/*router.post("/login", auth.authenticate);*/


module.exports = router;
