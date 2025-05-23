
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Home";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import BulkOrder from "./pages/BulkOrder";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import { AdminProvider } from "./components/AdminContext";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import ProductDetails from "./pages/ProductDetails";
import UserProfile from "./pages/UserProfile";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Settings from "./pages/admin/Settings";
import AddProduct from './pages/admin/AddProduct';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <AdminProvider>
            <Toaster />
            <Sonner />
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<><Navbar /><Index /><Footer /></>} />
                <Route path="/search" element={<><Navbar /><Search /><Footer /></>} />
                <Route path="/bulk-order" element={<><Navbar /><BulkOrder /><Footer /></>} />
                <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
                <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
                <Route path="/product/:productId" element={<><Navbar /><ProductDetails /><Footer /></>} />
                
                {/* Protected Routes */}
                <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
                <Route path="/checkout" element={<><Navbar /><Checkout /><Footer /></>} />
                <Route path="/order-success" element={<><Navbar /><OrderSuccess /><Footer /></>} />
                <Route path="/profile" element={<><Navbar /><UserProfile /><Footer /></>} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute element={<AdminLayout />} />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/:productId" element={<UpdateProduct />} />
                  <Route path="products/add" element={<AddProduct />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="settings" element={<Settings />} />
                  <Route index element={<Dashboard />} />
                </Route>

                <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
              </Routes>
            </Router>
          </AdminProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
