import React, { useContext } from 'react';
import styles from '../styles/components/ChallengeBox.module.css'

import {ChallengeContext} from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';

const ChallengeBox: React.FC = () => {
    const {activeChallenge,resetChallenge,completeChallenge} = useContext(ChallengeContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleSucceced(){
        completeChallenge();
        resetCountdown();
    }

    function handleFailed(){
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.container}>
            {
                activeChallenge ? (
                <div className={styles.active}>
                    <header> Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Level up"/>
                        <strong>Novo desafio</strong>
                        <p>
                            {activeChallenge.description}
                        </p>
                    </main>
                    <footer>
                        <button 
                            type="button"
                            className={styles.failedButton}
                            onClick={handleFailed}>
                            Falhei
                        </button>
                        <button 
                            type="button"
                            className={styles.sucssedButton}
                            onClick={handleSucceced}>
                            Completei
                        </button>
                    </footer>
                </div>) : (
                <div className={styles.notActive}>
                    <strong>
                        Inicie um ciclo para receber desafios a serem completados
                    </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                    Complete-os e ganhe
                    Experiência e avance de level.
                </p>
                </div>)
            }

        </div>
    );
}

export default ChallengeBox;