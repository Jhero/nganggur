window.onload = function(){
  document.getElementById('placeholder').style.display = 'none';
  moment.locale('id');
}

var app = angular.module('nganggur', ['ngRoute','angularMoment']);

app.config(function($locationProvider, $routeProvider){
  $locationProvider.hashPrefix('!');
  $routeProvider
    .when('/', {
      templateUrl: 'partials/listing.html',
      controller: 'listingController'
    })
    .when('/pekerjaan/:permalink', {
      templateUrl: 'partials/detail.html',
      controller: 'detailController',
    }).
    when('/kategori/:kategori', {
      templateUrl: 'partials/listing.html',
      controller: 'kategoriController'
    })
    .when('/tentang', {
      templateUrl: 'partials/tentang.html',
    })
    .when('/faq', {
      templateUrl: 'partials/faq.html'
    })
    .when('/berlangganan', {
      templateUrl: 'partials/berlangganan.html'
    })
    .when('/saran', {
      templateUrl: 'partials/saran.html'
    })
    .when('/posting', {
      templateUrl: 'partials/posting.html'
    })
    .otherwise('/');
});

app.controller('listingController', function($scope, $http, moment){
  $scope.limit = 2;
  $http.get('https://api.userlabs.co.id/job')
    .then(function(res){
      $scope.data = res.data;
    });
  $scope.loadMore = function() {
    $scope.limit += 3
    if($scope.limit >= $scope.data.length){
      document.getElementById('tombolLoadMore').style.display = "none";
      document.getElementById('terakhir').style.display = "block";
    }
  }
});

app.controller('kategoriController', function ($scope, $http, $routeParams){
  $scope.limit = 2;
  $http.get('https://api.userlabs.co.id/job/kategori/'+$routeParams.kategori)
    .then(function(res){
      $scope.data = res.data;
    });
  $scope.loadMore = function() {
    $scope.limit += 3
    if($scope.limit >= $scope.data.length){
      document.getElementById('tombolLoadMore').style.display = "none";
      document.getElementById('terakhir').style.display = "block";
    }
  }
});

app.controller('detailController', function($scope, $routeParams, $http, $sce){
  $http.get('https://api.userlabs.co.id/job/'+$routeParams.permalink)
    .then(function(res){
      $scope.data = res.data;
    });
})
.filter('deskripsiPekerjaan', function($sce) {
  return function(stringToParse) {
    return $sce.trustAsHtml(stringToParse);
  }
});
