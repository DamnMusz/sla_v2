import React from 'react';
import autoBind from 'react-autobind';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  renderLoginButton() {
    if(this.props.login_url != undefined)
      return (
        <div className="navbar-header navbar-right">
          <a href={this.props.login_url} className="btn btn-lg btn-border">Iniciar Sesión</a>
        </div>
      )
    else {
      return;
    }
  }
  renderLogo() {
    if(this.props.index_url != undefined)
      return (
        <div className="navbar-header navbar-left my-navbar-header">
          <a className="logo-left " href={this.props.index_url}><i className="fa fa-barcode"></i><b>{this.props.brand_1}</b>{this.props.brand_2}</a>
        </div>
      )
    else {
      return;
    }
  }
  renderMenuIcon() {
    if(this.props.menu_icon != undefined && this.props.menu_icon == 'true')
      return(
        <div className="navbar-left">
          <button className="menu-icon"  id="open-button">
            <i className="mdi-navigation-menu"></i>
          </button>
        </div>
      )
    else
      return;
  }
  renderContainer() {
    return (
      <div className="container">
        { this.renderMenuIcon() }
        { this.renderLogo() }
        { this.renderLoginButton() }
      </div>
    )
  }
  render() {
    if(this.props.nav_style == 'sticky') {
      return (
        <div className='navbar navbar-inverse sticky-navigation navbar-fixed-top' role="navigation" data-spy="affix" data-offset-top="200">
          { this.renderContainer() }
        </div>
      )
    } else {
      return (
        <div className='navbar navbar-inverse non-sticky-navigation navbar-fixed-top my-default-navbar' role="navigation">
          { this.renderContainer() }
        </div>
      )
    }
  }
};

export default Navbar;
