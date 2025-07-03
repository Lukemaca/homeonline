"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, DollarSign, Clock, Shield, TrendingDown, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Benefits() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Save Thousands",
      description: "Average savings of $8,500 over the life of your loan",
      stat: "$8,500",
      color: "text-green-600",
    },
    {
      icon: TrendingDown,
      title: "Lower Rates",
      description: "Get rates 0.5-1% lower than standard bank rates",
      stat: "0.75%",
      color: "text-blue-600",
    },
    {
      icon: Clock,
      title: "Fast Approval",
      description: "Pre-approval in minutes, settlement in weeks",
      stat: "5 min",
      color: "text-purple-600",
    },
    {
      icon: Shield,
      title: "No Risk",
      description: "Free service with no obligation to proceed",
      stat: "100%",
      color: "text-orange-600",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">The Benefits of Making Banks Compete</h2>
            <p className="text-xl text-gray-600 mb-8">
              When banks compete for your business, you win. Get better rates, terms, and service than you'd ever get
              walking into a single bank.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <Card key={index} className="border-2 border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <IconComponent className={`h-6 w-6 ${benefit.color} mr-3`} />
                        <span className={`text-2xl font-bold ${benefit.color}`}>{benefit.stat}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span>No upfront costs or hidden fees</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span>Expert guidance throughout the process</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span>Access to exclusive bank offers</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span>Ongoing support until settlement</span>
              </div>
            </div>

            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg" asChild>
              <Link href="/loan-selection">
                Apply for Your Loan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <Image
              src="/images/family-celebrating-savings.png"
              alt="Family celebrating home loan savings"
              width={600}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-green-500 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">$8,500</div>
              <div className="text-sm">Average Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
