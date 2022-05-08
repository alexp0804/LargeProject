import React, { useRef }  from 'react'; 
import Navbar from '../components/HomePage/NavBar';
import Hero from "../components/HomePage/Hero";
import SecondHero from '../components/HomePage/AboutHero/SecondHero';
import ThirdHero from '../components/HomePage/MapHero/ThirdHero';


const WelcomePage = () => {


    return (
        <>
        <body>

        <Navbar />
        <Hero />

      
        <SecondHero />

        <br/>
        <br/>
      
        <ThirdHero />

        </body>
         
        </>
      );
};

export default WelcomePage; 
