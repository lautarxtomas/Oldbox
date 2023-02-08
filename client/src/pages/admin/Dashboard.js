import React from 'react'
import { useAuth } from '../../context/auth'
import Jumbotron from '../../components/cards/Jumbotron'

const Dashboard = () => {
  // context
  const [ auth, setAuth ] = useAuth()

  return (
    <div>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin dashboard" />
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  )
}

export default Dashboard