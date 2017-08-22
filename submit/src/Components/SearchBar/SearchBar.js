import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state = {searchBarTerm : 'null'};
    }
    
    //69
    search(){
        this.props.onSearch(this.state.searchBarTerm);
    }

    //71
    handleTermChange(event){
        this.setState({searchBarTerm: event.currentTarget.value});
    }   
    
    
    render(){
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;