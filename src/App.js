import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/useAuthListener";
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound.js"));
const DashBoard = lazy(() => import("./pages/Dashboard"));
function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <div>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path={ROUTES.DASHBOARD} element={<DashBoard />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGNUP} element={<Signup />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
