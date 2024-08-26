import { useState } from 'react';
import './App.css'
import Book from './Book';
import AddBook from './AddBook';
import { BookInterface } from '../Interfaces/BookInterface';
import { defaultBookList } from '../Utils/BookList';

// Declaring component App
function App() {
  //Setup state-hook showAddBook to false for a start
  const [showAddBook, setshowAddBook] = useState<boolean>(false); 
  //Setup state-hook bookList with a pre-defined list
  const [bookList, setBookList] = useState<BookInterface[]>(defaultBookList);

  // Helper function to update the list of books and its state
  function updateBookList(updatedBook: BookInterface) {
    let index = bookList.findIndex((book) => book.isbn === updatedBook.isbn);
    let updatedBookList = [...bookList];
    updatedBookList.splice(index, 1, updatedBook);
    setBookList(updatedBookList)
  };

  // Helper function to add a new book to our list
  function addBookToBookList(bookToAdd: BookInterface) {
    if(bookList.filter(b => b.isbn === bookToAdd.isbn).length > 0){
      alert('This book is already in your list!');
      return;
    }
    
    setBookList([...bookList, bookToAdd]);
  // why setting it to true makes react crash?  
    setshowAddBook(false);
  }

  // Helper function to remove book from our list
  function deleteBookFromList(bookToDelete: BookInterface) {
    const newBookList = bookList.filter(b => b.isbn !== bookToDelete.isbn);
    setBookList(newBookList);
  }

  // Return our component in TSX syntax
  return (
    <>
      <header>
        <h1>My book collection</h1>
        <button className='round-add-btn' onClick={() => { setshowAddBook(true) }}>+</button>
      </header>

      <main>
        <section className='bookList-container'>
          {/* Iterate our list of books and render each one */}
          { 
            bookList.map((book) => (
              <Book key={book.isbn} book={book} updateBook={updateBookList} deleteBook={deleteBookFromList} />
            ))
          }
        </section>
      </main>
      {/* Show add new book form if we've */}
      {showAddBook ? <AddBook addBookFunction={addBookToBookList} toggleAddView={() => { setshowAddBook(false) }} /> : null}
    </>
  )
}
export default App;