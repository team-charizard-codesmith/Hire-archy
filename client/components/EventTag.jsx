import React from 'react'

import styles from '../stylesheets/eventTag.module.css'

export default function EventTag() {

    return (
        <>
            <div className={styles.event_tag}>
                <h3>Sr. Software Engineer - $175,000</h3>
                <h4>Google</h4>
                <p>Interview 1 | March 6th, 2024 | Stacey Evans - Engineering PM</p>
            </div>
            <div className={styles.event_tag}>
                <h3>Full-Stack Developer - $132,500</h3>
                <h4>Klevio, Inc.</h4>
                <p>Phone Screening | March 1th, 2024 | Mark Ellis - Recruiter</p>
            </div>
            <div className={styles.event_tag}>
                <h3>Software Engineer 2 - $135,000</h3>
                <h4>Netflix</h4>
                <p>Interview 2 | March 13th, 2024 | Yiting Xiao - Sr. Engineering PM</p>
            </div>
            <div className={styles.event_tag}>
                <h3>Front End Developer - $115,600</h3>
                <h4>Ikea</h4>
                <p>Interview 1 | March 12th, 2024 | Melissa Connely - Engineering PM</p>
            </div>
        </>
    )
}