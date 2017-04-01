import '../mainView.css';
import './mainHeader.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import SearchForm from '../../homeView/components/input.js';

class SearchHeader extends Component {

    render() {
        return (
            <header className="main-view__header">
            <a href="/"><img src={logo} className="main-view__logo" alt="logo" /></a>
            <SearchForm/>
            </header>
            );
    }
}

export default SearchHeader;
