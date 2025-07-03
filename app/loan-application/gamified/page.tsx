"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  DollarSign,
  User,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  CreditCard,
  Target,
  Shield,
} from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  maritalStatus: string
  dependents: string
  residencyStatus: string

  // Property Information
  propertyType: string
  propertyValue: string
  propertyAddress: string
  propertyPostcode: string
  propertyState: string
  isFirstHome: boolean
  purchasePrice: string
  deposit: string

  // Employment Information
  employmentStatus: string
  employer: string
  jobTitle: string
  employmentLength: string
  annualIncome: string
  otherIncome: string

  // Financial Information
  existingLoan: string
  creditCardDebt: string
  otherDebts: string
  monthlyExpenses: string
  assets: string

  // Loan Requirements
  loanAmount: string
  loanPurpose: string
  loanTerm: string
  repaymentType: string
  preferredRate: string

  // Authorization
  creditCheck: boolean
  termsAccepted: boolean
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  maritalStatus: "",
  dependents: "",
  residencyStatus: "",
  propertyType: "",
  propertyValue: "",
  propertyAddress: "",
  propertyPostcode: "",
  propertyState: "",
  isFirstHome: false,
  purchasePrice: "",
  deposit: "",
  employmentStatus: "",
  employer: "",
  jobTitle: "",
  employmentLength: "",
  annualIncome: "",
  otherIncome: "",
  existingLoan: "",
  creditCardDebt: "",
  otherDebts: "",
  monthlyExpenses: "",
  assets: "",
  loanAmount: "",
  loanPurpose: "",
  loanTerm: "",
  repaymentType: "",
  preferredRate: "",
  creditCheck: false,
  termsAccepted: false,
}

export default function GamifiedLoanApplication() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const loanType = searchParams.get("type") || "refinance"

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 5

  const steps = [
    { number: 1, title: "Personal Details", icon: User, description: "Tell us about yourself" },
    { number: 2, title: "Property Information", icon: Home, description: "Property details and value" },
    { number: 3, title: "Employment & Income", icon: Building, description: "Your employment situation" },
    { number: 4, title: "Financial Position", icon: DollarSign, description: "Assets, debts, and expenses" },
    { number: 5, title: "Review & Submit", icon: CheckCircle, description: "Review and authorize application" },
  ]

  useEffect(() => {
    // Load saved form data
    const savedData = localStorage.getItem("homeOnlineApplication")
    if (savedData) {
      const parsed = JSON.parse(savedData)
      if (parsed.data) {
        setFormData(parsed.data)
      }
    }
  }, [])

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
        if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required"
        if (!formData.residencyStatus) newErrors.residencyStatus = "Residency status is required"
        break

      case 2:
        if (!formData.propertyType) newErrors.propertyType = "Property type is required"
        if (!formData.propertyValue.trim()) newErrors.propertyValue = "Property value is required"
        if (!formData.propertyAddress.trim()) newErrors.propertyAddress = "Property address is required"
        if (!formData.propertyPostcode.trim()) newErrors.propertyPostcode = "Postcode is required"
        if (!formData.propertyState) newErrors.propertyState = "State is required"
        if (loanType === "new" || loanType === "firstTime") {
          if (!formData.purchasePrice.trim()) newErrors.purchasePrice = "Purchase price is required"
          if (!formData.deposit.trim()) newErrors.deposit = "Deposit amount is required"
        }
        break

      case 3:
        if (!formData.employmentStatus) newErrors.employmentStatus = "Employment status is required"
        if (!formData.employer.trim()) newErrors.employer = "Employer is required"
        if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required"
        if (!formData.employmentLength) newErrors.employmentLength = "Employment length is required"
        if (!formData.annualIncome.trim()) newErrors.annualIncome = "Annual income is required"
        break

      case 4:
        if (!formData.monthlyExpenses.trim()) newErrors.monthlyExpenses = "Monthly expenses are required"
        if (!formData.assets.trim()) newErrors.assets = "Assets information is required"
        break

      case 5:
        if (!formData.loanAmount.trim()) newErrors.loanAmount = "Loan amount is required"
        if (!formData.loanPurpose) newErrors.loanPurpose = "Loan purpose is required"
        if (!formData.loanTerm) newErrors.loanTerm = "Loan term is required"
        if (!formData.creditCheck) newErrors.creditCheck = "Credit check authorization is required"
        if (!formData.termsAccepted) newErrors.termsAccepted = "Terms acceptance is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      // Save progress
      const applicationData = {
        id: Date.now().toString(),
        type: loanType,
        data: formData,
        currentStep,
        lastUpdated: new Date().toISOString(),
        status: "in_progress",
      }
      localStorage.setItem("homeOnlineApplication", JSON.stringify(applicationData))

      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setIsSubmitting(true)

    try {
      // Save complete application
      const applicationData = {
        id: Date.now().toString(),
        type: loanType,
        data: formData,
        currentStep: totalSteps,
        lastUpdated: new Date().toISOString(),
        status: "submitted",
        submittedAt: new Date().toISOString(),
      }

      localStorage.setItem("homeOnlineApplication", JSON.stringify(applicationData))

      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to secure account setup
      router.push("/secure-account-setup")
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="04XX XXX XXX"
                />
              </div>
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className={`pl-10 ${errors.dateOfBirth ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">
                  Marital Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => handleInputChange("maritalStatus", value)}
                >
                  <SelectTrigger className={errors.maritalStatus ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="defacto">De facto</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maritalStatus && <p className="text-sm text-red-500">{errors.maritalStatus}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dependents">Number of Dependents</Label>
                <Select value={formData.dependents} onValueChange={(value) => handleInputChange("dependents", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4+">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="residencyStatus">
                  Residency Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.residencyStatus}
                  onValueChange={(value) => handleInputChange("residencyStatus", value)}
                >
                  <SelectTrigger className={errors.residencyStatus ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">Australian Citizen</SelectItem>
                    <SelectItem value="permanent">Permanent Resident</SelectItem>
                    <SelectItem value="temporary">Temporary Resident</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.residencyStatus && <p className="text-sm text-red-500">{errors.residencyStatus}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyType">
                  Property Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger className={errors.propertyType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyType && <p className="text-sm text-red-500">{errors.propertyType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyValue">
                  Property Value <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="propertyValue"
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange("propertyValue", e.target.value)}
                    className={`pl-10 ${errors.propertyValue ? "border-red-500" : ""}`}
                    placeholder="650,000"
                  />
                </div>
                {errors.propertyValue && <p className="text-sm text-red-500">{errors.propertyValue}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyAddress">
                Property Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                  className={`pl-10 ${errors.propertyAddress ? "border-red-500" : ""}`}
                  placeholder="123 Main Street, Suburb"
                />
              </div>
              {errors.propertyAddress && <p className="text-sm text-red-500">{errors.propertyAddress}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyPostcode">
                  Postcode <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="propertyPostcode"
                  value={formData.propertyPostcode}
                  onChange={(e) => handleInputChange("propertyPostcode", e.target.value)}
                  className={errors.propertyPostcode ? "border-red-500" : ""}
                  placeholder="2000"
                />
                {errors.propertyPostcode && <p className="text-sm text-red-500">{errors.propertyPostcode}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyState">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.propertyState}
                  onValueChange={(value) => handleInputChange("propertyState", value)}
                >
                  <SelectTrigger className={errors.propertyState ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NSW">NSW</SelectItem>
                    <SelectItem value="VIC">VIC</SelectItem>
                    <SelectItem value="QLD">QLD</SelectItem>
                    <SelectItem value="WA">WA</SelectItem>
                    <SelectItem value="SA">SA</SelectItem>
                    <SelectItem value="TAS">TAS</SelectItem>
                    <SelectItem value="ACT">ACT</SelectItem>
                    <SelectItem value="NT">NT</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyState && <p className="text-sm text-red-500">{errors.propertyState}</p>}
              </div>
            </div>

            {(loanType === "new" || loanType === "firstTime") && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">
                      Purchase Price <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="purchasePrice"
                        value={formData.purchasePrice}
                        onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                        className={`pl-10 ${errors.purchasePrice ? "border-red-500" : ""}`}
                        placeholder="650,000"
                      />
                    </div>
                    {errors.purchasePrice && <p className="text-sm text-red-500">{errors.purchasePrice}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deposit">
                      Deposit Amount <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="deposit"
                        value={formData.deposit}
                        onChange={(e) => handleInputChange("deposit", e.target.value)}
                        className={`pl-10 ${errors.deposit ? "border-red-500" : ""}`}
                        placeholder="130,000"
                      />
                    </div>
                    {errors.deposit && <p className="text-sm text-red-500">{errors.deposit}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFirstHome"
                    checked={formData.isFirstHome}
                    onCheckedChange={(checked) => handleInputChange("isFirstHome", checked as boolean)}
                  />
                  <Label htmlFor="isFirstHome">This is my first home purchase</Label>
                </div>
              </>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">
                  Employment Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.employmentStatus}
                  onValueChange={(value) => handleInputChange("employmentStatus", value)}
                >
                  <SelectTrigger className={errors.employmentStatus ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">Full-time Employee</SelectItem>
                    <SelectItem value="parttime">Part-time Employee</SelectItem>
                    <SelectItem value="casual">Casual Employee</SelectItem>
                    <SelectItem value="selfemployed">Self-employed</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employmentStatus && <p className="text-sm text-red-500">{errors.employmentStatus}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentLength">
                  Employment Length <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.employmentLength}
                  onValueChange={(value) => handleInputChange("employmentLength", value)}
                >
                  <SelectTrigger className={errors.employmentLength ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-6months">0-6 months</SelectItem>
                    <SelectItem value="6-12months">6-12 months</SelectItem>
                    <SelectItem value="1-2years">1-2 years</SelectItem>
                    <SelectItem value="2-5years">2-5 years</SelectItem>
                    <SelectItem value="5+years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employmentLength && <p className="text-sm text-red-500">{errors.employmentLength}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employer">
                Employer <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="employer"
                  value={formData.employer}
                  onChange={(e) => handleInputChange("employer", e.target.value)}
                  className={`pl-10 ${errors.employer ? "border-red-500" : ""}`}
                  placeholder="Company Name"
                />
              </div>
              {errors.employer && <p className="text-sm text-red-500">{errors.employer}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">
                Job Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                className={errors.jobTitle ? "border-red-500" : ""}
                placeholder="Your Job Title"
              />
              {errors.jobTitle && <p className="text-sm text-red-500">{errors.jobTitle}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualIncome">
                  Annual Income <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="annualIncome"
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                    className={`pl-10 ${errors.annualIncome ? "border-red-500" : ""}`}
                    placeholder="80,000"
                  />
                </div>
                {errors.annualIncome && <p className="text-sm text-red-500">{errors.annualIncome}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherIncome">Other Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="otherIncome"
                    value={formData.otherIncome}
                    onChange={(e) => handleInputChange("otherIncome", e.target.value)}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="existingLoan">Existing Home Loan Balance</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="existingLoan"
                    value={formData.existingLoan}
                    onChange={(e) => handleInputChange("existingLoan", e.target.value)}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditCardDebt">Credit Card Debt</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="creditCardDebt"
                    value={formData.creditCardDebt}
                    onChange={(e) => handleInputChange("creditCardDebt", e.target.value)}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherDebts">Other Debts</Label>
              <Textarea
                id="otherDebts"
                value={formData.otherDebts}
                onChange={(e) => handleInputChange("otherDebts", e.target.value)}
                placeholder="Car loans, personal loans, etc."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyExpenses">
                Monthly Living Expenses <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="monthlyExpenses"
                  value={formData.monthlyExpenses}
                  onChange={(e) => handleInputChange("monthlyExpenses", e.target.value)}
                  className={`pl-10 ${errors.monthlyExpenses ? "border-red-500" : ""}`}
                  placeholder="4,000"
                />
              </div>
              {errors.monthlyExpenses && <p className="text-sm text-red-500">{errors.monthlyExpenses}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="assets">
                Assets <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="assets"
                value={formData.assets}
                onChange={(e) => handleInputChange("assets", e.target.value)}
                className={errors.assets ? "border-red-500" : ""}
                placeholder="Savings, investments, superannuation, other properties, etc."
                rows={4}
              />
              {errors.assets && <p className="text-sm text-red-500">{errors.assets}</p>}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">
                  Loan Amount <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="loanAmount"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    className={`pl-10 ${errors.loanAmount ? "border-red-500" : ""}`}
                    placeholder="520,000"
                  />
                </div>
                {errors.loanAmount && <p className="text-sm text-red-500">{errors.loanAmount}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">
                  Loan Term <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.loanTerm} onValueChange={(value) => handleInputChange("loanTerm", value)}>
                  <SelectTrigger className={errors.loanTerm ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.loanTerm && <p className="text-sm text-red-500">{errors.loanTerm}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanPurpose">
                Loan Purpose <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.loanPurpose} onValueChange={(value) => handleInputChange("loanPurpose", value)}>
                <SelectTrigger className={errors.loanPurpose ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Property Purchase</SelectItem>
                  <SelectItem value="refinance">Refinance</SelectItem>
                  <SelectItem value="investment">Investment Property</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="renovation">Renovation</SelectItem>
                </SelectContent>
              </Select>
              {errors.loanPurpose && <p className="text-sm text-red-500">{errors.loanPurpose}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="repaymentType">Repayment Type</Label>
                <Select
                  value={formData.repaymentType}
                  onValueChange={(value) => handleInputChange("repaymentType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principal-interest">Principal & Interest</SelectItem>
                    <SelectItem value="interest-only">Interest Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredRate">Preferred Rate Type</Label>
                <Select
                  value={formData.preferredRate}
                  onValueChange={(value) => handleInputChange("preferredRate", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="variable">Variable Rate</SelectItem>
                    <SelectItem value="fixed">Fixed Rate</SelectItem>
                    <SelectItem value="split">Split (Variable + Fixed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Authorization & Terms
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="creditCheck"
                    checked={formData.creditCheck}
                    onCheckedChange={(checked) => handleInputChange("creditCheck", checked as boolean)}
                    className={errors.creditCheck ? "border-red-500" : ""}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="creditCheck" className="text-sm font-medium cursor-pointer">
                      I authorize Home Online to check my credit and verify the information provided.
                    </Label>
                    <p className="text-xs text-gray-500">
                      This allows us to assess your application and provide accurate loan offers.
                    </p>
                  </div>
                </div>
                {errors.creditCheck && <p className="text-sm text-red-500 ml-6">{errors.creditCheck}</p>}

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                    className={errors.termsAccepted ? "border-red-500" : ""}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="termsAccepted" className="text-sm font-medium cursor-pointer">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                    <p className="text-xs text-gray-500">
                      By submitting this application, you agree to our{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
                {errors.termsAccepted && <p className="text-sm text-red-500 ml-6">{errors.termsAccepted}</p>}
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                After submitting your application, you'll create a secure account to track your progress and receive
                loan offers from our partner lenders.
              </AlertDescription>
            </Alert>
          </div>
        )

      default:
        return null
    }
  }

  const getLoanTypeTitle = () => {
    switch (loanType) {
      case "firstTime":
        return "First Home Buyer Application"
      case "new":
        return "New Home Purchase Application"
      case "refinance":
        return "Refinance Application"
      default:
        return "Home Loan Application"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{getLoanTypeTitle()}</h1>
            <p className="text-gray-600">Complete your application in 5 simple steps</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <Badge variant="outline">{Math.round((currentStep / totalSteps) * 100)}% Complete</Badge>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-8">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  </div>
                  <div className="text-xs font-medium">{step.title}</div>
                  <div className="text-xs text-gray-500 hidden md:block">{step.description}</div>
                </div>
              )
            })}
          </div>

          {/* Form Content */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5 mr-2 text-blue-600" })}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>

            <CardContent>{renderStepContent()}</CardContent>

            {/* Navigation */}
            <div className="flex justify-between p-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button onClick={handleNext} disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </div>
                ) : currentStep === totalSteps ? (
                  <>
                    Submit Application
                    <Target className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
