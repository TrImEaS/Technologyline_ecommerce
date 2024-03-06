import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate()

  return (
    <>
    <div>
      <h1>Error 404</h1>
      <span>Not found</span>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
    </>
  )
}