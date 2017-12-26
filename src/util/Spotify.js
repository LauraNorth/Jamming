import React, { Component } from 'react';
let accessToken ='BQAEFnJ6skWnZzFfH6Ss-EGG1qQVLBma8dqnnbiHSot2FfkKINM_u0842whADXgvz2W9OvSpyvptBleqjbtV7POGt1PPgFW5qEnmzXxqKflolWvcPtXXCB4SIzUeZv9XqRpcLyFqBgjA5ZcDYFyAdBT_l8C4cCNppRspdaEjOKDUn_PmCpr1_o2kstmvkUcFw8Yele7SiuJgTiB7h9KlRmfWUpDnnDY';
const client_id = '685f7f8b86e14e1a99c0c5e73be6e08b';
const client_secret = 'b428d041dbe6404eb9947e03c8dd0d41';
const user_id= '217bjavfgp3l4na3ej4v7ptvy';  'spotify:user:217bjavfgp3l4na3ej4v7ptvy'
const redirect_uri='http://knowing-error.surge.sh';

class Spotify extends React.Component {

/*
  getAccessToken() {
         if (accessToken) {
             return accessToken;
         } else {
             window.location.href.match('https://example.com/callback#/access_token=([^&]*)/&token_type=Bearer&/expires_in=([^&]*)/&state=123');

             let accessToken = window.access_token;
             let expiresIn = window.expires_in;

             window.setTimeout(() => accessToken = '', expiresIn * 1000);
             window.history.pushState('Access Token', null, '/');

             window.location = 'https://accounts.spotify.com/authorize?client_id={clientID}&response_type=token&scope=playlist-modify-public&redirect_uri={redirectURI}';
         }

         return new Promise(
             resolve => resolve(accessToken)
         );
     }

 //my original code (not working) - key is harded coded in right now.
  getAccessToken(){
    if(accessToken) {
      return accessToken;
    } else {
    app.get('/login', function(req, res) {
    var scopes = 'playlist-modify-private playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&state=123' +
      '&redirect_uri=' + redirect_uri);
    });
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
    }
  }
*/

  getAccessToken(){
    if(accessToken) {
      return accessToken;
    } else {
     let scopes = 'playlist-modify-private%20playlist-modify-public'
     fetch(`https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=${scopes}&state=34fFs29kd09`)

    app.get('/login', function(req, res) {
    ;
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&state=123' +
      '&redirect_uri=' + redirect_uri);
    });
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
    }
  }


  //search  will return an object with a whole bunch of songs in it.  This gets passed to the method searchSpotify in App.js
  search(term) {
    let currentAccessToken = this.getAccessToken();
    let headerAuthorization = `Bearer ${currentAccessToken}`;

    return(
      //find endpoints here: https://developer.spotify.com/web-api/endpoint-reference/
      fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`,
            {headers:
              {Authorization: headerAuthorization}
            }
      ).then(response=>{
        if(response.ok){
        return response.json();
      }
        throw new Error('Request failed.');
      }, networkError => console.log(networkError.message)
      ).then(jsonResponse=>{
       //this makes sure there is info in the response recieved from spotify
       //how do i know what to call this response object?
        if(!jsonResponse.tracks){
          return [];
        } else {
          return jsonResponse.tracks.items.map(track=>{
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          })
        }
      }))
    }


  savePlaylist(playlistName, trackURIs){
    if(playlistName && trackURIs){
      let currentAccessToken = this.getAccessToken();
      let headerAuthorization = `Bearer ${currentAccessToken}`;
      let userID = '';
      let playlistID = '';

      fetch(`https://api.spotify.com/v1/me`,
           {headers: {
             Accept: "application/json",
             Authorization: headerAuthorization
           }}).then(response =>{
             if(response.ok){
               return response.json();
             } throw new Error('user not found.');
           }).then(jsonResponse =>{
             userID = jsonResponse.id;
           })

      fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
            { method: 'POST',
              headers: {
                Accept: "application/json",
                Authorization: headerAuthorization
              },
              data: JSON.stringify({
                description: `New playlist ${playlistName}`,
                public: false,
                name: {playlistName}
              })
            }).then(response=>{
              if(response.ok){
                return response.json();
              }
              throw new Error('Playlist was not added.');
            }, networkError=>console.log(networkError.message)
          ).then(jsonResponse =>{
            playlistID = jsonResponse.id;
          })


      fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
            { method: 'POST',
              headers: {
                Accept: "application/json",
                Authorization: headerAuthorization
                },
              uris: JSON.stringify({
                trackURIs
              }
            )}).then(response=>{
           if(response.ok){
            return response.json();
           }
          throw new Error('This song was not added to the playslist.');
          }, networkError=>console.log(networkError.message)
        ).then(jsonResponse => {
          this.props.state.playlistName='New Playlist';
          this.props.state.playlistTracks=[{
            name: '',
            artist: '',
            album: '',
            uri: '',
            id: ''
          }];
        });
       } else { return }
     }
  }

export default Spotify;
