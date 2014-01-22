'use strict';

angular.module('toHELL')
  .controller('PackageListCTRL', ['$scope', '$http', '$location', 'GLOBAL', 'loginService', function ($scope, $http,
    $location, GLOBAL, loginService) {

    if (!loginService.isLoggedIn()) {
      $location.path('/');
      return;
    }

    // To get data & set list.
    $scope.refreshList = function () {
      // $http.get('/api/package/list.json')
      $http.get(GLOBAL.apiHost + 'fetchlist/?device=&owner=' + loginService.getLoggedInUser().email)
        .success(function (data) {
          $scope.packageList = data.results;
        })
        .error(GLOBAL.errLogger);
    };

    // Init list
    $scope.refreshList();

    /**
     * Package 编辑
     * @param pkg
     */
    $scope.editPackage = function (pkg) {
      $location.path('/package/' + pkg.appID);
    };

    /**
     * Package 删除
     * @param pkg
     */
    $scope.deletePackage = function (pkg) {
      $http.get(GLOBAL.apiHost + 'deleteProject/?appid=' + pkg.appID)
        .success(function () {
          $scope.refreshList();
        });
    };

    /**
     * 显示/隐藏『创建Package』对话框
     */
    $scope.toggleCreateDialog = function () {
      $scope.showCreateDialog = !$scope.showCreateDialog;
    };

    /**
     * 创建 Package 的默认配置
     * @type {{appName: string, comment: string}}
     */
    $scope.newPackageConfig = {
      appPlatform: 'ios',  // 'android' or 'ios'
      isPublic: true,
      appOwner: loginService.getLoggedInUser().email,
      appName: '',
      appDesc: ''
    };

    /**
     * 创建 Package
     */
    $scope.createPackage = function () {

      $scope.newPackageConfig.isPublic = $scope.newPackageConfig.isPublic ? '1' : '0';
      var postData = {
        context: $scope.newPackageConfig
      };

      $http.post(GLOBAL.apiHost + 'createPoject/', postData)
        .success(function (data) {
          $location.path('/package/' + data.appID);
        })
        .error(GLOBAL.errLogger);
    };
  }]);