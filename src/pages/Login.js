import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
const Login = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };
  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with profile" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              aria-label="Email address"
              placeholder="Ingrese su correo electrónico"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 "
              onChange={(event) => setEmailAddress(event.target.value)}
              value={emailAddress}
            />
            <input
              type="password"
              aria-label="Password"
              placeholder="Contraseña"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 "
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
          ${isInvalid && `opacity-50`}`}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            ¿No tienes una cuenta? {` `}
            <Link to={ROUTES.SIGNUP} className="font-bold text-blue-medium">
              Regístate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
