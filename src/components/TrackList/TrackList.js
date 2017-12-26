import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track.js';

/*
class TrackList extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
  render() {
      //es6 syntax. this will allow the app to render and then replace the
      //tracks variable with this.props.tracks when the props are ready
      //this check if this.props.tracks exist and if it doesn't it will
      //assign the variable to an empty array. then .map will not be
      //called on an undefined variable.
      let tracks = this.props.tracks ? this.props.tracks : [];
    return (
      <div className="TrackList">
        {
          tracks.map(track => {
            return (
              <track key={track.id}
                     track={track}/>
                   )}
          )}
      </div>
    );
  }
}

export default TrackList;
*/

/* original code from me */
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
