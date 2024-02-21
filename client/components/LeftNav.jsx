import React from 'react';
import styles from '../stylesheets/leftNav.module.css';

export default function LeftNav() {

    return (
        <div className={styles.left_nav}>
            <button className={styles.button}>Add Posting</button>
            <button className={styles.button}>Add Company</button>
            <button className={styles.button}>Add Contact</button>
        </div>
    );
}