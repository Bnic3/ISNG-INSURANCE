/**
 * Created by john.nana on 11/9/2016.
 */

var empctrl= function(Employee){


    var register = function(req,res){
         //initialize employee
        var emp = new Employee(req.body);

        //save to database
        emp.save()
            .then((emp)=>{
                //sendmessage to client
                return res.status(200).send({
                    success: true,
                    message: emp.fname +' has been registered',
                });

            })
            .catch((err)=>{
                if (err.name === 'ValidationError') {
                    return res.status(401).send({
                        success: false,
                        message: 'Please fill the required field(s)!',

                    });
                }
                else if (err.code === 11000) {
                    return res.status(401).send({
                        success: false,
                        message: 'Username Already Exists!',
                        error: err

                    });
                }
                else {
                    return res.status(403).send({
                        success: false,
                        message: 'An error occured.',
                        error: err
                    })
                }//endelse

            });//end catch

    };//end Register


    var getEmployees = function(req,res){
        Employee.find({})
            .then(function(emp) {
                if (!emp) {
                    return res.status(401).send({
                        success: false,
                        message: 'employees not found.'
                    });
                }
                else {
                    return res.json(emp);
                }
            })
            .catch(function(err) {
                return res.status(403).send({
                    success: false,
                    message: 'An error occured.',
                    error: err
                });
            });


    };// end getEmployees

    return {
        register: register,
        getEmployees:getEmployees

    }
}




module.exports= empctrl;