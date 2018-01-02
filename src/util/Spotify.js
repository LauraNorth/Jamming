const clientID = '685f7f8b86e14e1a99c0c5e73be6e08b'; // Your client id
const clientSecret = 'b428d041dbe6404eb9947e03c8dd0d41'; // Your secret
const redirectURI = "http://localhost:3000/";
//const redirect_uri='http://knowing-error.surge.sh';
let accessToken='';
let expiresIn;
let userInfo;


let Spotify = {

  getAccessToken() {
      if (accessToken) {
              return accessToken;
          } else {
              window.location.href.match('https://example.com/callback#/access_token=([^&]*)/&token_type=Bearer&/expires_in=([^&]*)/&state=123');
              let accessToken = window.access_token;
              let expiresIn = window.expires_in;
              window.setTimeout(() => accessToken = '', expiresIn * 1000);
              window.history.pushState('Access Token', null, '/');
              window.location = 'https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}';
          }
          return new Promise(
              resolve => resolve(accessToken)
          );
     },


  //search  will return an object with a whole bunch of songs in it.  This gets passed to the method searchSpotify in App.js
  search(term) {
      const header = this.getHeader();
      return(
      //find endpoints here: https://developer.spotify.com/web-api/endpoint-reference/
      fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`,
            {headers: header}
      ).then(response=>{
        if(response.ok){
        return response.json();
      }
        throw new Error('Request failed.');
      }, networkError => console.log(networkError.message)
      ).then(jsonResponse=>{
        if(jsonResponse){
          return jsonResponse.tracks.items.map(track=>{
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          })
        } else { return []; }
      })
    },

  //this will post the playlist to the users spotify account then the songs to the playlist
  savePlaylist(playlistName, trackURIs){
    const header = this.getHeader();
    if(playlistName && trackURIs){
      return this.userInfo();
      .then(() =>
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
          { method: 'POST',
          headers: header
        },
        data: JSON.stringify({
          description: `New playlist ${playlistName}`,
          public: true,
          name: {playlistName}
        })
      ))}.then(response)=>{
        if(response.ok){
          return response.json();
      }.then((jsonResponse)=>
      fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
        { method: 'POST',
        headers: header,
        uris: JSON.stringify({
          trackURIs
        }
      )}).then(response=>{
        if(response.ok){
          return response.json();
        }
      }
    )}},

    // get user info, store object in variable
    userInfo() {
      const link = `${spotifyLink}me`;
      return this.fetchGET(link).then(jsonResponse => {
        userInfo = jsonResponse;
      })
    },


//make the header once instead of in every fetch statement
    getHeader(){
      return {
        Authorization: `Bearer ${this.getAccessToken()}`,
        Content-Type: 'application/json'
      };
    }

export default Spotify;
