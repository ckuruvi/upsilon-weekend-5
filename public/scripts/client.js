var app = angular.module('giphyApp', ['ngRoute']);


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




app.controller('DefaultController', function(giphyService) {
  console.log('DefaultController loaded!');



  var ctrl = this;
  giphyService.getRandomGiphy().then(function(image_url){
    console.log('inside success from randomGiphy function call');
    ctrl.imageUrl=image_url;
  });
  // function handles button click for random Giphy search
  ctrl.randomGiphy=function(){
    giphyService.getRandomGiphy().then(function(image_url){
      console.log('inside success from randomGiphy function call');
      ctrl.imageUrl=image_url;
    });
  }

 // function handles user search for Giphys
  ctrl.searchGiphy=function(){
    giphyService.getSearchGiphy(ctrl.search).then(function(giphyObject){
      console.log('inside success from searchGiphy function call',giphyObject);
      ctrl.imageUrl=giphyObject.images.original.url;
      //ctrl.giphyList=giphyList;
    });
  }

  ctrl.favoriteGiphy=function(){
      console.log('inside favoriteGiphy function',ctrl.comment,ctrl.imageUrl);
    giphyService.saveFavoriteGiphy(ctrl.comment,ctrl.imageUrl).then(function(response){
      console.log('inside saveFavoriteGiphy .then', response);
    })

  }
});

app.controller('FavoritesController',function(giphyService){


  console.log('FavoritesController loaded!');
 giphyService.getFavoriteGiphys().then(function(giphyList){
   console.log('inside getFavoriteGiphy .then', giphyList);
 })

})
