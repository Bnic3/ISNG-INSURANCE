/**
 * Created by john.nana on 11/9/2016.
 */

var empctrl= function(Employee){
    var json2csv= require("json2csv");
    var fs = require('fs');
    var fields=['name', 'email', "phone",'address',
        'kname', 'kemail', "kphone",'kaddress',
        'sname', 'semail', "sphone",'saddress',
        'pname', 'pemail', "pphone",'paddress',
        'spname', 'spemail', "spphone",'spaddress'
    ]

    var register = function(req,res){
         //initialize employee
        var emp = new Employee(req.body);

        //save to database
        emp.save()
            .then((emp)=>{
                //sendmessage to client
                return res.status(200).send({
                    success: true,
                    message: emp.name +' has been registered',
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

    var toJSON= function(req,res){


        var emps= []
            Employee.find({}, function(err,data){
             if(!err){
                 var csv = json2csv({ data: data, fields: fields });


                 res.send({success: true,
                            message:csv});

                 /*fs.writeFile('file.csv', csv, function(err) {
                     if (err) throw err;
                     console.log('file saved');
                     res.download('file.csv')

                 });*/
             }

        });//end find

    }


    return {
        register: register,
        getEmployees:getEmployees,
        json:toJSON

    }
}




module.exports= empctrl;