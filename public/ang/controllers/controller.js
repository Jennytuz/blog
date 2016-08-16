angular.module('app').controller('indexCtrl', ['$scope', '$routeParams','showService', '$location', function ($scope, $routeParams,showService, $location) {
    // console.log(getDataServices)
    // console.log(postDataServices)
    

    showService.getAllBlogData()
        .then(function(res){
            $scope.blogData = res.data
            console.log($scope.blogData)
        })
        .catch(function (err) {
            console.log(err)
        })

    showService.getBlogListData($routeParams.id)
        .then(function(res){
            $scope.listData = res.data
            console.log($scope.listData)
        })
        .catch(function (err) {
            console.log(err)
        })

    showService.getContentData($routeParams.id)
        .then(function(res){
            console.log($routeParams.id)
            $scope.contentData = res.data[0]
            console.log(res.data)
        })
        .catch(function (err) {
            console.log(err)
        })
}])