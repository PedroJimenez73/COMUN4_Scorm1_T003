import React from 'react';
import Header from '../components/Header';  
import Menu from '../components/Menu';  
import Footer from '../components/Footer';  

//This component makes Header and footer repeat into all the project

const Layout = ({children}) =>  (
    <div className="Home">
        <Header/>
        <Menu/>
        { children }
        <Footer/>
    </div>
)

export default Layout;


