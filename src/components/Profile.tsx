

import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css'

export function Profile(){
    const {level} = useContext(ChallengeContext); 

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/claudiogodoy99.png" alt="Claudio Godoy"/>
            <div>
                <strong>Claudio Godoy</strong>
                <p>
                    <img src="icons/level.svg"
                        alt="claudio godoy"/>
                    Level { level }
                </p>
            </div>
        </div>
    );
}