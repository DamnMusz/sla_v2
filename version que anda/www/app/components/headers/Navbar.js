import React from 'react';
import autoBind from 'react-autobind';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    var navStyle = {
      backgroundColor: '#0097A7'
    };
    return (
      <nav className="fh5co-nav" role="navigation" style={navStyle}>
        <div className="container">
          <div className="fh5co-top-logo">
            <div id="fh5co-logo" ><a href="index.html">Lomas del Mar</a></div>
          </div>
          <div className="menu-1 text-center">
            <ul>
              <li><a href="work.html">EL COMPLEJO</a></li>
              <li><a href="about.html">APARTAMENTOS</a></li>
              <li><a href="work.html">SPA</a></li>
              <li><a href="about.html">SERVICIOS</a></li>
              <li><a href="about.html">FOTOGRAFÍAS</a></li>
              <li><a href="about.html">UBICACIÓN</a></li>
              <li><a href="about.html">CONTACTO</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
};

export default Navbar;

// <div className="fh5co-top-menu menu-1 text-center">
//   <ul>



// <div className="fh5co-top-social menu-1 text-right">
//   <ul className="fh5co-social">
//     <li><a href="#"><i className="icon-twitter"></i></a></li>
//     <li><a href="#"><i className="icon-facebook"></i></a></li>
//   </ul>
// </div>
