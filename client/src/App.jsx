import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import GuardedRoute from './GuardedRoute';
import { Navigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <GuardedRoute>
              <h1>Welcome to the Dashboard, Owner!</h1>
            </GuardedRoute>
          } />

          <Route path="/worker" element={
            <GuardedRoute>
              <h1>Welcome!</h1>
            </GuardedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </>
  )
}

export default App
