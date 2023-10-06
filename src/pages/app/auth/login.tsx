// import type { NextPage } from 'next'
// import MainContainer from '../../../components/MainContainer/MainContiner'

// const Login: NextPage = () => {
//   return (
//     <MainContainer title="SWGU | Login" description="A Star Wars TCG Login page">
//       <h1>Login Page</h1>
//     </MainContainer>
//   )
// }

// export default Login

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import styles from '../../../styles/Login.module.css';

export default function Login() {
  // get session from nextAuth
  const { data: session } = useSession()
  const router = useRouter();
  if (session) {
    return (
      <div className={styles.container}>
        <h1 className="title">Create Next App</h1>
        <div className={styles.content}>
             <h2> Signed in as {session?.user?.email} <br /></h2> 
              <div className={styles.btns}>
              <button className={styles.button} onClick={() => router.push('/Profile')}>
                 User Profile 
             </button>
              <button className={styles.button} onClick={() => {
                  signOut()
              }}>
                 Sign out
             </button>
              </div>
        </div>
      </div>

    )
  }
  return (
    <div className={styles.container}>
       <h1 className="title">Create Next App</h1>
      <div className={styles.content}>
          <h2> You are not signed in!!</h2>
      <button className={styles.button}
      onClick={() => signIn()}>Sign in</button>
      </div>
    </div>
  )
}