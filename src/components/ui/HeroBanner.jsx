import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'

import banner1 from '../../assets/banners/banner1.svg'
import banner2 from '../../assets/banners/banner2.svg'
import banner3 from '../../assets/banners/banner3.svg'
import monitor from '../../assets/images/monitor.png'

function HeroBanner() {
  const navigate = useNavigate()

  const banners = [
    { id: 1, image: banner1, title: 'Alcanza tu máximo rendimiento', subtitle: 'Nueva serie Alienware', text: 'Pre-Venta Exclusiva', link: '/catalog' },
    { id: 2, image: banner2, title: 'Gaming sin límites', subtitle: 'RTX 5000 Series', text: 'Solo esta semana', link: '/catalog' },
    { id: 3, image: banner3, title: 'Ofertas en Accesorios', subtitle: 'Audio y periféricos', text: 'Hasta 50% OFF', link: '/catalog' },
    { id: 4, image: monitor, title: 'Monitores Corporativos', subtitle: '4k / Curvos / Thunderbold / IPS BLACK', text: 'Ver producto', link: '/catalog' }
  ]

  return (
    <section className="hero-banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="hero-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="banner-slide">
              <div className="banner-inner">

                <div className="banner-content">
                  <h1>{banner.title}</h1>
                  <h2>{banner.subtitle}</h2>

                  <button 
                    className="banner-button"
                    onClick={() => navigate(banner.link)}
                  >
                    {banner.text}
                  </button>
                </div>

                <div className="banner-image">
                  <img 
                    src={banner.image} 
                    alt={banner.title} 
                    onClick={() => navigate(banner.link)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroBanner
