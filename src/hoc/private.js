import { useLocation, Navigate } from 'react-router-dom'

const Private = ({ children }) => {
  const location = useLocation()
  const auth = localStorage.length

  if (auth > 0) {
    return children
  }

  return <Navigate to="/sign-in" state={{ from: location }} />
}

export default Private
