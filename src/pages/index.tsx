import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react';
import { DefaultSession } from 'next-auth';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';


const HomePage: NextPage = ({user}: {user: DefaultSession["user"]}) => {
  const { data: session } = useSession()

  const signInUser = () => {
    if (!session) signIn('google')
  }

  if (session) {
    return <Home user={session.user} />
  }
  if (user) {
    console.log('DefaultSession:');
  } 
  return <Login onClick={signInUser} />
}

export default HomePage
