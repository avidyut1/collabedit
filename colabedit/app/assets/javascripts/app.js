/**
 * Created by asheshvidyut on 03/01/17.
 */
var app = angular.module('colabedit', ['ui.router', 'ui.ace', 'templates']);
app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
    });
    $stateProvider.state('pad', {
        url: '/pad/:hash_id',
        templateUrl: 'pad.html',
        controller: 'PadCtrl'
    });
}]);
