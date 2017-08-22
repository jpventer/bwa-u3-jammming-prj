import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';


class TrackList extends React.Component{
   
    render(){
        
        return(
            <div className="TrackList">
               {this.props.tracks.map(track => <Track dataSrc={track} key={track.id} trackId={track.id} name={track.title} artist={track.artist.name} album={track.album.title} onAdd={this.props.onAdd} onRemove={this.props.onRemove}  isRemoval={this.props.isRemoval} />)} 
            </div>
        );
    }
}

export default TrackList;