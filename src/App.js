import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Main from './components/pages/Main'
import Search from './components/pages/Search';
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    
    showSearchPage: false
  }

  render() {
    return(

      <div>
        <Route exact path="/" component={ Main }></Route>
        <Route exact path="/search" component={ Search }></Route>

      </div> 
    )
  }
}

export default BooksApp
