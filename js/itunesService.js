var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
  this.getData = function(artist) {
      var defered = $q.defer();
      $http({
        method: 'JSONP',
        url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      }).then(function(response) {
        var sData = response.data.results;
        // console.log(sData);
        var songArray = [];
        for (var i = 0; i < sData.length; i++) {
          var songObj = {
            Play: sData[i].previewUrl,
            Artist: sData[i].artistName,
            Collection: sData[i].collectionName,
            AlbumArt: sData[i].artworkUrl100,
            Type: sData[i].kind,
            CollectionPrice: sData[i].collectionPrice,
            TrackName: sData[i].trackName
          };
          songArray.push(songObj);
        }
        defered.resolve(songArray);
      });
      return defered.promise;
  };
});
