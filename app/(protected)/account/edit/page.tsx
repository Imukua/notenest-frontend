'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Header } from '@/components/header/header'
import {ApiMethod} from '@/lib/types/types'
import { Routes } from '@/lib/routes/routes'
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'


export default function EditUserDetails() {
  const {user} = useAuth();
  const [username, setUsername] = useState(user?.username || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatarSrc, setAvatarSrc] = useState('/placeholder.svg?height=100&width=100')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({ username: '', password: '', confirmPassword: '' })
  const { sendProtectedRequest } = useApi();
 


  const isFormValid = username.length >= 5 && (password === '' || (password !== '' && password === confirmPassword))

  useEffect(() => {
    validateForm()
  }, [username, password, confirmPassword])

  const validateForm = () => {
    const newErrors = { username: '', password: '', confirmPassword: '' }

    if (username.length < 5) {
      newErrors.username = 'Username must be at least 5 characters long'
    }

    if (password !== '' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    if (!isFormValid) return


    setIsSubmitting(true)
    const response = await sendProtectedRequest(ApiMethod.PATCH, Routes.auth.profile, {username, password});
    console.log(response)
    
    setIsSubmitting(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    

  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setAvatarSrc(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-50 ">
        <Header/>
      <div className="container mx-auto px-4 mt-8">
        <Card className="max-w-2xl mx-auto bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl flex justify-center font-bold text-cyan-400 items-center">Edit Your Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={avatarSrc} alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300">
                    <Upload size={20} />
                    <span>Change Avatar</span>
                  </div>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </Label>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-slate-300">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                  />
                  {errors.username && (
                    <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password" className="text-slate-300">New Password (optional)</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-slate-300">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-50">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {showSuccess && (
          <Alert className="mt-4 max-w-2xl mx-auto bg-green-800 border-green-700 text-green-100">
            <Check className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your details have been updated successfully.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}