"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import ConsumerHomePage from "./components/ConsumerHomePage"
import BrokerHomePage from "./components/BrokerHomePage"

function HomePageContent() {
  const searchParams = useSearchParams()
  const isBrokerView = searchParams.get("view") === "broker"

  return isBrokerView ? <BrokerHomePage /> : <ConsumerHomePage />
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  )
}
