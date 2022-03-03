import React from 'react';
import { Link } from 'react-router-dom';
import   withScorm   from '../lib/withScorm';
import PAGES from '../components/objects/PagesObject'

class FooterEnglish extends React.Component {    
  
    render(){

        const {currentPage, PreviousPage, NextPage, exit} = this.props.sco;

        return (
            <footer className="footer__container">
                <button className="footer__button footer__button--end" onClick={exit}>EXIT</button>
                <div className="button-container">
                   {currentPage !== 1 ?          
                       <Link to={ `/${currentPage-1}` }  >
                         <button id="prev-btn" className="footer__button" onClick={PreviousPage}>PREVIOUS</button>
                       </Link> 
                       : <button id="next-btn" className="footer__button footer__button--transparent" disabled onClick={PreviousPage}>PREVIOUS</button>}
                   
                    <div id="counter"  className="footer__button footer__button--disabled">
                        {`${currentPage}  /  ${PAGES.length}`}
                    </div>
                    {currentPage !== PAGES.length ?
                      <Link to={ `/${currentPage+1}` }  >
                        <button id="next-btn" className="footer__button" onClick={NextPage}>NEXT</button>
                      </Link>
                        : <button id="next-btn" className="footer__button footer__button--transparent" disabled onClick={NextPage}>NEXT</button>}
                </div>
                
            </footer>
        )
    }
}


export default  withScorm()(FooterEnglish);