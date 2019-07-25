import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Rack from '../Rack'

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount(){
        BooksAPI.getAll()
        .then(response => {
            this.setState({books: response}); //watch out was response
        });
    }

    updateBook = (book,shelf) => {
        BooksAPI.update(book,shelf)
        .then(response => {
          book.shelf = shelf;
          this.setState(state => ({
              books:state.books.filter(b => b.id !== book.id).concat([book])
          }));
        })
      }

    render(){
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                   <Rack updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />
                   <Rack updateBook={this.updateBook} name="Want to Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />        
                   <Rack updateBook={this.updateBook} name="Read" books={this.state.books.filter(b => b.shelf === "read")} />        

              </div>
            </div>
            <div className="open-search">
              <Link className="open-search-link" to="/search">Add a book</Link>
            </div>
          </div>
        )
    }
}

export default Main;