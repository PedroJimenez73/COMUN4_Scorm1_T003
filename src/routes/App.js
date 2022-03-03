import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Layout from '../components/Layout';
import withScorm from '../lib/withScorm';
import DynamicSlider from '../sliders/DynamicSlider';

const App = (props) => {
    const { location } = useLocation();

    window['sco'] = props.sco;

    React.useEffect(() => {
        //console.log('Location changed', window.location.search);
    }, [location]);

    const match = window.location.hash.match(/\d+$/);
    const currentPage = Number(!!match ? match[0] : '1');
    const scoCurrentPage = props.sco.currentPage || 1;
    if (scoCurrentPage != currentPage) props.sco.navMenu(currentPage);
    if(!match) window.location.href = `${window.location.href}${scoCurrentPage}`;
    
    // let redirectTimeout = null;
    // if (scoCurrentPage != currentPage) {
    //     clearTimeout(redirectTimeout);
    //     redirectTimeout = setTimeout(() => window.dispatchEvent(new CustomEvent('slideTo', { 
    //         bubbles : true,
    //         cancelable : true,
    //         detail: {slideIndex : scoCurrentPage}
    //     })), 1000);
    // }

    return (
        <Layout>
            {/* <Redirect
                from="/#/"
                to="1" /> */}
            <Switch>
                <Route path={"/:id"} component={DynamicSlider} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    )
}

export default withScorm()(App);