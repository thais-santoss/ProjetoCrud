import React, { useState } from 'react';
import './App.css';
import backgroundImage from './assets/depositphotos_105322416-stock-illustration-books-and-reading.jpg';

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  const addBook = () => {
    if (title.trim() === '') return;
    if (editingIndex !== null) {
      const updatedBooks = books.map((book, index) =>
        index === editingIndex ? { title, review, rating } : book
      );
      setBooks(updatedBooks);
      setEditingIndex(null);
    } else {
      setBooks([...books, { title, review, rating }]);
    }
    setTitle('');
    setReview('');
    setRating(0);
  };

  const editBook = (index) => {
    setTitle(books[index].title);
    setReview(books[index].review);
    setRating(books[index].rating);
    setEditingIndex(index);
  };

  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    
    <div className="app">
      <h1>Sua lista de livros</h1>
      <input
        type="text"
        value={title}
        placeholder="Título do Livro"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={review}
        placeholder="Sua opinião sobre o livro"
        onChange={(e) => setReview(e.target.value)}
      />
      <label htmlFor="rating">Avaliação (0 a 5):</label>
      <input
        type="number"
        id="rating"
        value={rating}
        min="0"
        max="5"
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <button onClick={addBook}>
        {editingIndex !== null ? 'Atualizar Livro' : 'Adicionar Livro'}
      </button>

      {books.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Opinião</th>
              <th>Avaliação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.review}</td>
                <td>{book.rating}</td>
                <td>
                  <button onClick={() => editBook(index)}>Editar</button>
                  <button onClick={() => removeBook(index)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
