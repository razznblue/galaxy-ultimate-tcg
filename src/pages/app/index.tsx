import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Home from '../../components/Home/Home';
import Loading from '../../components/Loading/Loading';

const AppHome: NextPage = () => {
  const { data: session } = useSession()

  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return <Loading />
  }

  return <Home user={session.user} />

}

export default AppHome
