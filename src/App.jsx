import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import DealOfTheDay from './components/DealOfTheDay';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { SaleProvider } from './context/SaleContext';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SalesPopup from './components/SalesPopup';
import Toast from './components/Toast';

export default function App() {
  return (
    <SaleProvider>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Categories />
        <FeaturedProducts />
        <DealOfTheDay />
        <Testimonials />
        <Features />
        <Newsletter />
      </main>
      <Footer />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <SalesPopup />
      <Toast />
    </SaleProvider>
  );
}

