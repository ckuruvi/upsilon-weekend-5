var app = angular.module('giphyApp', ['ngRoute']);

// angular routes
app.config(function($routeProvider,$locationProvider){
  $routeProvider.when('/',{
    templateUrl:'views/pages/main.html',
    controller:'DefaultController as giphy'
  }).when('/favorites',{
    templateUrl:'views/pages/favorites.html',
    controller:'FavoritesController as favCtrl'
  });
  $locationProvider.html5Mode(true);
});

// cotroller for displaying random giphys , search giphys, and saving favorite giphys to the local Database
app.controller('DefaultController', function(giphyService) {
  //console.log('DefaultController loaded!');
  var ctrl = this;

  // function handles button click for random Giphy search
  ctrl.randomGiphy=function(){
    giphyService.getRandomGiphy().then(function(image_url){
      //  console.log('inside success from randomGiphy function call');
      ctrl.imageUrl=image_url;
    });
  }
  // randomGiphy function call for initial page loading
  ctrl.randomGiphy();



  // function handles user search for Giphys
  ctrl.searchGiphy=function(){
    giphyService.getSearchGiphy(ctrl.search).then(function(giphyObject){
      //  console.log('inside success from searchGiphy function call',giphyObject);
      ctrl.imageUrl=giphyObject.images.original.url;
    });
  }

  // function handles saving of Giphys to the Database
  ctrl.favoriteGiphy=function(){
    //  console.log('inside favoriteGiphy function',ctrl.comment,ctrl.imageUrl);
    giphyService.saveFavoriteGiphy(ctrl.comment,ctrl.imageUrl).then(function(response){
      //  console.log('inside saveFavoriteGiphy .then', response);
      ctrl.totalFavorites();
    });
  }

  ctrl.totalFavorites=function(){
    giphyService.getTotalFavorites().then(function(num){
      ctrl.totalFavoritesVar=num;
    })
  }

  // function to get total number of favorites from local database
  ctrl.totalFavorites();

});

// controller for displaying favorite Giphys  along with delete functionality
app.controller('FavoritesController',function(giphyService){

  var favCtrl=this;
  // function call to get list of favorite Giphys from Database
  favCtrl.favoriteGiphys=function(){
    giphyService.getFavoriteGiphys().then(function(giphyList){
      //console.log('inside getFavoriteGiphy .then', giphyList);
      favCtrl.giphyList=giphyList;
    });
  }

  //function call during initial page load
  favCtrl.favoriteGiphys();

  // function call to remove Giphy from database
  favCtrl.removeGiphy=function(id){
    console.log("inside removeGiphy function",id);
    giphyService.removeGiphy(id).then(function(){
      favCtrl.favoriteGiphys();
    })
  }

});
