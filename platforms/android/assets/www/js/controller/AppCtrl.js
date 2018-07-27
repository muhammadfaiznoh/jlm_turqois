(function () {
    var _module = angular.module('controller');
    _module.controller('AppCtrl', function (App, $scope, $rootScope, appVersionChecker, $timeout, u, ControllerBase,$ionicModal,$ionicNavBarDelegate, $window, $ionicHistory, $timeout, localStorage, $ionicSideMenuDelegate) {
        $ionicNavBarDelegate.align('center');
        // $scope.$watch(function() {
        //     return $ionicSideMenuDelegate.getOpenRatio();
        // }, function(newValue, oldValue) {
    
        //     if (newValue == 0) {
        //         $scope.hideLeft = true;
        //         $scope.hideRight = true;
        //     } else {
        //         if (newValue == 1) {
        //             $scope.hideLeft = false;
        //         } else {
        //             $scope.hideRight = false;
        //         }
        //     }
        // });
        $rootScope.hide_menu = false;
        $scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
            $scope.device_os = ionic.Platform.platform();
            
            if (['none', 'forward', 'swap', 'back'].indexOf(state.direction) >= 0) {
                $scope.data = u.Intent.data;
                $scope.yesprofile = false;
                $scope.noprofile = false;
                var storage = localStorage.getObject('userDetails');
                $scope.edit_name = {}
                    if (storage.name == null) {
                    $scope.up_name =null;
                } else {
                    $scope.up_name = storage.name;
                }
                if (storage.email == null) {
                    $scope.up_email = null;
                } else {
                    $scope.up_email = storage.email;
                }
//                $scope.up_name = storage.name;
//                $scope.up_email = storage.email;
                $scope.up_phone = storage.phone_no;
                $scope.up_password = "(unchanged)";
                if (storage.image == null) {
                    $scope.up_image = null;
                   
                    $scope.yesprofile = true;
                } else {
                    $scope.up_image = storage.image;
                    $scope.noprofile = true;
                 
                }
            }
        });
        

        $scope.edit_profile = function () {
            var storage = localStorage.getObject('userDetails');
            if(localStorage.getObject('userDetails')==null){
                swal("Alert", "You're not login yet", "info");
   
                u.$state.go("login");
            $ionDrawerVerticalDelegate.closeDrawer();}else{
                 u.$state.go('tab.profile');
            }
        }

$scope.$watch(function(){
return $ionicSideMenuDelegate.isOpenLeft();
},
function(isOpen){
if(isOpen){
$rootScope.hide_menu = false;
} else {
$rootScope.hide_menu = true;
}
});
        $rootScope.appVersionChecker = appVersionChecker;
        $rootScope.App = App;
        $scope.actionClickVersion = function () {
            appVersionChecker.promptDownload();
        };
        $scope.actionSideMenuItemClick = function (state) {
            $timeout(function () {
                $rootScope.$broadcast('reset-filter', state);
            });
        };

        $scope.loginData = {};
    });
})();