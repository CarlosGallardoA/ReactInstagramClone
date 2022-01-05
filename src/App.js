import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
const Login = lazy(() => import("./pages/Login"));
function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
