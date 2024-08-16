import React from 'react';
import UserIP from '../components/UserIP';
import PortScanner from '../components/PortScanner';
import VirusScan from '../components/VirusScan';
import ProfessionalSummary from '../components/ProfessionalSummary';

const Home = () => {
    return (
        <div>
            <h1 className = "bg-black text-gray-200 text-4xl font-extrabold p-4">
            𝔚𝔢𝔩𝔠𝔬𝔪𝔢</h1>
            <ProfessionalSummary />
            <p>Here are some basic security tools for you to practice with.</p>
            <p>The port scanner will only scan your detected IP to cut down on missuse.</p>
            <UserIP />
            <PortScanner />
            <VirusScan />
        </div>
        
    );
};

export default Home;
