import Header from '../components/ui/Header';
import HeroBanner from '../components/ui/HeroBanner';
import CategorySection from '../components/ui/CategorySection';
import Footer from '../components/ui/Footer';

function Home() {
    return (
      <div className="home-page">
        <Header />
        <HeroBanner />
        <CategorySection />
        <Footer />
      </div>
    )
  }

export default Home