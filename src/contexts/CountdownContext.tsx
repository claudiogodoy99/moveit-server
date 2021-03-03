import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinish: boolean,
    isActive: boolean,
    startCountdown: () => void,
    resetCountdown: () => void
}
export interface CountdownProviderProps{
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData);

export default function CountdownProvider({ children}) {
    
    const { startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinish, setHasFinish] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;


    useEffect(() => {
        if (isActive && time > 0)
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        else if (isActive && time === 0) {
            setHasFinish(true);
            setIsActive(false);
            startNewChallenge();
        }

    }, [isActive, time])

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinish(false);
        setTime(0.1 * 60);
    }


    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinish,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
}