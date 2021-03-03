import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal';


interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number;
}

export interface ChallengeContextData {
    level: number,
    currentExperience: number,
    challengeCompleteds: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    resetChallenge: () => void,
    completeChallenge: () => void,
    levelUp: () => void,
    startNewChallenge: () => void,
    closeLevelUpModal: () => void
}

export interface ChanllengesProviderProps {
    children: ReactNode
    level: number,
    currentExperience: number,
    challengeCompleteds: number
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChanllengesProvider({
    children,
    ...rest
}: ChanllengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleteds, setChallengeCompleteds] = useState(rest.challengeCompleteds ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengeCompleteds', String(challengeCompleteds))
    }, [level, currentExperience, challengeCompleteds]);

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted')
            new Notification('Novo desafio 🙆🏻‍♂️', {
                body: `Valendo ${challenge.amount}`
            });
    }

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge)
            return;

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleteds(challengeCompleteds + 1);
    }


    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    return (
        <ChallengeContext.Provider value={{
            level,
            currentExperience,
            challengeCompleteds,
            activeChallenge,
            experienceToNextLevel,
            resetChallenge,
            completeChallenge,
            levelUp,
            startNewChallenge,
            closeLevelUpModal
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    )
}