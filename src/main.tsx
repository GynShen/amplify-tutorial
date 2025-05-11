import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginComponent from "./custom-component/auth/LoginPage.tsx";
import RegisterComponent from "./custom-component/auth/RegisterPage.tsx";
import Navbar from "./custom-component/nav-component/Navbar.tsx";
import HomePage from "./custom-component/HomePage.tsx";
import "./index.css";
import { SWRConfig } from "swr";
import SearchBookPage from "./custom-component/book/SearchBookPage.tsx";
import EachBookDetailsPage from "./custom-component/book/EachBookDetailsPage.tsx";
import CartPage from "./custom-component/cart/CartPage.tsx";
import AllBookPage from "./custom-component/book/AllBookPage.tsx";
import AllCategoryPage from "./custom-component/category/AllCategoryPage.tsx";
import { Toaster } from "sonner";
import OrderPage from "./custom-component/order/OrderPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <main className="mt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/books" element={<AllBookPage />} />
            <Route path="/search/:query" element={<SearchBookPage />} />
            <Route path="/categories" element={<AllCategoryPage />} />
            <Route path="/book/:id" element={<EachBookDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="auth">
              <Route path="login" element={<LoginComponent />} />
              <Route path="register" element={<RegisterComponent />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </SWRConfig>
  </StrictMode>
);
