import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export default function CompletedChallenges(){
    const {challengeCompleteds} = useContext(ChallengeContext);
    
    return(
        <div className={styles.container}>
            <span>Desafios completos</span>
            <span>{challengeCompleteds}</span>
        </div>
    );
}