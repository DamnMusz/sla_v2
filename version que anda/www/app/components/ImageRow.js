import React from 'react';
import autoBind from 'react-autobind';

class ImageRow extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

  }
  render() {
    var divStyle = {
      backgroundImage: 'url(' + this.props.url + ')',
    };
    return (
        <div className="col-md-4 text-center animate-box">
          <a className="work" href="portfolio_detail.html">
            <div id="image" className="work-grid" style={divStyle}>
              <div className="inner">
                <div className="desc">
                <h3>{this.props.desc}</h3>
                <span className="cat">Ver más</span>
              </div>
              </div>
            </div>
          </a>
        </div>
    )
  }
};

export default ImageRow;
