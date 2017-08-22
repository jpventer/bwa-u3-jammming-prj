import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component{
    constructor(props){
        super(props);
        //60
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    //59
    handleNameChange(event){
        this.props.onNameChange(event.currentTarget.value);
    }
    
    render(){       
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
                <TrackList tracks={this.props.plTracks} onRemove={this.props.onRemove}  isRemoval={true} />
                <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO DEEZER</a>
            </div>
        );
    }
}

export default PlayList;