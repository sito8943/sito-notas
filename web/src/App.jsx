import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import View from "./layouts/View";

// views
import Home from "./views/Home/Home";

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
