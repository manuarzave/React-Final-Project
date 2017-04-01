import './albumView.css';
import React, { Component } from 'react';
import TrackList from './components/TrackList';

class AlbumView extends Component {
	
	render() {
		return (
			<article className="home-view">
			<TrackList/>
			</article>
		);
	};
	
};

export default AlbumView;


