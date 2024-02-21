import React from 'react';
import styles from '../stylesheets/app.module.css';

import EventTag from '../components/EventTag.jsx';

export default function MainContainer() {

    return (
        <div className={styles.main_container}>
            <EventTag />
        </div>
    );
};