import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import CafePage from "./pages/CafePage";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import CartDrawer from "./components/CartDrawer";
import { CartProvider, useCart } from "./contexts/CartContext";

function AppContent() {
  const { isCartOpen, closeCart } = useCart();

  return (
    <>
      <Header />
      <SubHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/cafe" element={<CafePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
      <BottomNav />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
