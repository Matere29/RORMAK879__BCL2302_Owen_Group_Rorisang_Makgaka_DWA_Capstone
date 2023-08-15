 import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

export default function GenreSort() {
  const [shows, setShows] = useState([]);
  const [sortKey, setSortKey] = useState('id');
  const [sortedGenre, setSortedGenre] = useState('');
  const [searchedShows, setSearchedShows] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        setShows(data);
        setSearchedShows(data);
      })
      .catch(error => console.error('Error fetching shows:', error));
  }, []);

  const handleSortChange = event => {
    setSortKey(event.target.value);
  };

  const handleGenreSort = event => {
    setSortedGenre(event.target.value);
  };

  useEffect(() => {
    const options = {
      keys: ['genre'],
    };

    const fuse = new Fuse(shows, options);
    const filteredShows = sortedGenre === '' ? shows : fuse.search(sortedGenre);

    setSearchedShows(filteredShows);
  }, [sortedGenre, shows]);

  const sortedAndSearchedShows = searchedShows.sort((a, b) =>
    sortKey === 'id' ? a.id - b.id : a.title.localeCompare(b.title)
  );

  const genres = [
    'Personal Growth',
    'True Crime and Investigative Journalism',
    'History',
    'Comedy',
    'Entertainment',
    'Business',
    'Fiction',
    'News',
    'Kids and Family',
  ];

  return (
    <div>
      <h3>Podcast Shows</h3>
      <div>
        <label htmlFor="sortDropdown">Sort By:</label>
        <select id="sortDropdown" onChange={handleSortChange} value={sortKey}>
          <option value="id">ID</option>
          <option value="title">Title</option>
        </select>
        <label htmlFor="genreDropdown">Genre:</label>
        <select id="genreDropdown" onChange={handleGenreSort} value={sortedGenre}>
          <option value="">All</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {sortedAndSearchedShows.map(show => (
          <li key={show.id}>
            <strong>ID:</strong> {show.id} - <strong>Title:</strong> {show.title} -{' '}
            <strong>Genre:</strong> {show.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}
