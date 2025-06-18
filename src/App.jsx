import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

export default function App() {
  return (
    <>
      <Provider store={appStore}>
        {/* The BrowserRouter component wraps the entire application to enable routing */}
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/" element={<Feed/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/profile" element={<div>Profile Page</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
