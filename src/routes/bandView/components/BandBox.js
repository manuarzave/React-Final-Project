import React, { Component } from 'react';
import './BandBox.css';
import ArtistsView from '../../artistsView/artistsView';

class BandBox extends React.Component {
  constructor(props) {
    super(props);
    var useid = localStorage.getItem( 'searchinput' );
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: undefined,
      genre: undefined,
      picture: undefined,
      albumids: [],
      albumnames: [],
      albumpics: [],
      albumyears: [],
      id: useid,
      infoStatus: undefined
    };
  };

  componentWillMount() {
    var localinput = localStorage.getItem( 'searchinput' );
    let searchterm = localinput;
    this.getInputInfo(searchterm);
  };
  handleSubmit(event) {
    event.preventDefault();
  }
  handleClick(event){
    localStorage.setItem("albumid", event);
  }
  getData(){
    return this.state;
  } 
  getInputInfo(name){
    console.log("Original search term:" + name);
    var useid = localStorage.getItem( 'bandid' );
    const main = this;
    let query = null;

    fetch(`https://api.spotify.com/v1/artists/${useid}/albums`)
    .then( function(response) {
      return response.json();
    })
    .then( function(response) {
      let albumlist = [];
      let albumnames =[];
      let albumpics = [];
      let albumyears = [];
      /*get the year from ids */
      for (var i = 0; i < response.items.length; i++) {
        var counter = response.items[i].id;
        fetch(`https://api.spotify.com/v1/albums/${counter}`)
        .then( function(response) {
          return response.json();
        })
        .then( function(response) {
          var newid = response.release_date;
          console.log("EL AÑO ES " + newid);
          albumyears.push(newid);
          main.setState({
            albumyears: albumyears
          })
        })
      }
      console.log("POR EJEMPLO " + albumyears);
      /* get names */
      for (var j = 0; j < response.items.length; j++) {
        var addname = response.items[j].name;
        albumnames.push(addname);
      }
      /* get album photo */
      for (var k = 0; k < response.items.length; k++) {
        var addpic = response.items[k].images[0].url;
        albumpics.push(addpic);
      }
      /* get id */
      for (var n = 0; n < response.items.length; n++) {
        var addid = response.items[n].id;
        albumlist.push(addid);
      }
      main.setState({
        albumids: albumlist,
        albumnames: albumnames,
        albumpics: albumpics
      })
    });



    fetch(`https://api.spotify.com/v1/artists/${useid}`)
    .then( function(response) {
      return response.json();
    })
    .then( function(response) {
      let bandname = response.name;
      let bandgenre = response.genres[0];
      let bandpicture = response.images[0].url;
      main.setState({
        name: bandname,
        genre: bandgenre,
        pic: bandpicture
      });
    })
    .catch( function(response) {
     main.setState({
      infoStatus: 'error'
    });
   })
  };




  render() {
    const { 
     name,
     genre,
     pic,
     albumids,
     albumnames,
     albumpics,
     albumyears
   } = this.state;
   var self = this;
   var items = this.state.albumnames.map(function(item, key){
    return (
      <div className="column half">
      <div className="artistbox">
      <img src={albumpics[key]}/>
      <div className="boxinfo">
      <h4><a href="/albumview" id={albumids[key]} onClick={self.handleClick.bind(this, albumids[key])}>{albumnames[key]}</a></h4>
      <p>{albumyears[key]}</p>
      </div>
      </div>
      </div>
      );
  });
   return (

     <div className="band-view">
     <div className="band-header">
     <img className="band-image" src={pic}/>
     <div className="band-info">
     <h1>{name}</h1>
     <p>{genre}</p>
     </div>
     </div>
     <span> Home > <a href="/artists">Artists</a> > {name} </span>
     <hr/>
     {items}
     </div>
     );
 }
}

export default BandBox;