import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component{
  render(){
    let tracks = this.props.tracks ? this.props.tracks : ['tester'];
    console.log('tracks');
    return (
      <div className="TrackList">
        {
         tracks.map(track => {
            <Track track={track}  key={track.id} isRemoval={true} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
            })
          }
      </div>
    );
  }
}

export default TrackList;
