import React from 'react';

//imports
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';

import Deezer from '../../util/Deezer';

//css - check on the path
import './App.css';



class App extends React.Component{

    // constructor method begins here:
	constructor(props){
        super(props);
        this.state = {searchResults: [],
        playlistName: 'Playlist Undefined',
        playlistTracks: []
    };
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
    }

    //add track from results to user playlist
    addTrack(track){
        console.log(track);
        let plTracks = this.state.playlistTracks;
        let isTrackPresent = false;

        if(plTracks.length !== 0 ){
            
            //use some to test for first truthy, return boolean
            isTrackPresent = plTracks.some( plTrack => {
                return plTrack.id === track.id;
            });
           
        }

        if(!isTrackPresent){ plTracks.push(track) };
        this.setState({playlistTracks: plTracks});
    }


    // remove a track
    removeTrack(track){
        let plTracks = this.state.playlistTracks;
        let foundTrackIndex;

        foundTrackIndex = plTracks.findIndex( plTrack => {
            return plTrack.id = track.id;
        });

        if(foundTrackIndex !== -1 ){
            plTracks.splice(foundTrackIndex,1);
            this.setState({playlistTracks: plTracks});
        }
    }

    updatePlaylistName(name){
        this.setState({playlistName : name})
    }

    //63
    savePlayList(){
        let trackURIs = this.state.playlistTracks.map( track => track.id);
        Deezer.savePlaylist(this.state.playlistName, trackURIs)
    }

    //67 //88
    search(searchTerm){
        Deezer.search(searchTerm).then(srchRes => {
           console.log(srchRes);
           this.setState({searchResults: srchRes.data});
        })
    }   

    render(){
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                    <SearchResults srchRes={this.state.searchResults} onAdd={this.addTrack} />
                    <Playlist plName={this.state.playlistName} plTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlayList} />
                    </div>
                </div>
            </div>
        );
    }
}


export default App;