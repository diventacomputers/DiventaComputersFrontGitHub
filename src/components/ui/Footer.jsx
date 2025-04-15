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
      <footer className="footer">
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
  
        <div className="footer-bottom">
          <div className="legal-links">
            <a href="#">Políticas de cookies</a>
            <a href="#">Políticas de Privacidad</a>
          </div>
          <p>© TODOS LOS EJERCICIOS RESERVADOS</p>
          <p>Divensiocomputer · INT 000.403.362-8. Calle 181c HT: 49 Piso 9, Bogotá, Columbia Tel: 3565792900 Email: Divensiocomputer.com</p>
        </div>
      </footer>
    )
  }
  
  export default Footer