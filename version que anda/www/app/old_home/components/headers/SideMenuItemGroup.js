import React from 'react';
import autoBind from 'react-autobind';
import SideMenuItem from './SideMenuItem';
import SideMenuGroupHeader from './SideMenuGroupHeader';

class SideMenuItemGroup extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      active: false,
      icon: "mdi-hardware-keyboard-arrow-right"
    }
  }
  toogleActive() {
    this.state.active = !this.state.active;

    if(this.state.active) {
      this.state.icon="mdi-hardware-keyboard-arrow-down";
    }
    else {
      this.state.icon="mdi-hardware-keyboard-arrow-right";
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('update!!');
  }

  render() {
    return(
      <div>
        <SideMenuGroupHeader onClick={this.toogleActive()} icon={this.state.icon} data_toggle="collapse" data_target={'#'.concat(this.props.id_data)} desc={this.props.desc} />
        <div id={this.props.id_data} className="collapse">
        {
          this.props.innerElements.map(function(element, i) {
            return (
              <SideMenuItem key={i} url={element.url} desc={element.desc} element_id="level2NavbarItem"/>
            )
          })
        }
        </div>
      </div>
    )
  }
};

export default SideMenuItemGroup;
