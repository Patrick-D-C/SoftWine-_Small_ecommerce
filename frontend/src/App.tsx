import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/molecule/Layout"
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import ListOrders from './pages/Dashboard/Order/List'
import AddWine from './pages/Dashboard/Wine/Add'
import EditWine from './pages/Dashboard/Wine/Edit'
import ListWines from './pages/Dashboard/Wine/List'
import Home from "./pages/Home"
import Order from './pages/Order'
import { AuthProvider } from './services/AuthContext'

import './styles/index.css'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='order/:id' element={<Order />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='dashboard/wine' element={<ListWines />} />
            <Route path='dashboard/wine/add' element={<AddWine />} />
            <Route path='dashboard/wine/edit/:id' element={<EditWine />} />
            <Route path='dashboard/order' element={<ListOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
