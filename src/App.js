import React, { Component } from "react";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header/header";
import { connect } from "react-redux";
import "./App.css";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out";
import { setCurrentUser } from "./redux/user/user.action";
import {
  auth,
  createUserProfileDocument
} from "../src/firebase/firebase.utils";

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null
  //   };
  // }
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      this.setState({ currentUser: userAuth });
      console.log(userAuth);
      createUserProfileDocument(userAuth);

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          // this.setState({
          //   currentUser: { id: snapShot.id, ...snapShot.data() }
          // });
          // console.log(this.state);
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        // this.setState({
        //   currentUser: userAuth
        // });

        setCurrentUser({ userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          {/* <Route exact path="/signin" component={SignInAndSignUpPage} /> */}
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

//Need to update the props by setting redux dispatch and updating store

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
