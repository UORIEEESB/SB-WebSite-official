'use client'

import React, { createContext, useContext, useState } from 'react'

interface LoadingContextType {
  isAppLoading: boolean
  setAppLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAppLoading, setAppLoading] = useState(true)

  return (
    <LoadingContext.Provider value={{ isAppLoading, setAppLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}