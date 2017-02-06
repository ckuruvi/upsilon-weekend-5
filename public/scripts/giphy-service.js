app.service('giphyService',function($http){

  var url = 'http://api.giphy.com';
  var localhosturl='http://localhost:3000/favoritesgiphys'

  this.getRandomGiphy=function(){

    console.log('Inside giphy-service randomGiphy function!');
    return   $http.get(url + '/v1/gifs/random', {
      params: {
        api_key: 'dc6zaTOxFJmzC'
      }
    }).then(function(response) {
      console.log('grabbing random giphy: ', response.data.data.image_url);
      return response.data.data.image_url;
    }).catch(function(err){
      console.log('error getting data', err);
    })

  }// end of getRandomGiphy function



  this.getSearchGiphy = function(search) {

    console.log('search field entry:: ',search);
    return $http.get(url + '/v1/gifs/search', {
      params: {
        api_key: 'dc6zaTOxFJmzC',
        q: search
      }
    }).then(function(response) {

      return response.data.data[0];
    }).catch(function(err){
      console.log('error getting data', err);
    })
  } // end of searchGiphy function


  this.saveFavoriteGiphy=function(desc,url){
    var formdata={imageUrl:url,comment:desc};
    console.log('data ::',formdata);
    return $http.post(localhosturl,{
      params:{
    data: formdata
    }
  }).then(function(response){
    console.log('response::',response);
    return response;
  }).catch(function(err){
    console.log('error getting data ::',err);
  })

} //end of saveFavoriteGiphy function


this.getFavoriteGiphys = function() {

  console.log('inside getFavoriteGiphys function');
  return $http.get(localhosturl, {
  }).then(function(response) {
   console.log('giphy list from db::',response);
    return response.data;
  }).catch(function(err){
    console.log('error getting data', err);
  })
} // end of getFavoriteGiphys function


this.removeGiphy=function(id){
  console.log('inside removeGiphy function');
  return $http.delete(localhosturl+'/'+id, {
  }).then(function(response) {
   console.log('delete from db::',response);
    return response;
  }).catch(function(err){
    console.log('error getting data', err);
  })

} // end of removeGiphy function

});
