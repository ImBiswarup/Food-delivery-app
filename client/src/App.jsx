import { Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import SingleItem from "./pages/SingleItem"
import CheckoutPage from "./pages/CheckoutPage"
import ProfilePage from "./pages/ProfilePage"
import Add_items from "./pages/Add_items"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<About />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/:id" element={<SingleItem />} />
        <Route path="/add-items" element={<Add_items />} />
        <Route path="/:id/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  )
}

export default App
