import React from 'react';
import INFO from '../components/objects/InfoObject'
import   withScorm   from '../lib/withScorm';

class Header extends React.Component {
    render(){

    const {isMenuOpen, toggleMenu} = this.props.sco;

     return (
             <header className="header__container">
                  <div className="hamburger__container" onClick={ toggleMenu } style={{cursor: 'pointer'}}>
                      <div id="hamburger" className={ isMenuOpen }> 
                          <span className={ isMenuOpen ? 'hamburger__first-bar hamburger__first-bar--closed' : 'hamburger__first-bar'  }></span>
                          <span className={ isMenuOpen ? 'hamburger__second-bar hamburger__second-bar--closed' : 'hamburger__second-bar'  }></span>
                          <span className={ isMenuOpen ? 'hamburger__third-bar hamburger__third-bar--closed' : 'hamburger__third-bar'  }></span>
                      </div>
                      <h1 className="menu__title">{ INFO.title }</h1>
                  </div>
                  <img src='https://ucjc.blackboard.com/bbcswebdav/institution/UCJC/Sistemas/Contenidos/logo_black.svg' className="logo" alt="Logo Universidad Camilo José Cela"/>
              </header>
        );
    }
};


export default  withScorm()(Header);