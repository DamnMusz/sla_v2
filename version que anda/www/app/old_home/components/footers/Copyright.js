import React from 'react';
import autoBind from 'react-autobind';

class Copyright extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      anio: new Date().getFullYear()
    }
  }
  render() {
    return (
      <div className="my-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="copyright-text">
                  <strong>Copyright &copy; {this.state.anio} <a href={this.props.url} className="btn-flat btn-material-blue">{this.props.desc}</a>.</strong> Derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Copyright;
