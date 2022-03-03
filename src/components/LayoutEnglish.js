import React from 'react';
import Header from '../components/Header';  
import Menu from '../components/Menu';  
import FooterEnglish from '../components/FooterEnglish';  

//This component makes Header and footer repeat into all the project

const LayoutEnglish = ({children}) =>  (
    <div className="Home">
        <Header/>
        <Menu/>
        { children }
        <FooterEnglish/>
    </div>
)

export default LayoutEnglish;


