import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';


const HomePage: NextPage = () => {
  const { data: session } = useSession()

  const signInUser = () => {
    if (!session) signIn('google')
  }

  return session 
    ? <Home user={session.user} />
    : <Login onClick={signInUser} />
}

export default HomePage
