import React from 'react';
import autoBind from 'react-autobind';
import SideMenuItem from './SideMenuItem';

class SideMenuGroupHeader extends SideMenuItem {
  constructor(props) {
    super(props);
    autoBind(this);

    if(this.props.element_id != undefined)
      this.state = {
        element_id: this.props.element_id
      }
    else
      this.state = {
        element_id: "defaultSideMenuItem"
      }
  }
  render() {
      return (
        <li id={this.state.element_id} className={this.props.active} data-toggle={this.props.data_toggle} data-target={this.props.data_target}>
          {this.props.desc}
          <i className={(this.props.icon).concat(" pull-right")}></i>
        </li>
      )
  }
};

export default SideMenuGroupHeader;
