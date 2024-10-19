'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from '@/components/header/header'
import { useApi } from '@/hooks/useApi'
import { Routes } from '@/lib/routes/routes'
import ApiMethod from '@/lib/types/types'
import TokenStore from '@/lib/auth/tokenstore'

export default function SignInPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const router = useRouter()
  const { sendRequest } = useApi(); 

  useEffect(() => {
    setIsUsernameValid(username.length >= 5)
    setIsPasswordValid(password.length >= 8)
  }, [username, password])

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {

      const {data,status} = await sendRequest(ApiMethod.POST,Routes.auth.login,{username,password})

      if (status === 201){
        TokenStore.setAccessToken(data.accessToken)
        TokenStore.setRefreshToken(data.refreshToken)
        router.push('/dashboard')
      }else{
        throw new Error('Failed to sign in')
      }

    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = isUsernameValid && isPasswordValid

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-50">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-blue-800/50 to-indigo-800/50 backdrop-blur-sm">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Sign In
            </h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-blue-200">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={cn(
                    "w-full bg-blue-950/50 border-blue-800/50 text-blue-100 placeholder-blue-400",
                    !isUsernameValid && username && "border-red-500"
                  )}
                  aria-invalid={!isUsernameValid && username !== ''}
                  aria-describedby="username-error"
                />
                {!isUsernameValid && username && (
                  <p id="username-error" className="text-red-400 text-sm">
                    Username must be at least 5 characters long
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={cn(
                      "w-full bg-blue-950/50 border-blue-800/50 text-blue-100 placeholder-blue-400 pr-10",
                      !isPasswordValid && password && "border-red-500"
                    )}
                    aria-invalid={!isPasswordValid && password !== ''}
                    aria-describedby="password-error"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-blue-300" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-blue-300" />
                    )}
                  </Button>
                </div>
                {!isPasswordValid && password && (
                  <p id="password-error" className="text-red-400 text-sm">
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>
              {error && (
                <p id="form-error" className="text-red-400 text-sm" role="alert">
                  {error}
                </p>
              )}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-blue-200 w-full">
              Don't have an account?{' '}
              <Link href="/signup" className="text-cyan-400 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}