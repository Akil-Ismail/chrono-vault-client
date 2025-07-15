import "./Styles/App.css";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Apis from "./Apis/Apis";

function App() {
  // const navigate = useNavigate();
  // const locate = useLocation();

  // useEffect(() => {
  //   if (locate.pathname !== "/login" && !localStorage.getItem("user_id")) {
  //     navigate("/Login");
  //   }
  // }, [locate, navigate]);
  return <Apis />;
}

export default App;
