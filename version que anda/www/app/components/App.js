import React from 'react';
import autoBind from 'react-autobind';
import Navbar from './headers/Navbar'
import SideMenu from './headers/SideMenu'
import Copyright from './footers/Copyright'

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    $.material.init();
  }

  loadSampleData() {
  }

  // Handle when user navigates to a conversation directly without first loading the index...
  componentWillMount() {
    // if('human' in this.props.params){
    //   this.loadSampleData();
    // }
  }

  render() {
    return (
      <div>
      <div className="my-default-navbar">
        <Navbar index_url='/app' brand_1='Tecno' brand_2='red' menu_icon='true' />
      </div>
        <div className="content-wrap">
          <SideMenu />
          <div className="my-container">
            <div className="container">
              <h1>Hola</h1>
            </div>
          </div>
        </div>
        <Copyright url='http://www.tecno-red.com.ar' desc='Tecnored'/>
      </div>
    )
  }
};

export default App;
