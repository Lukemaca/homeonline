"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Clock, Users, TrendingDown, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function Features() {
  const features = [
    {
      icon: TrendingDown,
      title: "Lower Interest Rates",
      description: "Banks compete to offer you their best rates, typically 0.5-1% lower than standard rates.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Shield,
      title: "100% Secure Process",
      description: "Bank-level security with 256-bit encryption. Your personal information is always protected.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      title: "5-Minute Application",
      description: "Quick and easy online application. Get pre-approved in minutes, not days.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated loan specialists guide you through every step of the process.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: CheckCircle,
      title: "No Hidden Fees",
      description: "Transparent pricing with no surprise costs. What you see is what you get.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      icon: Star,
      title: "5-Star Service",
      description: "Rated 4.8/5 by customers. Exceptional service from application to settlement.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Home Online?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make it easy for banks to compete for your business, ensuring you get the best possible deal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg" asChild>
            <Link href="/loan-selection">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
