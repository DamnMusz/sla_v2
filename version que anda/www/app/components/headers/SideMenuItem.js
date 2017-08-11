import React from 'react';
import autoBind from 'react-autobind';

class SideMenuItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    if(this.props.element_id != undefined)
      this.state = {
        element_id: this.props.element_id
      }
    else
      this.state = {
        element_id: ""
      }
  }
  render() {
      return(
        <li id={this.state.element_id} className={this.props.active} ><a href={this.props.url}><i className="fa fa-circle-o"></i> {this.props.desc}</a></li>
      )
  }
};

export default SideMenuItem;
