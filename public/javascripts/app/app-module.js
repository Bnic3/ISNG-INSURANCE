/**
 * Created by john.nana on 11/10/2016.
 */


angular.module('insurance',['ngAnimate','ngResource','ui.router'])
    .value('ServiceEndpoint', 'http://localhost:3000')
    .factory('User',userFactory)
    .factory('Employee',employeeFactory)
    .controller("mainCtrl", mainCtrl)
    .controller("regCtrl", regCtrl)
    .controller("hrCtrl", hrCtrl)
    .config(appConfig);


function appConfig ($stateProvider, $urlRouterProvider,$compileProvider ){
    //blob config
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);

    //  $urlRouterProvider.otherwise("/home");
    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('home');
        }]);
    });
    $stateProvider
        .state('home',{url: "/home",
            templateUrl: "/partial/partial-home.html",
            controller:"mainCtrl" })
        .state('complete',{url: "/complete",
            templateUrl: "/partial/partial-complete.html"
             })
        .state('hr',{url: "/hr",
            templateUrl: "/partial/partial-hr.html",
            controller:"hrCtrl" })

        .state('register',{url: "/register",
            templateUrl: "/partial/partial-reg.html",
            controller:"regCtrl"})
    .state('register.profile', {
            url: '/profile',
            templateUrl: '/partial/form-profile.html'
        })
        .state('register.parent', {
            url: '/parent',
            templateUrl: '/partial/form-parent.html'
        })
        .state('register.spouse', {
            url: '/spouse',
            templateUrl: '/partial/form-spouse.html'
        })
        .state('register.sp', {
            url: '/spouseparent',

            templateUrl: '/partial/form-sp.html'
        })
        .state('register.nok', {
            url: '/nok',
            templateUrl: '/partial/form-nok.html'
        })

}


function mainCtrl($scope, User){
    var vm = $scope;
    vm.mydata= "Ogbeni";
    $scope.payload={}
    /*$scope.testy= function(){
     User.query($scope.payload, function(data){
     console.log(data);
     })
     }*/

}

function regCtrl($scope, $http, $state,ServiceEndpoint,User){
    var vm = $scope;

    $scope.backdrop = false;
    $scope.req = null;
    $scope.adduser= {};

    $scope.formData = {};


    $scope.processForm = function(form) {
       console.log($scope.formData);
        if(form.$valid){
            //using ng resource
            User.save($scope.formData, function(data){
                toastr.success("Registration Successful");
                $state.go("complete");
            }, function(err){toastr.error("Registration failed");});
        }


    };

    vm.register= function(form){

        console.log($scope.adduser);
        if (form.$valid){

            /*   $http.post(ServiceEndpoint+"/signup",$scope.adduser)
             .then(function(){

             toastr.success("Registration Successful");
             /!*script(src="https://code.jquery.com/jquery-1.12.4.js")
             script(src="https://code.jquery.com/ui/1.12.1/jquery-ui.js")*!/
             $state.go("home");
             })
             .catch(function(err){
             toastr.error("Registration failed");
             });*/

            //trying angular resource
            User.save($scope.adduser, function(data){
                toastr.success("Registration Successful");
                $state.go("home");

            }, function(err){toastr.error("Registration failed");})


        }



    }
}

function hrCtrl($scope, $resource,$window, Employee){
    $scope.emps = [];
    Employee.query().$promise.then(function(emps){
        $scope.emps=emps;
        /*console.log(emps[1].fname)*/
    })

    $resource('/json').get().$promise.then(function(data){
        /*console.log(data.message)*/
       var  blob = new Blob([data.message], { type: 'text/csv;charset=utf-8;' }),
            url = $window.URL || $window.webkitURL;
        $scope.fileUrl = url.createObjectURL(blob);

    })

   /* var data = 'some data here...',
        blob = new Blob([data], { type: 'text/plain' }),
        url = $window.URL || $window.webkitURL;
    $scope.fileUrl = url.createObjectURL(blob);*/
  /*  console.log($scope.emps.Array[0]);*/

}

function userFactory($resource){
    return $resource('/register');
}

function employeeFactory($resource){
    return $resource('/employees');
}