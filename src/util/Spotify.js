import React, { Component } from 'react';
let accessToken ='BQC8K8vNdI5DZHh9Y6NHEE2ZIeWg9TO2lCYLyyMWdz5cPKB-AK7MAx9_ytA2AD2wNrMkA0SSxa7Cj_H31YWR7lpaCmfI2a7j7YD8iTRDYQCbF_0W4Zuyi5cKP1OqEwIfRPKJDDRUP2U-PA2etfNAEkDjJ_vFO3m5pfFkCz_wkRj3JUe3_--OZxUsWeBON9FcmktMSNUMyux2ulzJ_VBjEc5k7alp9jo';
const client_id = '685f7f8b86e14e1a99c0c5e73be6e08b';
const client_secret = 'b428d041dbe6404eb9947e03c8dd0d41';
const user_id= '217bjavfgp3l4na3ej4v7ptvy';  'spotify:user:217bjavfgp3l4na3ej4v7ptvy'
const redirect_uri='http://knowing-error.surge.sh';

export class Spotify extends React.Component {

/* also not working
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
*/
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
    }
  }


  //search  will return an object with a whole bunch of songs in it.  This gets passed to the method searchSpotify in App.js
  search(term) {
    return(
      //find endpoints here: https://developer.spotify.com/web-api/endpoint-reference/
      fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`,
            {headers:
              {Authorization: `Bearer ${accessToken}`}
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
      let currentAccessToken = getAccessToken();
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
