import React, { Component } from 'react';
import './App.css';
import PlayList from '../PlayList/PlayList.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from 'C:/Users/hug_l/Documents/jamming/src/util/Spotify.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          id: '',
          name: '',
          artist: '',
          album: '',
          uri: ''
        }
      ],
      playlistName: 'New Playlist',
      playlistTracks: [
        {
          name: '',
          artist: '',
          album: '',
          uri: '',
          id: ''
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }


  searchSpotify(term){
    const newSearch = new Spotify();
    newSearch.search(term).then(tracks=>{
      this.setState({searchResults: tracks});
      console.log(this.state.searchResults); //(working)
    })
  }


  addTrack(track){
    //adds a song to the playlist state
    if (this.state.playlistTracks.id.find(track.id)){
      return
    } else {
      this.state.playlistTracks.push(track.id)
    }
  }

  removeTrack(track){
    //removes a song from the playlist state
    this.state.playlistTracks.splice(this.state.playlistTracks.id.findIndex(track.id),1);
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(playlistTracks){
    let trackURIs = this.state.playlistTracks ? this.state.playlistTracks : [];
    let playlistName = this.state.playlistName ? this.state.playlistName : '';
    if(!trackURIs || !playlistName){
      return
    } else {
    this.state.playlistTracks.map(uri =>{
    return( trackURIs.push(this.state.playlistTracks.uri));
    });
    this.Spotify.savePlaylist(this.state.playlistName, trackURIs);
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify}/>

          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>

            <PlayList playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
