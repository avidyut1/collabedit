/**
 * Created by asheshvidyut on 03/01/17.
 */
var app = angular.module('colabedit');
app.controller('HomeCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state){
    $http.post('/pad').then(function (response){
        if (response.data.result === 'success') {
            var hash_id = response.data.hash;
            $state.go('pad', {'hash_id': hash_id});
        }
    });
}]);
