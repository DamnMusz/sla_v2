import React from 'react';
import autoBind from 'react-autobind';
import Navbar from './Navbar'

class Header extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    return (
      <header className="hero-area" id="home">
        <div className="container">
          <div className="col-md-12">
            <Navbar login_url='/app' index_url='/' nav_style={this.props.nav_style} app_title={this.props.app_title} brand_1={this.props.brand_1} brand_2={this.props.brand_2}/>
          </div>
          <div className="contents text-right">
            <h1 className="wow fadeInRight" data-wow-duration="1000ms" data-wow-delay="300ms">{this.props.app_title} <b>{this.props.brand_1}{this.props.brand_2}</b></h1>
            <p className="wow fadeInRight" data-wow-duration="1000ms" data-wow-delay="400ms">SOFTWARE DE ESTAD&Iacute;STICAS Y CONTROL</p>
            <a href="#features" className="btn btn-lg btn-material-blue">Ver Aplicaciones</a>
          </div>
       </div>
      </header>
    )
  }
};

export default Header;
