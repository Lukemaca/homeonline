"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Users, DollarSign, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AustralianStats() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Australian Homeowners Choose Home Online
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of Australians who have saved money by making banks compete for their business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image
              src="/images/australian-banks-competing.png"
              alt="Australian banks competing for home loans"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-blue-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">0.75%</div>
                  <div className="text-sm text-gray-600">Average Rate Reduction</div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">50,000+</div>
                  <div className="text-sm text-gray-600">Satisfied Customers</div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">$8,500</div>
                  <div className="text-sm text-gray-600">Average Savings</div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardContent className="p-6 text-center">
                  <Home className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">30+</div>
                  <div className="text-sm text-gray-600">Partner Banks</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">The Australian Home Loan Market</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Over $2 trillion in outstanding home loans across Australia
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Average Australian pays $150,000+ in interest over loan lifetime
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Most borrowers never switch lenders, missing potential savings
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Banks offer better rates to new customers than existing ones
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg" asChild>
            <Link href="/loan-selection">
              Make Banks Compete Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
