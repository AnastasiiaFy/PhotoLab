import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/"element={<Home />}></Route>
        <Route path="/catalogue"element={<Catalogue />}></Route> 
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/place-order"
          element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
