import React from 'react';
import autoBind from 'react-autobind';
import SideMenuItem from './SideMenuItem';
import SideMenuItemGroup from './SideMenuItemGroup';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    return(
      <div className="navbar navbar-invers menu-wrap">
        <div className="navbar-header text-center">
          <a className="navbar-brand logo-right" href="javascript:void(0)"><i className="fa fa-barcode"></i>Tecnored</a>
        </div>
        <ul className="nav navbar-nav main-navigation">
          <SideMenuItemGroup id_data="menu1" desc="Previas"
            innerElements={[
              {url: '#one', desc: 'SLA Asegurados'},
              {url: '#two', desc: 'Resumen Ejecutivo'},
              {url: '#two', desc: 'Semestral Aseguradoras'},
              {url: '#two', desc: 'Semestral Inspectores'},
              {url: '#two', desc: 'Semestral Centros'}
            ]}
          />
          <SideMenuItemGroup id_data="menu2" desc="Administración"
            innerElements={[
              {url: '#one', desc: 'Liquidación Siniestros'},
              {url: '#two', desc: 'Liquidación Inspectores'},
              {url: '#two', desc: 'Liquidación Centros'},
              {url: '#two', desc: 'Fichadas'}
          ]} />
        </ul>
        <button className="close-button" id="close-button">Close Menu</button>

      </div>
    )
  }
};

export default SideMenu;
