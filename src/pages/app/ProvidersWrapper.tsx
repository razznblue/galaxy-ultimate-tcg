"use client";
import { ReactNode } from 'react';
import type { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react' 
import { AudioProvider } from '../../context/AudioContext';

type ProvidersWrapperProps = {
  children: ReactNode;
}; 

const ProvidersWrapper: NextPage<ProvidersWrapperProps> = ({ children }) => {
  return (
    <SessionProvider>
      <AudioProvider>
        {children}
      </AudioProvider>
    </SessionProvider>
  )
}

export default ProvidersWrapper
