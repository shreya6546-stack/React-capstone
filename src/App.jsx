import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import TripPlanner from './pages/TripPlanner'
import TripDetails from './pages/TripDetails'
import Wishlist from './pages/Wishlist'
import { destinations } from './data/destinations'

const wishlistStorageKey = 'travique-wishlist'

function App() {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(wishlistStorageKey)) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlistIds))
  }, [wishlistIds])

  const wishlistDestinations = useMemo(
    () => destinations.filter((destination) => wishlistIds.includes(destination.id)),
    [wishlistIds],
  )

  const toggleWishlist = (destinationId) => {
    setWishlistIds((current) =>
      current.includes(destinationId)
        ? current.filter((id) => id !== destinationId)
        : [...current, destinationId],
    )
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar wishlistCount={wishlistIds.length} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home wishlistIds={wishlistIds} onToggleWishlist={toggleWishlist} />
              }
            />
            <Route
              path="/destinations"
              element={
                <Destinations wishlistIds={wishlistIds} onToggleWishlist={toggleWishlist} />
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlistDestinations={wishlistDestinations}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={toggleWishlist}
                />
              }
            />
            <Route path="/plan-trip" element={<TripPlanner />} />
            <Route path="/trip-details" element={<TripDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
