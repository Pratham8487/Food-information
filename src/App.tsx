import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/HomePage";
import FileNotFound from "./pages/NotFound";
import Browse from "./pages/BrowsePage";
import FoodDetailPage from "./pages/FoodDetails";
// import Favorites from "./pages/Favorites";
import AboutUs from "./pages/AboutUsPage";
import LowCarbs from "./components/common/LowCarbs";
import DietPage from "./pages/DietPage";
import WhyHealthyEatingMatters from "./pages/WhyHealthyEatingMatters";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="/food/:fdcId" element={<FoodDetailPage />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route
              path="/why-eating-healthy-matters"
              element={<WhyHealthyEatingMatters />}
            />
            <Route path="/Low-carbs" element={<LowCarbs pageSize={18} />} />
            <Route path="/Diet-Foods" element={<DietPage pageSize={18} />} />
            <Route path="*" element={<FileNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
