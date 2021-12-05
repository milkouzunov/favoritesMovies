import { useHistory, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import { logoutSuccess } from '../../appRedux/actions/AuthActions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  movieCollection: {
    position: "absolute",
    left: 90,
    top: 17,
    fontSize: "large",
    display: "block",
    color: "white",
  },
  home: {
    position: "absolute",
    fontSize: "large",
    display: "block",
    color: "white",
    
  },
  guest: {
    display: "block",
    position: "absolute",
    top: 0,
    right: 45,
  },
  user: {
    display: "block",
  },
  button: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    display: "inline-block",
    textDecoration: "none",
    fontWeight: 400,
    textAlign: "center",
    verticalAlign: "middle",
    cursor: "pointer",
    border: "1px solid",
    padding: "0.375rem 1rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    borderRadius: "0.25rem",
    boxShadow: "0px 10px 13px -7px #000000, 0px -15px 0px -12px rgba(0,0,0,0)",
    transition:
      "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    margin: "10px !important",
    "&:hover": {
      backgroundColor: "#0b7ef8",
      borderColor: "#0b7ef8",
      color: "#ffffff",
    },
  },
  search: {
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    right: 6,
    marginRight: 300,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&hover" : {
      cursor: 'pointer'
    }
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));



export default function Header() {
  const classes = useStyles();
  
  const dispatch = useDispatch()
  const history = useHistory();

  const user = useSelector((state) => state.auth.user);

  const searchHandle = (e) => {
    let searchInput = e.target.value;
    history.push(`/search?title=${searchInput}`);
    e.target.value = '';
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ background:"#01467f" }} position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onBlur={searchHandle}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {!user ? <Link
              onClick={() => {
                history.push('/');
              }}
              className={classes.home}
            >
              Home
            </Link> : null}
          {user ? (
            <div className={classes.user}>
            <Link
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                dispatch(logoutSuccess())
                history.push('/');
              }}
              className={classes.button}
              style={{
                position: "absolute",
                top: 0,
                right: 40,
              }}
            >
              Logout
            </Link>
            <Link
              onClick={() => {
                history.push('/');
              }}
              className={classes.movieCollection}
            >
              My Movie Collection
            </Link>
          </div>
          ) : (
            <div className={classes.guest}>
            <RouterLink to="/sign-in" className={classes.button}>Sign In</RouterLink>
            <RouterLink to="/sign-up" className={classes.button}>Sign Up</RouterLink>
          </div>
          )}
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
