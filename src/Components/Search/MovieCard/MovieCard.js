import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Parser from "html-react-parser";

import { Link } from "@material-ui/core";
import { useEffect, useState } from "react";

import { addFavoritesRequest, removeFavoritesRequest } from "../../../appRedux/actions/FavoritesActions";

export default function MovieCard(movie) {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.favorites);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites.length > 0) {
      const isFavorite = favorites.some((x) => x.movieId == movie.movie.id);
      if (isFavorite) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, []);

  const addFavorite = (e) => {
    e.preventDefault();
    const addMovie = Object.assign(
      {},
      {
        movieId: movie.movie.id,
        name: movie.movie.name,
        genres: movie.movie.genres,
        runtime: movie.movie.runtime,
        officialSite: movie.movie.officialSite,
        summary: movie.movie.summary,
        imageUrl: movie.movie.imageUrl,
      }
    );
    dispatch(addFavoritesRequest(addMovie));

    setIsFavorite(true);
  };

  const removeFavorite = (e) => {
    e.preventDefault();
    dispatch(removeFavoritesRequest(movie.movie.id));

    setIsFavorite(false);
  };

  return (
    <Link
      underline="none"
      component={RouterLink}
      to={`/details/${movie.movie.id}`}
    >
      <div className="card">
          <img
            className="card-image"
            alt="movie image"
            src={movie.movie.imageUrl}
          />
        <div className="card-content">
          <h2>{movie.movie.name}</h2>
          <p>
            {movie.movie?.genres.join(", ")} | {movie.movie?.runtime} minutes
          </p>
          {movie.movie?.summary ? (
            Parser(movie.movie.summary)
          ) : (
            <p>Not Summary.</p>
          )}
          <p>
            <Link
              onClick={(e) => {
                e.preventDefault();
                window.location.href = movie.movie.officialSite;
              }}
            >
              Visit official site
            </Link>
          </p>
          {username ? (
            <Link
              onClick={isFavorite ? removeFavorite : addFavorite}
              className={
                isFavorite
                  ? "button-favorite remove-favorite"
                  : "button-favorite add-favorite"
              }
            >
              {isFavorite ? "Remove From Favorite" : "Add To Favorite"}
            </Link>
          ) : null}
        </div>
      </div>
      <style jsx>
        {`
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
            flex-wrap: wrap;
          }
          .card-image {
            flex-basis: 20%;
            height: 40vh;
            margin: 10px 5px;
          }
          .card-content {
            flex-basis: 70%;
            padding: 20px 40px;
          }
        `}
      </style>
    </Link>
  );
}
