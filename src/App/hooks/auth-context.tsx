import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Spin } from 'antd'

import { auth } from '../../firebase'

const { REACT_APP_BASE_URL: baseUrl } = process.env

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | undefined;
  userId: string | undefined;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
  reset: (email: string) => void;
}

export interface IAuthState {
  isLoggedIn: boolean;
  token: string | undefined;
  userId: string | undefined;
}

const authInitialState: IAuthState = {
  isLoggedIn: false,
  token: undefined,
  userId: undefined
}

const authReducer = (state: IAuthState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userId: action.payload._id,
        token: action.token,
        isLoggedIn: !!action.token
      }
    case 'LOGOUT':
      return {
        ...state,
        ...authInitialState
      }
    default: return authInitialState
  }
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: undefined,
  userId: undefined,
  login: () => {},
  signup: () => {},
  logout: () => {},
  reset: () => {}
})

const AuthContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(
      async (user) => {
        if (!user) {
          dispatch({
            type: 'LOGOUT'
          })
        } else {
          const { token } = await user.getIdTokenResult()
          const result = await axios({
            method: 'post',
            url: `${baseUrl}/auth/create-find-user`,
            data: {},
            headers: {
              authorization: token
            }
          })
          dispatch({
            type: 'LOGIN',
            payload: result.data,
            token: token
          })
        }
        setIsLoading(false)
      })
    return unsubscribe
  }, [])

  const signup = useCallback<(email: string, password: string) => void> ((email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }, [])

  const login = useCallback<(email: string, password: string) => void> ((email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }, [])

  const logout = useCallback<() => void> (() => {
    return auth.signOut()
  }, [])

  const resetPassword = useCallback<(email: string) => void> ((email) => {
    const config = {
      url: `${baseUrl}/auth/login`,
      handleCodeInApp: true
    }
    return auth.sendPasswordResetEmail(email, config)
  }, [])
  // console.log('re-rendering auth-context provider')

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size='large' />
      </div>
    )
  }
  return (
    <AuthContext.Provider value={{ signup, login, logout, isLoggedIn: !!state.token, userId: state.userId, token: state.token, reset: resetPassword }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const useAuth = () => {
  return useContext(AuthContext)
}
