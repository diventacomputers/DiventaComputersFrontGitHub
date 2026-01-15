import Logo from '../../assets/images/LogoIcon.png'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  const footerSections = [
    {
      title: 'Compañía',
      links: [
        { label: 'Acerca de nosotros', href: '#' },
        { label: 'Equipo', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Sala de prensa', href: '#' }
      ]
    },
    {
      title: 'Clientes',
      links: [
        { label: 'Mi cuenta', href: '#' },
        { label: 'Pedidos', href: '#' },
        { label: 'Garantías y devoluciones', href: '#' },
        { label: 'Soporte técnico', href: '#' }
      ]
    },
    {
      title: 'Explorar',
      links: [
        { label: 'Laptops y PCs', href: '#' },
        { label: 'Gaming', href: '#' },
        { label: 'Accesorios', href: '#' },
        { label: 'Ofertas especiales', href: '#' }
      ]
    }
  ]

  const contactInfo = [
    { icon: <FaPhoneAlt />, label: 'Servicio al cliente', value: '+57 350 576 2900' },
    { icon: <FaEnvelope />, label: 'Correo', value: 'contacto@diventacomputers.com' },
    { icon: <FaMapMarkerAlt />, label: 'Ubicación', value: 'Calle 181c #11-29, Bogotá, Colombia' }
  ]

  const socialLinks = [
    { icon: <FaFacebookF />, label: 'Facebook', href: '/' },
    { icon: <FaInstagram />, label: 'Instagram', href: '/' },
    { icon: <FaLinkedinIn />, label: 'LinkedIn', href: '/' }
  ]

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link to="/">
            <img
              src={Logo}
              alt="DiventaComputers logo"
              className="footer__logo"
            />
          </Link>
          <p>
            Soluciones tecnológicas confiables con acompañamiento experto para empresas y entusiastas.
            Creamos experiencias de compra claras y seguras para que tu equipo nunca se detenga.
          </p>
          <div className="footer__social">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__sections">
          {footerSections.map((section, index) => (
            <div key={index} className="footer__section">
              <h5>{section.title}</h5>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__contact">
          <h5>Contáctanos</h5>
          <ul>
            {contactInfo.map((item, index) => (
              <li key={index}>
                <span className="footer__contact-icon">{item.icon}</span>
                <div>
                  <p className="footer__contact-label">{item.label}</p>
                  <p className="footer__contact-value">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__legal">
          <a href="#">Términos y condiciones</a>
          <a href="#">Política de cookies</a>
          <a href="#">Política de privacidad</a>
        </div>
        <p className="footer__copyright">© {new Date().getFullYear()} DiventaComputers. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer

