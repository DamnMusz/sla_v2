import React from 'react';
import autoBind from 'react-autobind';
import ImageRow from './ImageRow';
import Navbar from './headers/Navbar'
import GMap from './headers/GMap'

class Index extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  loadSampleData() {
  }

  // Handle when user navigates to a conversation directly without first loading the index...
  componentWillMount() {
    // if('human' in this.props.params){
    //   this.loadSampleData();
    // }
  }

  render() {
    var fotosStyle = {
      backgroundColor: '#F5F5F5'
    };
    var footerStyle = {
      backgroundColor: '#A1887F',
      color: '#FFFFFF',
      fontWeight: 'bold'
    };
    return (
      <div style={fotosStyle}>

      <div className="fh5co-loader"></div>

      <div id="page">
      <Navbar />

      <div id="fh5co-work">
        <div className="container">
          <div className="row">
            <ImageRow url='images/bt_home_complejo_over.jpg' desc="EL COMPLEJO"/>
            <ImageRow url='images/bt_home_aparts_over.jpg' desc="APARTAMENTOS"/>
            <ImageRow url='images/bt_home_spa_over.jpg' desc="SPA"/>
            <ImageRow url='images/bt_home_fotos2_over.jpg' desc="FOTOGRAFÍAS"/>
            <ImageRow url='images/bt_home_servicios_over.jpg' desc="SERVICIOS"/>
            <ImageRow url='images/project-6.jpg' desc="MÁS"/>
          </div>
        </div>
      </div>

      <div id="fh5co-author" className="fh5co-bg-section">
        <div className="container">
          <div className="row animate-box">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>El Complejo</h2>
              <p>
              El Complejo Lomas del Mar se encuentra situado en un lugar privilegiado: sobre la playa, frente al mar y a minutos del centro de Mar de las Pampas.
              Cuenta con unidades totalmente equipadas, detalles de diseño y confort para 2, 4 y 6 personas.
              Sus amplios ventanales ofrecen vistas espectaculares al mar como uno de sus mayores atributos.
              Lomas del Mar cuenta con todas las comodidades y servicios para que su estadía sea inolvidable.
              </p>
              <p><a href="about.html" className="btn btn-primary btn-outline">Ver más</a></p>
              <ul className="fh5co-social-icons">
                <li><a href="#"><i className="icon-twitter"></i></a></li>
                <li><a href="#"><i className="icon-facebook"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="fh5co-started">
        <div className="container">
          <div className="row animate-box">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>Ubicación</h2>
              <p>Sobre la playa, en un lugar privilegiado, puede encontrarnos en La Calle 32 y Playa, Las Gaviotas.</p>
            </div>
            <GMap />
          </div>
        </div>
      </div>

      <footer id="fh5co-footer" role="contentinfo" style={footerStyle}>
        <div className="container">
          <div className="row copyright">
            <div className="col-md-12 text-center">
              <p>
                <small className="block">CALLE 32 Y PLAYA - LAS GAVIOTAS - Tel: (011)15-6397-8565 - info@lomasdelmar.com.ar</small>
              </p>

              <ul className="fh5co-social-icons">
                <li><a href="#"><i className="icon-twitter"></i></a></li>
                <li><a href="#"><i className="icon-facebook"></i></a></li>
              </ul>

            </div>
          </div>

        </div>
      </footer>
      </div>

      <div className="gototop js-top">
        <a href="#" className="js-gotop"><i className="icon-arrow-up"></i></a>
      </div>

      </div>
    )
  }
};

export default Index;
