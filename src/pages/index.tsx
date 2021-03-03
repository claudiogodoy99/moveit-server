import React from "react";
import { GetServerSideProps } from 'next';

import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import ChallengeBox from "../components/ChallengeBox";
import CountdownProvider from "../contexts/CountdownContext";
import { ChanllengesProvider } from "../contexts/ChallengeContext";


interface HomeProps{
  level: number,
  currentExperience:number,
  challengeCompleteds: number
}

export default function Home({
  level,
  currentExperience,
  challengeCompleteds
}: HomeProps) {
  return (

    <div className={styles.container}>
      <ChanllengesProvider 
        level={level}
        currentExperience={currentExperience}
        challengeCompleteds={challengeCompleteds}>
        <Head>
          <title>
            Inicio | MoveIt
        </title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </ChanllengesProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengeCompleteds } = ctx.req.cookies;


  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleteds: Number(challengeCompleteds)
    }
  }
}
