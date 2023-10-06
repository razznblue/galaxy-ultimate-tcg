"use client";
import { ReactNode } from 'react';
import type { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react' 

type ProvidersWrapperProps = {
  children: ReactNode;
}; 

const ProvidersWrapper: NextPage<ProvidersWrapperProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default ProvidersWrapper