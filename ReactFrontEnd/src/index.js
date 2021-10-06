import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Register from "./Components/RegisterForm";
import Login from "./Components/LoginForm";
import Logout from "./Components/Logout";
import CreatePost from "./Components/CreatePost";
import CreateComment from "./Components/CreateComment";
import UserProfile from "./Components/UserProfile";
import SearchedProfile from "./Components/SearchedProfile";
import FollowDisplay from "./Components/FollowDisplay";
import FollowingDisplay from "./Components/FollowingDisplay";

const routing = (
  <Router>
    <React.StrictMode>
      <Header />
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Home" component={App} />
        <Route path="/Logout" component={Logout} />
        <Route path="/CreatePost" component={CreatePost} />
        <Route path="/CreateComment" component={CreateComment} />
        <Route path="/UserProfile" component={UserProfile} />
        <Route path="/SearchProfile" component={SearchedProfile} />
        <Route path="/follow" component={FollowDisplay} />
        <Route path="/following" component={FollowingDisplay} />
      </Switch>
      <Footer />
    </React.StrictMode>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
