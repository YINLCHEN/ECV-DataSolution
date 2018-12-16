import React from 'react'
import { Route } from 'react-router-dom'
import DashboardApp from './components/Dashboard/App'

const router = () => (
    <div>
        <Route path="/" exact component={Dashboard} />
        <Route path="/Dashboard" component={Dashboard} />
    </div>
)

const Dashboard = () => (
    <DashboardApp />
)

export default router