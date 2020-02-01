import React, { Component } from "react";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import "./App.css";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out";
import {
  auth,
  createUserProfileDocument
} from "../src/firebase/firebase.utils";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      this.setState({ currentUser: userAuth });
      console.log(userAuth);
      createUserProfileDocument(userAuth);

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: { id: snapShot.id, ...snapShot.data() }
          });
          console.log(this.state);
        });
      } else {
        this.setState({
          currentUser: userAuth
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
