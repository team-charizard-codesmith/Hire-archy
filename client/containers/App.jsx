import React from 'react';
import styles from '../stylesheets/app.module.css';
import MainContainer from './MainContainer.jsx';
import TopNav from '../components/TopNav.jsx';
import LeftNav from '../components/LeftNav.jsx';

export default function App() {
    return (
        <>
            <TopNav />
            <div className={styles.app}>
                <LeftNav />
                <MainContainer />
            </div>
        </>
    );
};