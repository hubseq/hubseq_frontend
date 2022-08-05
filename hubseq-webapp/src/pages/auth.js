import { useSession, signIn, signOut } from "next-auth/react"
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        You are signed in<br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Please sign in <br />
      <button onClick={() => signIn('coginito', { callbackUrl: 'http://localhost:3000/files' })}>Sign in</button>
    </>
  )
}