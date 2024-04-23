import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PublicRoute({children}) {
 const userData = useSelector((state) => state.userData.userData)
 if (userData) return <Navigate to="/createroom" replace />
 return children
}

export default PublicRoute