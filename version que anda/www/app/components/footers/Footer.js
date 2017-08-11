import React from 'react';
import autoBind from 'react-autobind';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      enlaces: [
        {
          desc: 'Sitio Institucional',
          url: 'http://www.tecno-red.com.ar'
        },
        {
          desc: 'Agenda',
          url: 'http://inspecciones.tecno-red.com.ar'
        },
        {
          desc: 'Bárbara',
          url: 'http://www.barbara.com.ar'
        }
      ]
    }
  }
  render() {
    return (
      <section id="footer">
        <div className="container">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <h3>Enlaces</h3>
                <ul>
                {
                  this.state.enlaces.map(function(enlace, i) {
                    return (
                      <li key={i}><a href={enlace.url}>{enlace.desc}</a></li>
                    )
                  })
                }
                </ul>
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12">
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12">
                <h3>Seguinos</h3>
                <a className="social" href="https://www.linkedin.com/company/tecnored"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
        <a href="#home" className="btn btn-material-blue back-to-top">
        <i className="mdi-hardware-keyboard-arrow-up"></i>
        </a>
      </section>
    )
  }
};

export default Footer;
