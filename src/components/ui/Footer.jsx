import Logo from '../../assets/images/LogoIcon.png';
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
    const footerSections = [
      {
        title: "Traga con nuestro Equipo",
        links: ["Versa telefónica", "Colaboraciones", "Blog", "Tu Cuenta", "Colaborador", "Tus pedidos", "Conductores y Reemplazos", "Ayuda"]
      },
      {
        title: "Trabaja con nuestro Equipo",
        links: ["Colaboraciones", "Tu Cuenta", "Colaborador", "Conductores", "Conductores"]
      },
      {
        title: "Conócenos",
        links: ["Acerca de nosotros", "Sugerencias", "Donde estamos", "Considuanos"]
      },
      {
        title: "Productos",
        links: ["Laptops", "Equipos Gamer", "Monitores", "Celulares", "Ofertas", "Expedidas"]
      }
    ]
  
    return (
    <div>
      <footer className="footer">
      <div className="footer-logo">
            
            <img 
              src={Logo} 
              alt="DiventaComputers logo" 
              className="logo"
            />
      </div>
      <div className="footer-sections">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h5>{section.title}</h5>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
          
        </div>
  
        
      </footer>
      <div className="footer-bottom">
          <div className="legal-links">
            
            <Link to="/" className="logo-facebook">  
              <FaFacebook />
            </Link>
            <Link to="/" className="logo-instagram">
              <FaInstagram />
            </Link>
            <a href="#">Terminos y condiciones</a>
            <a href="#">Políticas de cookies</a>
            <a href="#">Políticas de Privacidad</a>
          </div>
          <div className="footer-bottom-info">
            <p>© TODOS LOS DERECHOS RESERVADOS</p>
            <p>Diventacomputer . NIT 1020.756.000-8. Calle 181c #11-29 , Bogotá, Colombia Tel: 3505762900 Email: Diventacomputers.com</p>
          </div>
          
        </div>
    </div>
      
    )
  }
  
  export default Footer