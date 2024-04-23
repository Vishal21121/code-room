import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
 const userData = useSelector((state) => state.userData.userData)

 if (!userData) return <Navigate to="/" replace />
 return children
}

export default PrivateRoute