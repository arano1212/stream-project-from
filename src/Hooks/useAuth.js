import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'

export function useAuthContext () {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthContext debe estar dentro del proveedor AuthProvider')
  }

  return context
}
