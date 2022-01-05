import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
const Login = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  const handleLogin = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5" />
      <img src="/images/iphone-with-profile.jpg" alt="" />
    </div>
  );
};

export default Login;
