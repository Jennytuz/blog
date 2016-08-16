

/***
 * angular中 所有内置的方法都是通过$或是$$开头的
 * 在自己定义变量的时候 注意 不要使用$开头的命名方式
 */
var app = angular.module('app',['ngRoute','ngSanitize'])

/***
 * 常见的创建服务的方法
 * 
 * value
 * service
 * provider
 * factory
 * 
 */
///在config中使用服务的时候 需要加上关键字Provider
angular.module('app').config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'ang/tpl/main.html', ///html文件路径
            controller:'indexCtrl', //路由名
            // controllerAs:'main' ///别名
        })
        .when('/:id',{
            templateUrl:'ang/tpl/list.html', ///html文件路径
            controller:'indexCtrl',
        })
        .when('/blog/:id',{
            templateUrl:'ang/tpl/content.html', ///html文件路径
            controller:'indexCtrl',
        })
        .otherwise({ ///当匹配不到地址的时候进入默认位置
            redirectTo:'/'
        })
}])

angular.module('app').controller('navCtrl',['$scope','showService',function($scope,showService){
    showService.getTypeData()
        .then(function (res) {
            $scope.data = res.data
            console.log($scope.data)
        })
        .catch(function (err) {
            console.log(err)
        })
}])