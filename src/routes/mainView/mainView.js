import './mainView.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import SearchForm from '../homeView/components/input.js';
import homeHeader from './components/homeHeader';
import SearchHeader from './components/searchHeader';

class MainView extends Component {

    render() {
        let is_root = location.pathname == "/";
        if (is_root){
            return (
               <homeHeader/>
            )
        }else{
            return(
                <SearchHeader/>
            )
        }
    }
}

export default MainView;
