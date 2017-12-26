import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList.js'

//this is a child of App.js
//its job is to render the Title and the list of songs chosen to be in the playlist
class PlayList extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value)
  }

  render(){
    let playlistName = this.props.playlistName ? this.props.playlistName : [];
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
       </div>
    )
  }
}

export default PlayList;
