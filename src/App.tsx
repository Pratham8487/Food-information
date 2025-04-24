import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/HomePage";
import FileNotFound from "./pages/NotFound";
import Browse from "./pages/BrowsePage";
import FoodDetailPage from "./pages/FoodDetails";
// import Favorites from "./pages/Favorites";
// import About from "./pages/About";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse/>} />
            <Route path="/food/:fdcId" element={<FoodDetailPage />} />
            {/* <Route path="browse" element={<Browse />} /> */}
            {/* <Route path="favorites" element={<Favorites />} /> */}
            {/* <Route path="about" element={<About />} /> */}
            <Route path="*" element={<FileNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
