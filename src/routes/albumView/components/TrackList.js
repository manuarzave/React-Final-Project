import React, { Component } from 'react';
import './TrackList.css';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    var useid = localStorage.getItem( 'searchinput' );
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        bandname: undefined,
        albumname: undefined,
        albumcover: undefined,
        albumyear: undefined,
        tracklist: [],
        previewurl: []
    };
};

componentWillMount() {
    var localid = localStorage.getItem( 'albumid' );
    this.getInputInfo(localid);
};
handleSubmit(event) {
    event.preventDefault();
}

handleClick(event){
    var sounds = document.getElementsByTagName('audio');
    for(var i=0; i<sounds.length; i++){
        sounds[i].pause();
    }
    console.log("clicked");
    var audio = document.getElementById(event);
    audio.play();
}
getData(){
    return this.state;
} 
getInputInfo(name){
    const main = this;
    let query = null;
    fetch(`https://api.spotify.com/v1/albums/${name}`)
    .then( function(response) {
      return response.json();
  })
    .then( function(response) {
        let bandname = undefined;
        let albumname = undefined;
        let albumcover = undefined;
        let albumyear = undefined;
        let tracklist = [];
        let previewurls = [];

        for (var i = 0; i < response.tracks.items.length; i++) {
            var namecounter = response.tracks.items[i].name;
            var urlcounter = response.tracks.items[i].preview_url;
            tracklist.push(namecounter);
            previewurls.push(urlcounter);
        }

        bandname = response.artists[0].name;
        albumname = response.name;
        albumcover = response.images[0].url;
        albumyear = response.release_date;


        main.setState({
            bandname: bandname,
            albumname: albumname,
            albumcover: albumcover,
            albumyear: albumyear,
            tracklist: tracklist,
            previewurls: previewurls
        })
    });

};




render() {
    const { 
        bandname,
        albumname,
        albumcover,
        albumyear,
        tracklist,
        previewurls
    } = this.state;
    var self = this;

    var items = this.state.tracklist.map(function(item, key){
        return(
         <tr>
         <td><p onClick={self.handleClick.bind(this, tracklist[key])}>{tracklist[key]}</p></td>
         <audio id={tracklist[key]} src={previewurls[key]} ></audio>
         </tr>
         )
    });
    console.log("NOMBRES " + this.state.tracklist);

    return (
        <div>
        <div className="band-view">
        <div className="band-header">
        <img className="band-image" src={albumcover}/>
        <div className="band-info">
        <h1>{albumname}</h1>
        <p>{bandname} - {albumyear}</p>
        </div>
        </div>
        <span> Home > <a href="/artists">Artists</a> > <a href="/bandview">{bandname}</a> > {albumname} </span>
        <hr/>
        <div className="tracklist-box">
        <table>
        <tr>
        <th>CD1</th>
        </tr>
        {items}
        </table>
        </div>
        </div>
        </div>
        );
}
}

export default TrackList;