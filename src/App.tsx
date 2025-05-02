import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/HomePage";
import FileNotFound from "./pages/NotFound";
import Browse from "./pages/BrowsePage";
import FoodDetailPage from "./pages/FoodDetails";
import AboutUs from "./pages/AboutUsPage";
import DietPage from "./components/common/QueryResult";
import WhyHealthyEatingMatters from "./pages/WhyHealthyEatingMatters";
import Portfolio from "./components/common/Portfolio";

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
            <Route path="portfolio" element={<Portfolio />} />
            <Route
              path="/why-eating-healthy-matters"
              element={<WhyHealthyEatingMatters />}
            />
            <Route path="/foods/:query" element={<DietPage pageSize={18} />} />
            <Route path="*" element={<FileNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
