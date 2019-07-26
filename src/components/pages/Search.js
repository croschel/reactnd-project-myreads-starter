import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book';


class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            books: [],
            results: [],
            query: ''
        }
    }

    updateQuery = (query) => {
        this.setState({query},this.submitSearch);
    }

    submitSearch(){
        if(this.state.query === '' || this.state.query === undefined){
            return this.setState({results: []});
        }
        BooksAPI.search(this.state.query.trim())
        .then(result => {
            if(result.error){
                return this.setState({results:[]});
            }else{
                result.forEach(b => {
                    let f = this.state.books.filter(B => B.id === b.id);
                    if(f[0]){
                        b.shelf = f[0].shelf;
                    }
                })
                return this.setState({results: result});
            }
        })
    }

    componentDidMount(){
        BooksAPI.getAll()
        .then(response => {
            this.setState({books: response}); 
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
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {this.state.results.map((book,key) => <Book updateBook={this.updateBook} book={book} key={key} />)}
              </ol>
            </div>
          </div>
        )
    }
}

export default Search;