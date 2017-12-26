import React from 'react';
import './SearchBar.css';
//import SearchResults from '../SearchResults/SearchResults.js';

class SearchBar extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        term: ''
        };
      this.handleTermChange = this.handleTermChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);

  }

  handleTermChange(event){
    this.setState({term: event.target.value});
    }

  handleSearch(){
    this.props.onSearch(this.state.term);
    }


  render(){
    return (
      <div className="SearchBar">
        <div>
          <input placeholder="Enter a Song, Album, or Artist"
                 onChange={this.handleTermChange}/>
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>SEARCH</a>
        </div>
      </div>
      );
  }
};

export default SearchBar;
