import "./App.css";
import React from "react";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import MembersPage from "./pages/MembersPage";
import SignUpPage from "./pages/SignUpPage";
import AllMoviesPage from "./pages/AllMoviesPage";
import AddMoviePage from "./pages/AddMoviePage";
import EditMoviePage from "./pages/EditMoviePage";
import EditMemberPage from "./pages/EditMemberPage";
import AddMemberPage from "./pages/AddMemberPage";
import AccountPage from "./pages/AccountPage";

import Footer from "./components/FooterComp";
import ResponsiveAppBar from "./components/NavbarComp";

function App() {
  const [showNavBar, setShowNavBar] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const handleHidingNavBarAndFooter = () => {
    setShowFooter(true);
    setShowNavBar(true);
  };

  const handleShowingNavBarAndFooter = () => {
    setShowFooter(false);
    setShowNavBar(false);
  };

  return (
    <div className="App">
      {showNavBar ? null : <ResponsiveAppBar />}
      <div style={{ flex: 1 }}>
        <Outlet />
        <Routes>
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/login"
            element={<LoginPage callback={handleHidingNavBarAndFooter} />}
          />
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/"
            element={<LoginPage callback={handleHidingNavBarAndFooter} />}
          />
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/signup"
            element={<SignUpPage callback={handleHidingNavBarAndFooter} />}
          />

          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/allmovies"
            element={<AllMoviesPage callback={handleShowingNavBarAndFooter} />}
          />
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/addmovie"
            element={<AddMoviePage />}
          />
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/editmovie"
            element={<EditMoviePage />}
          />
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/member"
            element={<MemberPage />}
          />
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/members"
            element={<MembersPage />}
          />
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/editmember"
            element={<EditMemberPage />}
          />
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/addmember"
            element={<AddMemberPage />}
          />
          <Route
            basename={process.env.REACT_APP_MAIN_SERVER_BASEURL}
            path="/account"
            element={<AccountPage />}
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      {showFooter ? null : <Footer style={{ flex: 1 }} />}
    </div>
  );
}

export default App;
