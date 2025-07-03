"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DocumentUploader } from "@/components/DocumentUploader"
import { ArrowLeft, CheckCircle, Camera, Upload, AlertTriangle } from "lucide-react"

interface Document {
  id: string
  name: string
  description: string
  required: boolean
  category: string
  uploadedFiles: any[]
}

export default function DocumentUploadPage() {
  const params = useParams()
  const router = useRouter()
  const documentId = params.documentId as string

  const [document, setDocument] = useState<Document | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  useEffect(() => {
    // Mock document data - in real app, fetch from API
    const mockDocuments: Record<string, Document> = {
      "bank-statements": {
        id: "bank-statements",
        name: "Bank Statements",
        description: "Last 3 months of bank statements for all accounts",
        required: true,
        category: "financial",
        uploadedFiles: [],
      },
      "pay-slips": {
        id: "pay-slips",
        name: "Recent Pay Slips",
        description: "Last 2 pay slips from your employer",
        required: true,
        category: "income",
        uploadedFiles: [],
      },
      "property-valuation": {
        id: "property-valuation",
        name: "Property Valuation",
        description: "Professional property valuation report",
        required: false,
        category: "property",
        uploadedFiles: [],
      },
    }

    const doc = mockDocuments[documentId]
    if (doc) {
      setDocument(doc)
    }
  }, [documentId])

  const handleFileUpload = (docId: string, file: File) => {
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setDocument((prev) =>
        prev
          ? {
              ...prev,
              uploadedFiles: [
                ...prev.uploadedFiles,
                {
                  id: Date.now().toString(),
                  name: file.name,
                  size: file.size,
                  uploadDate: new Date().toISOString(),
                  type: file.type.startsWith("image/") ? "photo" : "file",
                },
              ],
            }
          : null,
      )

      setIsUploading(false)
      setUploadSuccess(true)

      // Auto-redirect after success
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 1500)
  }

  const handleFileRemove = (docId: string, fileId: string) => {
    setDocument((prev) =>
      prev
        ? {
            ...prev,
            uploadedFiles: prev.uploadedFiles.filter((f) => f.id !== fileId),
          }
        : null,
    )
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  if (!document) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
          <Button onClick={handleBackToDashboard}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  if (uploadSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-700 mb-2">Upload Successful!</h1>
            <p className="text-gray-600 mb-6">Your {document.name.toLowerCase()} has been uploaded successfully.</p>
            <p className="text-sm text-gray-500 mb-6">Redirecting you back to your dashboard...</p>
            <Button onClick={handleBackToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBackToDashboard} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold mb-2">Upload {document.name}</h1>
        <p className="text-gray-600">{document.description}</p>
      </div>

      {/* Document Status */}
      <Alert className={`mb-6 ${document.required ? "border-red-200 bg-red-50" : "border-blue-200 bg-blue-50"}`}>
        <AlertTriangle className={`h-4 w-4 ${document.required ? "text-red-600" : "text-blue-600"}`} />
        <AlertDescription className={document.required ? "text-red-800" : "text-blue-800"}>
          <strong>{document.required ? "Required Document" : "Optional Document"}</strong>
          {document.required
            ? " - This document is required to process your loan application."
            : " - This document is optional but may help improve your loan terms."}
        </AlertDescription>
      </Alert>

      {/* Photo Quality Guidelines */}
      <Alert className="mb-6 border-amber-200 bg-amber-50">
        <Camera className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Photo Quality Guidelines:</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Ensure good lighting - avoid shadows and glare</li>
            <li>• Hold your device steady to avoid blur</li>
            <li>• Capture the entire document within the frame</li>
            <li>• Make sure all text is clear and readable</li>
            <li>• Take photos straight-on, not at an angle</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Upload {document.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DocumentUploader document={document} onFileUpload={handleFileUpload} onFileRemove={handleFileRemove} />

          {/* Additional Instructions */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Accepted File Types:</h3>
            <p className="text-sm text-gray-600 mb-3">PDF documents, JPG/PNG images (maximum 10MB per file)</p>

            <h3 className="font-semibold mb-2">Upload Options:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-start">
                <Upload className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                <div>
                  <strong>Choose File:</strong> Select documents from your device storage
                </div>
              </div>
              <div className="flex items-start">
                <Camera className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <div>
                  <strong>Take Photo:</strong> Use your device camera to capture documents
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={handleBackToDashboard}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {document.uploadedFiles.length > 0 && <Button onClick={handleBackToDashboard}>Continue to Dashboard</Button>}
      </div>
    </div>
  )
}
