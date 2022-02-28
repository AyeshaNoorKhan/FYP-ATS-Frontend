import React from 'react';
import GreetingCard from './GreetingCard';
import Welcome from './Welcome';
import NavBar from './NavBar';

function Home(props) {
    return (
        <div >
            <Welcome/>
            <GreetingCard/>
        </div>
    );
}

export default Home;