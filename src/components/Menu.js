import React from 'react';
import INFO from '../components/objects/InfoObject';
import { Link } from 'react-router-dom';
import withScorm from '../lib/withScorm';
import ApiService from '../services/ApiServices';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.apiService = new ApiService();
    }
    render(){
    const {isMenuOpen, toggleMenu, navMenu} = this.props.sco;
    
    window.addEventListener('slideTo', e => {
        navMenu(e.detail.slideIndex);
    });

    let pagesMenu = this.apiService.getCachedConfiguration().filter(page => !!page.title)
    return (
        <>
            <div className={ isMenuOpen ? 'black' : 'black--closed' } onClick={ toggleMenu } ></div>
            <div className={ isMenuOpen ? 'menu menu--opened' : 'menu menu--closed'  }>
                <div className="menu__cover" onClick={ toggleMenu }>
                <h2 className="cover__title">{ INFO.title }</h2>
                </div>
                <nav>
                    <ul className="menu__nav">
                        {pagesMenu.map((pageMenu, index) =>
                        <Link to={ `/${pageMenu.id}` }  key={index+1}>
                            <li onClick={() => {toggleMenu(); navMenu(pageMenu.id) }} id={pageMenu.id}>{pageMenu.title}</li>
                        </Link>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
    }
};

export default withScorm()(Menu);
