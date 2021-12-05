import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';

import ReactDOM from 'react-dom';

import MovieCard from "./MovieCard";

import Container from "@material-ui/core/Container";

import { getMoviesRequest } from '../../appRedux/actions/MoviesActions';

function Search({history}) {
  const dispatch = useDispatch();
  
  let searchTitle = history.location.search.split('=')[1];

  useEffect(() => {
    dispatch(getMoviesRequest(searchTitle))

  }, [searchTitle]);

  const movies = useSelector((state) => state.movies.movies); 

  const searchHandle = (e) => {
       let searchInput = ReactDOM.findDOMNode(e.target.parentNode).getElementsByClassName('search-input')[0].value;
       history.push(`?title=${searchInput}`);
   };


  return (
    <Container className='root-container'>
      <div>
        <h2>Search</h2>
        <div class="container">
          <input
            className="search-input"
            type="text"
            name="search"
            placeholder="Search by movie title... "
          />
          <button onClick={searchHandle} className="button-list">Search</button>
        </div>
      </div>

      {movies.length > 0 ? movies.map(x => <MovieCard key={x.id} movie={x} />) : null}

      <style jsx>
        {`
          .search-input {
            display: inline-block;
            width: 200px;
            border-radius: 4px;
            margin-right: auto;
            margin-left: auto;
            padding: 8px;
            margin-right: 8px;
          }
          .button-list {
            cursor: pointer;
            background-color: rgb(1, 70, 127);
            border: none;
            border-radius: 4px;
            color: white;
            margin: auto;
            padding: 8px 30px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
          }

          .button-favorite {
            background-color: #ffffff;
            size: 2px;
            display: inline-block;
            font-weight: 400;
            text-align: center;
            vertical-align: middle;
            text-decoration: none;
            border: 3px solid;
            padding: 0.375rem 1rem;
            font-size: 20px;
            line-height: 1.5;
            border-radius: 0.25rem;
            box-shadow: "0px 10px 13px -7px #000000, 0px -15px 0px -12px rgba(0,0,0,0)";
            transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out";
          }
          .add-favorite {
            border-color: #33a64c;
            color: #33a64c;
          }
          .add-favorite:hover {
            background-color: #33a64c;
            border-color: #33a64c;
            color: #ffffff;
            cursor: pointer;
          }
          .remove-favorite {
            border-color: #cc0000;
            color: #cc0000;
          }
          .remove-favorite:hover {
            background-color: #cc0000;
            border-color: #cc0000;
            color: #ffffff;
            cursor: pointer;
          }
          .card {
            margin: 10px;
            width: 100%;
            text-align: left;
            display: flex;
            flex-direction: row;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
          }

          .card-image {
            width: 21%;
            height: 300px;
            background-size: 259px 298px;
            background-image: url("https://m.media-amazon.com/images/M/MV5BMjA3NDk0NzM1MF5BMl5BanBnXkFtZTcwOTYxMTk3OQ@@._V1_.jpg");
          }

          .card-content {
            width: 50%;
            padding: 20px 40px;
          }
        `}
      </style>
    </Container>
  );
}

export default Search;