import React from 'react';
import autoBind from 'react-autobind';
import Header from './headers/Header'
import FeaturesList from './features/FeaturesList'
import Footer from './footers/Footer'
import Copyright from './footers/Copyright'

class Index extends React.Component {
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

      <div class="fh5co-loader"></div>

      <div id="page">
      <nav class="fh5co-nav" role="navigation">
        <div class="container">
          <div class="fh5co-top-logo">
            <div id="fh5co-logo"><a href="index.html">Lomas del Mar</a></div>
          </div>
          <div class="fh5co-top-menu menu-1 text-center">
            <ul>
              <li><a href="work.html">Work</a></li>
              <li><a href="about.html">Profile</a></li>
              <li class="has-dropdown">
                <a href="#">Dropdown</a>
                <ul class="dropdown">
                  <li><a href="#">Web Design</a></li>
                  <li><a href="#">eCommerce</a></li>
                  <li><a href="#">Branding</a></li>
                  <li><a href="#">API</a></li>
                </ul>
              </li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="fh5co-top-social menu-1 text-right">
            <ul class="fh5co-social">
              <li><a href="#"><i class="icon-twitter"></i></a></li>
              <li><a href="#"><i class="icon-dribbble"></i></a></li>
              <li><a href="#"><i class="icon-github"></i></a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="fh5co-work">
        <div class="container">
          <div class="row top-line animate-box">
            <div class="col-md-7 col-md-push-5 text-left intro">
              <h2>Shift is a free html5 template to showcase your work. <span class="fh5co-highlight">Made with <i class="icon-heart2"></i> by <a href="http://freehtml5.co">FreeHTML5.co</a> </span></h2>
            </div>

          </div>
          <div class="row">
            <div class="col-md-4 text-center animate-box">
              <a class="work" href="portfolio_detail.html">
                <div class="work-grid" style="background-image:url(/home/images/project-1.jpg);">
                  <div class="inner">
                    <div class="desc">
                    <h3>Folding Light</h3>
                    <span class="cat">Branding</span>
                  </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-4 text-center animate-box">
              <a class="work" href="portfolio_detail.html">
                <div class="work-grid" style="background-image:url(/home/images/project-2.jpg);">
                  <div class="inner">
                    <div class="desc">
                      <h3>Power Led Light</h3>
                      <span class="cat">Illustration</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-4 text-center animate-box">
              <a class="work" href="portfolio_detail.html">
                <div class="work-grid" style="background-image:url(/home/images/project-3.jpg);">
                  <div class="inner">
                    <div class="desc">
                      <h3>Elephant Origami</h3>
                      <span class="cat">Logo</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-4 text-center animate-box">
              <a class="work" href="portfolio_detail.html">
                <div class="work-grid" style="background-image:url(/home/images/project-4.jpg);">
                  <div class="inner">
                    <div class="desc">
                      <h3>Electric Kick Scooter</h3>
                      <span class="cat">Web Design</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-4 text-center animate-box">
              <a class="work" href="portfolio_detail.html">
                <div class="work-grid" style="background-image:url(/home/images/project-5.jpg);">
                  <div class="inner">
                    <div class="desc">
                      <h3>Shark Diver</h3>
                      <span class="cat">Branding</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-4 text-center animate-box">
              <a class="work" href="portfolio_detail.html">
                <div class="work-grid" style="background-image:url(/home/images/project-6.jpg);">
                  <div class="inner">
                    <div class="desc">
                      <h3>Objekte Unserer Tage Berlin</h3>
                      <span class="cat">Logo</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-4 text-center animate-box">
              <a class="work" href="portfolio_detail.html">
                <div class="work-grid" style="background-image:url(/home/images/project-7.jpg);">
                  <div class="inner">
                    <div class="desc">
                      <h3>Aloha Shirt</h3>
                      <span class="cat">Web Design</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-4 text-center animate-box">
              <a class="work" href="portfolio_detail.html">
                <div class="work-grid" style="background-image:url(/home/images/project-8.jpg);">
                  <div class="inner">
                    <div class="desc">
                      <h3>Olafur Elliasson Waterfall Versailles</h3>
                      <span class="cat">Branding</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-4 text-center animate-box">
              <a class="work" href="portfolio_detail.html">
                <div class="work-grid" style="background-image:url(/home/images/project-9.jpg);">
                  <div class="inner">
                    <div class="desc">
                      <h3>Hand Care</h3>
                      <span class="cat">Logo</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="fh5co-author" class="fh5co-bg-section">
        <div class="container">
          <div class="row animate-box">
            <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>A little about me</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <div class="author">
                <div class="author-inner animate-box" style="background-image: url(/home/images/person3.jpg);">
                </div>
                <div class="desc animate-box">
                  <span>Web Designer &amp; Developer</span>
                  <h3>Mike Airways</h3>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                  <p><a href="about.html" class="btn btn-primary btn-outline">Learn More</a></p>
                  <ul class="fh5co-social-icons">
                    <li><a href="#"><i class="icon-facebook"></i></a></li>
                    <li><a href="#"><i class="icon-twitter"></i></a></li>
                    <li><a href="#"><i class="icon-dribbble"></i></a></li>
                    <li><a href="#"><i class="icon-github"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="fh5co-started">
        <div class="container">
          <div class="row animate-box">
            <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>Get Started</h2>
              <p>We create beautiful themes for your site behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <p><a href="#" class="btn btn-primary">Lets work together</a></p>
            </div>
          </div>
        </div>
      </div>

      <footer id="fh5co-footer" role="contentinfo">
        <div class="container">
          <div class="row copyright">
            <div class="col-md-12 text-center">
              <p>
                <small class="block">&copy; 2016 Free HTML5. All Rights Reserved.</small>
                <small class="block">Designed by <a href="http://freehtml5.co/" target="_blank">FreeHTML5.co</a> Demo Images: <a href="http://unsplash.co/" target="_blank">Unsplash</a> &amp; <a href="http://blog.gessato.com/" target="_blank">Gessato</a></small>
              </p>

              <ul class="fh5co-social-icons">
                <li><a href="#"><i class="icon-twitter"></i></a></li>
                <li><a href="#"><i class="icon-facebook"></i></a></li>
                <li><a href="#"><i class="icon-linkedin"></i></a></li>
                <li><a href="#"><i class="icon-dribbble"></i></a></li>
              </ul>

            </div>
          </div>

        </div>
      </footer>
      </div>

      <div class="gototop js-top">
        <a href="#" class="js-gotop"><i class="icon-arrow-up"></i></a>
      </div>

      </div>
    )
  }
};

export default Index;
