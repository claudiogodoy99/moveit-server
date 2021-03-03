import React, { useState, useEffect, useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'



const Countdown: React.FC = () => {

    const {
        minutes,
        seconds,
        hasFinish,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);
    

    const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('');

    
    return (
        <div>
            <div className={styles.container}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRigth}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRigth}</span>
                </div>
            </div>

            { hasFinish ? (
                <button
                    disabled
                    className={styles.button}>
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        { isActive ? (
                            <button type="button"
                                className={`${styles.button} ${styles.buttonActive}`}
                                onClick={resetCountdown}>
                                Abandonar Ciclo
                            </button>

                        ) :
                            (
                                <button type="button"
                                    className={styles.button}
                                    onClick={startCountdown}>
                                    Iniciar Ciclo
                                </button>
                            )}
                    </>
                )}




        </div>
    );
}

export default Countdown;