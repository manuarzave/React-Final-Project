import React, { Component } from 'react';
import RenderBox from './components/RenderBox';

class ArtistsView extends Component {
	
	render() {
		let searchterm = localStorage.getItem( 'searchinput' );
		return (
			<article className="home-view">
			<h4>Search results</h4>
			<h1>You searched for: <strong>{searchterm}</strong></h1>
			<br/>
			<span> Home > Artists </span>
			<hr/>
			<RenderBox/>
			</article>
		);
	};
};

export default ArtistsView;
