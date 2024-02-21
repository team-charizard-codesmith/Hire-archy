import React from 'react'

import styles from '../stylesheets/eventTag.module.css'

export default function EventTag() {

    return (
        <>
            <div className={styles.event_tag}>
                <h3>Sr. Software Engineer - $175,000</h3>
                <h5>Google</h5>
                <p>Interview 1 | March 6th, 2024 | Stacey Evans - Engineering PM</p>
            </div>
            <div className={styles.event_tag}>
                <h3>Full-Stack Developer - $132,500</h3>
                <h5>Klevio, Inc.</h5>
                <p>Phone Screeing | March 1th, 2024 | Mark Ellis - Recruiter</p>
            </div>
            <div className={styles.event_tag}>
                <h3>Software Engineer 2 - $135,000</h3>
                <h5>Netflix</h5>
                <p>Interview 2 | March 13th, 2024 | Yiting Xaio - Sr. Engineering PM</p>
            </div>
            <div className={styles.event_tag}>
                <h3></h3>
                <h5>Klevio, Inc.</h5>
                <p>Phone Screeing | March 1th, 2024 | Mark Ellis - Recruiter</p>
            </div>
        </>
    )
}