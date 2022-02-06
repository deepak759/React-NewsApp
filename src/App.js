import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News  from "./components/News";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const App=()=> {
  const pageSize = 20;
  // apiKey = process.env.REACT_APP_NEWS_API
  const apiKey = "cf02ed071bbf4e1f90fad0c8f120456e";

  const [progress, setProgress] = useState(0);
  
  
  
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            height={3}
            progress={progress}
          />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  pagesize={pageSize}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="business"
                  pagesize={pageSize}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="entertainment"
                  pagesize={pageSize}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="health"
                  pagesize={pageSize}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="science"
                  pagesize={pageSize}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="sports"
                  pagesize={pageSize}
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="technology"
                  pagesize={pageSize}
                  country="in"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

export default App
