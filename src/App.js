import { Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./Components/Header";
import Layout from "./Components/Layout";
import Favorites from "./Components/Favorites";
import Details from "./Components/Details";
import Search from "./Components/Search";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Footer from './Components/Footer';



function App() {
  return (
    <div className="App">
      <Header/>

      <Switch>
        <Route
          exact
          path="/"
          render={props => {
            return (
              <section {...props} className="homepage">
                <Layout />
                <Favorites />
              </section>
            );
          }}
        />
        <Route path="/details/:id" component={Details}/>
        <Route path="/search" component={Search} />
        <Route path="/sign-in" render={props => {
          return (
          <SignIn {...props}> </SignIn>
          );
        }}/>
        <Route path="/sign-up" component={SignUp}/>
      </Switch>

      <Footer/>
    </div>
  );
}


export default App;
