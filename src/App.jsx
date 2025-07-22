import "./Styles/App.css";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Apis from "./Apis/Apis";

function App() {
  const navigate = useNavigate();
  const locate = useLocation();

  // useEffect(() => {
  //   if (
  //     (locate.pathname !== "/login" || locate.pathname !== "/register") &&
  //     !localStorage.getItem("user_token")
  //   ) {
  //     navigate("/Login");
  //   }
  // }, [locate, navigate]);
  return <Apis />;
}

export default App;
