/**
 * Created by john.nana on 11/10/2016.
 */


angular.module('insurance',['ngAnimate','ngResource','ui.router'])
    .value('ServiceEndpoint', 'http://localhost:3000')
    .factory('User',userFactory)
    .controller("mainCtrl", mainCtrl)
    .controller("regCtrl", regCtrl)
    .config(appConfig);


function appConfig ($stateProvider, $urlRouterProvider){
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
    $scope.processForm = function() {
       console.log($scope.formData);
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

function userFactory($resource){
    return $resource('/signup');
}