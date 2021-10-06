import "./App.css";
import Posts from "./Components/Posts";
import React, { useState, useEffect } from "react";
import "./Css/PostLoading.css";
import axiosInstance from "./axios";

function App() {
  // Wrapping postloadingcomponent around posts
  const [appstate, setAppState] = useState({
    loading: false,
    posts: null,
  });

  const getPosts = () => {
    setAppState({ loading: true });
    const timer = setTimeout(() => {
      axiosInstance.get("user/posts/").then((posts) => {
        console.log(posts.data);
        setAppState({ loading: false, posts: posts.data });
      });
    }, 1500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    getPosts();
  }, [setAppState]);

  return (
    //change App.css to change app
    <div className="App">
      {appstate.loading ? (
        <div class="load">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      ) : (
        <Posts posts={appstate.posts}></Posts>
      )}
    </div>
  );
}

export default App;
