/**
 * Created by asheshvidyut on 03/01/17.
 */
var app = angular.module('colabedit');
app.controller('PadCtrl', ['$scope', '$http', '$state', 'socket', function ($scope, $http, $state, socket){
    socket.emit('hash_id', {'hash_id': $state.params.hash_id});
    $scope.dataChanged = function (e){
    	if(e) {
        	socket.emit('data', {'data': $scope.data, 'hash_id': $state.params.hash_id});
    	}
    };
    socket.on('newdata', function (msg) {
        $scope.data = msg.data;
    });
}]);
