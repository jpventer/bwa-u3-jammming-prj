import React from 'react';
import './Track.css';


class Track extends React.Component{
    constructor(props){
        super(props);
        //46
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
        
    
    //27
   renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>
    }
        return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }

    //45
    addTrack(event){
        this.props.onAdd(this.props.dataSrc);
    }

    //53
    removeTrack(event){
        this.props.onRemove(this.props.dataSrc);
    }
    
    
    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.name}</h3>
                    <p>{this.props.artist} | {this.props.album}</p>
                </div>
               {this.renderAction()}
            </div>
        );
    }
}

export default Track;