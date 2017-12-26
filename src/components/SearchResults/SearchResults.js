import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js'

//this is a child of app.js
//it's job is to render the results from the search bar.

export class SearchResults extends React.Component {
  componentDidMount(){
   console.log(this);
  }

  render(){
  //  console.log(this.props.searchResults); (not working)
//let searchResults = this.props.searchResults ? this.props.searchResults : [];
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} isRemoval={false} onAdd={this.props.onAdd}/>
      </div>
    )
  }
}
