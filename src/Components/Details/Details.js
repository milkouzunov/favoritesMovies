import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Parser from "html-react-parser";

import StarRatings from "react-star-ratings";
import { Link } from "@material-ui/core";
import Comments from "./Comments/Comments";

import { getMovieRequest } from "../../appRedux/actions/MoviesActions";
import { addFavoritesRequest, getFavoritesRequest, removeFavoritesRequest } from "../../appRedux/actions/FavoritesActions";
import { addRatingRequest } from '../../appRedux/actions/RatingActions'
export default function Details({ match }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [isUserRating, setIsUserRating] = useState(false);

  const dispatch = useDispatch();

  const movieId = match.params.id;

  const movie = useSelector((state) => state.movies.movie) || {};
  const username = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    dispatch(getMovieRequest(movieId));
    dispatch(getFavoritesRequest());
  }, [movieId, rating]);

  useEffect(() => {
    if (movie.ratings) {
      const rating =
        movie.ratings.reduce((acc, c) => acc + Number(c.rating), 0) /
        movie.ratings.length;
      setRating(rating);
      const userRating = movie.ratings.some((r) => r.username == username);

      if (userRating) {
        setIsUserRating(false);
      } else {
        setIsUserRating(true);
      }
    } else {
      setIsUserRating(true);
    }
  }, [rating, movie]);

  useEffect(() => {
    if (favorites.length > 0) {
      const isFavorite = favorites.some((x) => x.movieId == movie.id);
      if (isFavorite) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false)
      }
    }
  }, [favorites]);

  const addFavorite = (e) => {
    e.preventDefault();
    const addMovie = Object.assign(
      {},
      {
        movieId: movie.id,
        name: movie.name,
        genres: movie.genres,
        runtime: movie.runtime,
        officialSite: movie.officialSite,
        summary: movie.summary,
        imageUrl: movie.imageUrl,
      }
    );
    dispatch(addFavoritesRequest(addMovie));

    setIsFavorite(true);
  };

  const removeFavorite = (e) => {
    e.preventDefault();
    dispatch(removeFavoritesRequest(movie.id));

    setIsFavorite(false);
  };

  const changeRating = async (newRating, name) => {
    dispatch(addRatingRequest({
      rating: newRating,
      username: name,
      movieId: movie.id,
    }));
    
    setIsUserRating(false);

  };

  return (
    <section>
      <div className="card">
        <img className="card-image" src={movie.imageUrl} alt="movie-img"/>
        <div className="card-content">
          <h2>{movie.name}</h2>
          <p>
            {movie.genres ? movie.genres.join(", ") : null} | {movie.runtime}{" "}
            minutes
          </p>
          {movie?.summary ? Parser(movie.summary) : <p>Not Summary</p>}
          <p>
            <Link
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = movie.officialSite;
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
        <div className="review">
          <h1>Your Rating</h1>
          <StarRatings
            rating={rating}
            className="star-rating"
            starSelectingHoverColor="rgb(251 251 5)"
            starRatedColor="#e6e63a"
            isAggregateRating="true"
            changeRating={isUserRating && username ? changeRating : null}
            numberOfStars={5}
            name={username}
          />
          <Comments movieComments={movie.comments} movieId={movie.id} />
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
            flex-basis: 15%;
            height: 40vh;
            margin: 10px 5px;
          }
          .card-content {
            flex-basis: 70%;
            padding: 20px 40px;
          }
          .review {
            diplay: flex;
            margin: 10px
          }
          .ant-list.ant-list-split {
            margin-top: 10px
          }
        `}
      </style>
    </section>
  );
}
