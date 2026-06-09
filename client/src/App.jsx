import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './frames/Login';
import GuardedRoute from './GuardedRoute';
import { Navigate } from 'react-router-dom';
import Dashboard from './frames/Dashboard';
import Machines from './frames/Machines';
import RestockPlan from './frames/RestockPlan';
import Routes_ from './frames/Routes';
import Logs from './frames/Logs';
import Workers from './frames/Workers';
import WorkerDashboard from './frames/WorkerDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            //<GuardedRoute>
              <Dashboard/>
          //  </GuardedRoute>
          } />
          <Route path="/machines" element={
          //<GuardedRoute>
            <Machines />
          //</GuardedRoute>
        } />

        <Route path="/restock-plan" element={
          //<GuardedRoute>
            <RestockPlan />
          //</GuardedRoute>
        } />

        <Route path="/routes" element={
          //<GuardedRoute>
            <Routes_ />
          //</GuardedRoute>
        } />

        <Route path="/logs" element={
          //<GuardedRoute>
            <Logs />
          //</GuardedRoute>
        } />

        <Route path="/workers" element={
          //<GuardedRoute>
            <Workers />
          //</GuardedRoute>
        } />


          <Route path="/worker" element={
           // <GuardedRoute>
              <WorkerDashboard/>
           // </GuardedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </>
  )
}

export default App
