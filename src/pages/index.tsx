import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react';
import { DefaultSession } from 'next-auth';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';


const HomePage: NextPage = ({user}: {user: DefaultSession["user"]}) => {
  const { data: session } = useSession()

  const signInUser = () => {
    if (!session) signIn()
  }

  if (session) {
    console.log('session');
    console.log(session);
    return <Home user={session.user} />
  }
  if (user) {
    console.log('DefaultSession:');
    console.log(user);
  } 
  return <Login onClick={signInUser} />
}

export default HomePage
