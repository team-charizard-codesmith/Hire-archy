import React from 'react';
import MainContainer from './MainContainer.jsx';
import TopNav from '../components/TopNav.jsx';
import LeftNav from '../components/LeftNav.jsx';

export default function App() {
    return (
        <>
            <h1>Hire-Archy</h1>
            <TopNav />
            <LeftNav />
            <MainContainer />
        </>
    );
};