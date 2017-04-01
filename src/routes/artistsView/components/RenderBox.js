import React, { Component } from 'react';
import './ArtistBox.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      searchTerm: "",
      name: [],
      ids: [],
      logos:[],
      infoStatus: undefined
    };
  };

  static defaultProps = {
    name: ''
  };

  componentWillMount() {
    let searchterm = localStorage.getItem('searchinput');
    this.getInputInfo(searchterm);
  };

  handleClick(event){
    localStorage.setItem("bandid", event);
  };

  handleSubmit(event) {
    event.preventDefault();
  };

  getInputInfo(name){
    const main = this;
    main.setState( {infoStatus: 'loading' });
    fetch(`https://api.spotify.com/v1/search?type=artist&q=artist:${name}`)
    .then( function(response){ return response.json(); })
    .then( function(response){
      let bandlist = [];
      let logoslist = [];
      let idslist = [];
      for (var i = 0; i < response.artists.items.length; i++) {
        var counter = response.artists.items[i].name;
        bandlist.push(counter);
      }
      for (var j = 0; j < response.artists.items.length; j++) {
        if (response.artists.items[j].images[0]){
          var imgs = response.artists.items[j].images[0].url;
          logoslist.push(imgs);
        }else{
          imgs = "http://placehold.it/150x150";
          logoslist.push(imgs);
        }
      };
      for (var k = 0; k < response.artists.items.length; k++) {
        var addid = response.artists.items[k].id;
        idslist.push(addid);
      };
      main.setState({
        name: bandlist,
        logos: logoslist,
        ids: idslist
      });
    })
    .catch( function(response){ main.setState({ infoStatus: 'error'}); })
  };

  render() {
    const { 
      name,
      logos,
      ids
    } = this.state;
    var self = this;
    var items = this.state.name.map(function(item, key){
      return (
        <div className="column half">
        <div className="artistbox">
          <img src={logos[key]}/>
          <div className="boxinfo">
            <a href="/bandview" id={ids[key]} onClick={self.handleClick.bind(this, ids[key])}><h4>{name[key]}</h4></a>
          </div> 
        </div>
        </div>
      );
    });
    return(
      <div>
      {items}
      </div>
    );
  };

};

export default SearchForm;