import { useState } from 'react';
import './AddBook.css'

// TODO: Refactor BookInterface, set the interface in own file
interface BookInterface {
    title: string;
    author: string;
    isbn: number;
    genres?: Array<string>;
    rating: number;
    cover?: string;
}

// Declare component AddBook that receives the props addBookFunction and toggleAddView 
export default function AddBook({ addBookFunction, toggleAddView }: { addBookFunction: (bookToAdd: BookInterface) => void, toggleAddView: () => void }) {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [isbn, setIsbn] = useState<number>(0);
    const [genres, setGenres] = useState<string[]>([]);
    const [genreToAdd, setGenreToAdd] = useState<string>('');
    const [rating, setRating] = useState<number>(5);
    const [cover, setCover] = useState<string>('');

    // Helper function to add a book
    const addBook = () => {
        let newBook = {
            // TODO: id is missing
            title: title,
            author: author,
            isbn: isbn,
            genres: genres,
            rating: rating,
            cover: cover
        }
        addBookFunction(newBook);
    };

    // Returns the AddBook component in TSX syntax
    // Each input has an onChange event handler to update the 
    // field's value and keep it in the component state. We add our
    // book by finally clicking the button "Add" which propogates the 
    // new book to our parent component via the prop addBookFunction
    // TODO: Refactor onChange listeners to simplify 
    return (
        <article className='addBook-container'>
            <h3>ADD NEW BOOK</h3>
            <form className='addBook-form'>
                <label className='cover-field'>
                    Cover: 
                    <input placeholder="Cover" onChange={(e) => setCover(e.target.value)} id='cover'/>
                </label>     
                <label className='author-field'>
                    Author:
                    <input required placeholder="Author" onChange={(e) => setAuthor(e.target.value)} id='author' />
                </label>
                <label className='title-field'>
                    Title:
                    <input required placeholder="Title" onChange={(e) => setTitle(e.target.value)} id='title'/>
                </label>
                {genres.length > 0 ? <ul className='genres'>{genres.map((genre, i) => <li key={i}>{genre}</li>)}</ul> : null}
                <section className='genre-field'>
                    <label>Genres:
                        <input placeholder="Genre" onChange={(e) => setGenreToAdd(e.target.value)} id='genre'/>
                    </label>
                    <button className='add' onClick={() => setGenres([...genres, genreToAdd])}>Add</button>
                </section>
                <label className='isbn-field'>
                    ISBN:
                    <input required placeholder="00000000" onChange={(e) => setIsbn(parseInt(e.target.value))} id='isbn' />
                </label>
                <label className='rating-field'>Rating:
                    <input required max="5" min="1" type='number' defaultValue={rating} onChange={(e) => setRating(parseInt(e.target.value))} id='rating' />
                </label>
                <section className='buttons-field'>
                    <button className='cancel' onClick={toggleAddView}>Cancel</button>
                    <button className='add' onClick={addBook}>Add</button>
                </section>
            </form>
        </article>
    )
}
