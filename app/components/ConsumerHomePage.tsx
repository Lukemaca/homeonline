"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Clock, Users, TrendingDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "./Header"
import Features from "./Features"
import Process from "./Process"
import Benefits from "./Benefits"
import FAQ from "./FAQ"
import Testimonials from "./Testimonials"
import AustralianStats from "./AustralianStats"
import SavingsCalculator from "./SavingsCalculator"
import Footer from "./Footer"

export default function ConsumerHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-6xl font-bold text-blue-600">%</div>
          <div className="absolute top-40 right-20 text-4xl font-bold text-green-600">%</div>
          <div className="absolute bottom-32 left-1/4 text-5xl font-bold text-blue-600">%</div>
          <div className="absolute bottom-20 right-1/3 text-3xl font-bold text-green-600">%</div>
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  Save 0.5-1% on your home loan rate
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Banks compete.
                  <br />
                  <span className="text-blue-600">You save.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Get Australian banks to compete for your home loan. Compare rates, save thousands in interest, and get
                  better loan terms with Home Online.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  <Link href="/loan-calculator">Calculate Savings</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  100% Secure
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />5 Min Application
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  50,000+ Australians
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Floating Percentage Badges - Updated with realistic rates */}
              <div className="absolute -top-4 -left-4 bg-green-500 text-white px-3 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                -0.75%
              </div>
              <div className="absolute top-1/4 -right-6 bg-blue-500 text-white px-3 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                6.2%
              </div>
              <div className="absolute bottom-1/4 -left-6 bg-purple-500 text-white px-3 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce delay-300">
                5.45%
              </div>

              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border">
                <Image
                  src="/images/percentage-savings-hero.png"
                  alt="Financial calculator showing percentage savings on home loans"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">$8,500</div>
              <div className="text-sm text-gray-600">Average Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">50,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">30+</div>
              <div className="text-sm text-gray-600">Partner Banks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">5 min</div>
              <div className="text-sm text-gray-600">Application Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <SavingsCalculator />

      {/* Australian Stats */}
      <AustralianStats />

      {/* Features */}
      <Features />

      {/* How It Works */}
      <Process />

      {/* Benefits */}
      <Benefits />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  )
}
