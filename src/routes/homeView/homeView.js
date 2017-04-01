import './homeView.css';
import React, { Component } from 'react';
import SearchForm from './components/input';
import HomeHeader from '../mainView/components/homeHeader';
class HomeView extends Component {

	render() {
		return (
			<div className="full-body">
			<HomeHeader/>
			<article className="home-view">
			<h4>Welcome to</h4>
			<h1 id="spotySearchTitle">Spotisearch</h1>
			<h4> Search your favorite songs over Spotify, just enter an artist's name in the following search box and enjoy! </h4>
			<SearchForm/>
			</article>
			</div>
			);
	}

}
export default HomeView;
