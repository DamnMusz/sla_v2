import React from 'react';
import autoBind from 'react-autobind';

class FeatureItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    return (
      <div className="col-md-4 col-sm-6 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="850ms">
        <div className="features">
          <div className="icon">
            <i className={this.props.icon}></i>
          </div>
          <div className="features-text">
            <h4>{this.props.title}</h4>
            <p>{this.props.desc}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default FeatureItem;
