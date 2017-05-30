/**
 * Created by thibault on 18/05/2017.
 */

var myApp = angular.module('myApp',[]);

myApp.controller("exemple1Ctrl", function($scope){
    $scope.age = 70;
    $scope.majeurOrMineurText = function(){
        $scope.age = 80;
        return ($scope.age >= 18) ? "majeur" : "mineur";
    };
});