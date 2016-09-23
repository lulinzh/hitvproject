var app = angular.module('todo', ['ionic']);
/**
 * Created by Administrator on 2016/09/18 0018.
 */

app.run(function ($rootScope, $location, $timeout, $log, $ionicLoading) {
    $rootScope.showLoadingToast = function () {
        // Setup the loader
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0
        });
    };
    $rootScope.hideLoadingToast = function () {
        $ionicLoading.hide();
    }
});
app.directive("pageShowloading", function() {//显示loading指令
    return {
        restrict : "A",
        scope: true,
        controller:function($rootScope){
            $rootScope.showLoadingToast()
        }

    };
});
app.controller('choiceController', function ($scope, $http, $ionicModal, $ionicSlideBoxDelegate, $rootScope) {
    angular.extend($scope, {//控制器变量
        banner_list: [],
        category_list: [],
        addcomment: null,
        setscore: null
    });
    $http.jsonp('http://10.0.64.226:8000/Hitv/get_index_list?callback=JSON_CALLBACK')
        .success(function (response) {
            console.log(response);
            $scope.banner_list = response.banner_list;
            $scope.category_list = response.category_list;
            $ionicSlideBoxDelegate.update();
            $rootScope.hideLoadingToast();
        })
        .error(function (data, status, headers, config) {
        });
});

app.controller('discoverController', function ($scope, $http, $ionicModal, $ionicSlideBoxDelegate, $rootScope) {
    angular.extend($scope, {//控制器变量
        banner_list: [],
        category_list: [],
        item_list: [],
        webapp_list: []
    });
    $http.jsonp('http://10.0.64.226:8000/Hitv/get_discover_list?callback=JSON_CALLBACK')
        .success(function (response) {
            var item = [];
            console.log(response);
            console.log(4%4);
            $scope.banner_list = response.banner_list;
            $scope.category_list = response.category_list;
            $scope.webapp_list = response.webapp_list;
            var index = 1;
            angular.forEach($scope.webapp_list, function (value, key) {
                if (index == 8||index==$scope.webapp_list.length) {
                    item.push(value);
                $scope.item_list.push(item);
                    index=1;
                    item=[];
                }
                else {
                    item.push(value);
                    index++;
                }
            });
            $ionicSlideBoxDelegate.update();
            $rootScope.hideLoadingToast();
        })
        .error(function (data, status, headers, config) {
        });
});