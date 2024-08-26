import { useState } from 'react';
import './Book.css';

// Declaring a type interface to a book object
// TODO: set the interface in own file
interface BookInterface {
    title: string;
    author: string;
    isbn: number;
    genres?: Array<string>;
    rating: number;
    cover?: string;
}

// Book component, destructures props to extract book and updateBook function and sets their type
function Book({ book, updateBook }: { book: BookInterface, updateBook: (updatedBook: BookInterface) => void }) {

    // Declare states for book properties
    const [edit, setEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(book.title);
    const [author, setAuthor] = useState<string>(book.author);
    const [isbn] = useState<number>(book.isbn);
    const [rating, setRating] = useState<number>(book.rating);

    // Create a list of stars for the books rating
    let stars = [];
    for (let i = 0; i < book.rating; i++) {
        stars.push(<span key={i}>⭐</span>)
    }

    // Function to update book with new edits
    const handleEdit = () => {

        // Set updatedBook object to hold new st
        const updatedBook: BookInterface = {
            // TODO: id is missing
            title: title,
            author: author,
            isbn: isbn,
            genres: book.genres,
            rating: rating,
            cover: book.cover
        }

        // Use the updateBook function provided from props to update the book
        updateBook(updatedBook);
        // Disable the edit-mode
        setEdit(false);
    };

    return (
        // If edit mode is enabled, show edit fields, else show normal book html
        <article className="book-container">{edit ?
            <>
                <section className='book-info'>
                    <figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
                    {/* Update fields for title and author */}
                    <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} id='newTitle' />
                    <input defaultValue={author} onChange={(e) => setAuthor(e.target.value)} id='newAuthor' />
                    <p>{book.isbn}</p>
                    <p>Genres: {book.genres ? book.genres.join(", ") : "Not defined"}</p>
                    {/* Update field for rating */}
                    <input max="5" min="1" type='number' defaultValue={rating} onChange={(e) => setRating(parseInt(e.target.value))} id='newRating' />
                </section>
                <button onClick={handleEdit}>Confirm</button>
            </>
            :
            /* Show default book html, not edit mode */
            <>
                <section className='book-info'>
                    <figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.isbn}</p>
                    <p>Genres: {book.genres ? book.genres.join(", ") : "Not defined"}</p>
                    <p>{stars}</p>
                </section>
                <button onClick={() => { setEdit(true) }}>Edit</button>
            </>
        }
        </article>

    )
};
export default Book;