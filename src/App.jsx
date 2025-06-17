import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";

export default function App() {
  return (
    <>
      {/* The BrowserRouter component wraps the entire application to enable routing */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/profile" element={<div>Profile Page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
