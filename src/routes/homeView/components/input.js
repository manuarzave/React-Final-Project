import React, { Component } from 'react';
import lupa from '../../../assets/lupa.png';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            searchTerm: "noSearchTerm",
            name: [],
            infoStatus: undefined
        };
    };

    componentWillMount() {
        this.getInputInfo();
    };

    handleSubmit(event) {
        event.preventDefault();
        let searchterm = this.input.value;
        this.getInputInfo(searchterm);
        localStorage.setItem("searchinput", searchterm);
        window.location.href = '/artists';
    };

    getInputInfo(name) {
        const main = this;
        main.setState({
            infoStatus: 'loading'
        });
    }

  render() {
    const { 
        name,
        infoStatus 
    } = this.state;
    return (
        <div className="inputArtist">
        <form onSubmit={this.handleSubmit}>
            <input type="text" className="searchBoxArtist" placeholder="Type the name of your favorite artist" ref={(input) => this.input = input} />
        </form>
        </div>
    );
  }
}

export default SearchForm;
