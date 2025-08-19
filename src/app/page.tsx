'use client'

import { useState } from 'react'
import Calculator from '@/components/Calculator'
import InfoSection from '@/components/InfoSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
            Kalkulator Warisan Faraid Indonesia
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Hitung pembagian harta warisan sesuai aturan syariat Islam yang berlaku di Indonesia
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Calculator />
          </div>
          <div className="lg:col-span-1">
            <InfoSection />
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-600">
          <p>© 2023 Kalkulator Warisan Faraid Indonesia. Dibuat untuk memudahkan perhitungan warisan menurut syariat Islam.</p>
        </footer>
      </div>
    </main>
  )
}
