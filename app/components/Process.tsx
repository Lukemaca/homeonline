"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileText, Search, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Process() {
  const steps = [
    {
      icon: FileText,
      title: "Apply Online",
      description: "Complete our simple 5-minute application with your basic details and loan requirements.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Search,
      title: "Banks Compete",
      description: "We present your application to multiple banks who compete to offer you their best rates.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "Compare Offers",
      description: "Review and compare loan offers from different banks with our expert guidance.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: CheckCircle,
      title: "Choose & Settle",
      description: "Select your preferred offer and we'll handle the paperwork to get you settled quickly.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process makes it easy to get banks competing for your home loan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <Card key={index} className="border-2 border-white hover:border-blue-200 transition-colors relative">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg" asChild>
            <Link href="/loan-selection">
              Start Your Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
