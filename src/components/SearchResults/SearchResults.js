import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js'

//this is a child of app.js
//it's job is to render the results from the search bar.

class SearchResults extends React.Component {
  componentDidMount(){
    console.log("tester");
   console.log(this.props);
  }

  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} isRemoval={false} onAdd={this.props.onAdd}/>
      </div>
    )
  }
}

export default SearchResults;
