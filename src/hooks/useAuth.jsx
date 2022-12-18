import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManager = false
  let isAdmin = false
  let status = 'Employee'

  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles } = decoded.UserInfo

    isManager = roles.some(role => role === 'Manager')
    isAdmin = roles.some(role => role === 'Admin')

    status = isAdmin ? 'Admin' : isManager ? 'Manager' : 'Employee'

    return { username, roles, status, isManager, isAdmin }
  }

  return { username: '', roles: [], isManager, isAdmin, status }
}

export default useAuth
