app.factory('showService',['$http','$q',function($http,$q){
    var dal = {}
    ///在此处使用promise
    dal.getTypeData = function(){
        ///定义一个变量
        var deferred = $q.defer()
        $http({
            method:"get",
            url:'http://localhost:3000/show_type'
        }).success(function(res){
            deferred.resolve(res)
        }).error(function(err){
            deferred.reject(err)
        })

        //此方法返回一个promise 对象
        return deferred.promise
    }
    
    dal.getAllBlogData = function(){
        var deferred = $q.defer()
        $http({
            method:"get",
            url:'http://localhost:3000/show_blog/'
        }).success(function(res){
            deferred.resolve(res)
        }).error(function(err){
            deferred.reject(err)
        })

        //此方法返回一个promise 对象
        return deferred.promise
    }
    dal.getBlogListData = function(id){
        var deferred = $q.defer()
        $http({
            method:"get",
            url:'http://localhost:3000/show_blog/'+id
        }).success(function(res){
            deferred.resolve(res)
        }).error(function(err){
            deferred.reject(err)
        })

        //此方法返回一个promise 对象
        return deferred.promise
    }
    dal.getContentData = function(id){
        var deferred = $q.defer()
        $http({
            method:"get",
            url:'http://localhost:3000/show_blog/blog/'+id
        }).success(function(res){
            deferred.resolve(res)
            console.log('service'+res)
        }).error(function(err){
            deferred.reject(err)
        })

        //此方法返回一个promise 对象
        return deferred.promise
    }
    return dal
}])