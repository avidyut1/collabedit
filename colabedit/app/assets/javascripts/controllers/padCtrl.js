/**
 * Created by asheshvidyut on 03/01/17.
 */
var app = angular.module('colabedit');
app.controller('PadCtrl', ['$scope', '$http', '$state', 'socket', function ($scope, $http, $state, socket){
    var hash_id = $state.params.hash_id;
    $http.get('/pad/'+hash_id).then(function (response){
        $scope.data = response.data.data;
        socket.emit('hash_id', {'hash_id': hash_id});
        var msg_server = null;
        socket.on('newdata', function (msg) {
            $scope.data = msg.data;
            msg_server = msg.data;
        });
        $scope.$watch('data', function (newvalue, oldvalue){
            if (newvalue !== msg_server) {
                socket.emit('data', {'data': $scope.data, 'hash_id': hash_id});
            }
        });
    });
}]);
