import { useEffect } from "react";

import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import FavoriteCard from "./FavoriteCard";

import { useDispatch, useSelector } from "react-redux";

import { getFavoritesRequest } from "../../appRedux/actions/FavoritesActions";


export default function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getFavoritesRequest())

  }, [user]);

  if(favorites.length > 0) {
    return (
      <section style={{
        paddingBottom: 80
      }}>
      <CardHeader
          titleTypographyProps={{ variant:'h2' }}
          title="Your Favorites"
      />
      <Container style={{
          margin: 'auto',
          display: 'flex',
          textAlign: 'left',
          justifyContent: 'space-between',
          justifyContent: 'center',
          maxWidth: '400px',
          alignItems: "center"
      }}>
        {favorites.length > 0 ? favorites.map(x => <FavoriteCard key={x._id} movie={x}/>) : null}
      </Container>
      </section>
    );
  } else {
    return null;
  }
}
