import { useContext, useState } from "react";
import Header from "./Components/Header";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import axios from "axios";
import { LoginContextProvider } from "./ContextProvider/LoginProvider";
import { LoginContext } from "./ContextProvider/LoginProvider";
import { Login } from "@mui/icons-material";
import Carousel from "./Components/Carousel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Productsmain from "./Components/Productsmain";
import CheckoutPage from "./Components/CheckoutPage";
import SellerApplication from "./Components/SellerApplication";
import StepperSeller from "./Components/StepperSeller";
import SellerDashboard from "./Components/SellerDashboard";
import NavCategories from "./Components/NavCategories";
import CatProducts from "./Components/CatProducts";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import Brands from "./Components/Brands";
import BrandProducts from "./Components/BrandProducts";
import Productpage from "./Components/Productpage";

const queryClient = new QueryClient();

function App() {
  axios.defaults.baseURL = "http://localhost:8000/api/v1";
  const location = useLocation();
  const hideHeader = [
    "/admin/dashboard",
    "/Login",
    "/Signup",
    "/Checkout",
    "/SellerDashboard"
  ].includes(location.pathname);

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <LoginContextProvider>
          {hideHeader ? null : <Navbar />}
          <Routes>
            <Route path="/" element={<Productsmain />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<Header />} path="/admin/dashboard"></Route>
            </Route>
            <Route path="/Login" element={<LoginForm />}></Route>
            <Route path="/Signup" element={<SignupForm />}></Route>
            {/* <Route path="/products" element={<Productsmain />}></Route> */}
            <Route path="/Checkout" element={<CheckoutPage />}></Route>
            <Route
              path="/SellerApplication"
              element={<SellerApplication />}
            ></Route>
            <Route element={<StepperSeller />} path="/StepperSeller"></Route>

            <Route
              path="/SellerDashboard"
              element={<SellerDashboard />}
            ></Route>

            <Route element={<NavCategories />} path="/AllCategories">
            </Route>
            <Route element={<CatProducts />} path="/CategorizedProducts/:name">

            </Route>
            <Route element={<Cart />} path="/Cart">

            </Route>
            <Route element={<Brands />} path="/Brands">

            </Route>
            <Route element={<BrandProducts />} path="/BrandProducts/:name">

            </Route>
            <Route element={<Productpage />} path="/Productsinfo/:id">

            </Route>
          </Routes>
          {hideHeader ? null : <Footer />}
          
        </LoginContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
