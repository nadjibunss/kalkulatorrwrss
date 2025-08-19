'use client'

import { useState } from 'react'

interface Heir {
  name: string
  share: number
  percentage: number
  amount: number
}

export default function Calculator() {
  const [totalWealth, setTotalWealth] = useState<number>(0)
  const [heirs, setHeirs] = useState<Heir[]>([])
  const [remainingWealth, setRemainingWealth] = useState<number>(0)
  const [showResult, setShowResult] = useState<boolean>(false)

  // State untuk ahli waris
  const [hasHusband, setHasHusband] = useState<boolean>(false)
  const [wifeCount, setWifeCount] = useState<number>(0)
  const [hasFather, setHasFather] = useState<boolean>(false)
  const [hasMother, setHasMother] = useState<boolean>(false)
  const [maleChildren, setMaleChildren] = useState<number>(0)
  const [femaleChildren, setFemaleChildren] = useState<number>(0)
  const [maleGrandchildren, setMaleGrandchildren] = useState<number>(0)
  const [femaleGrandchildren, setFemaleGrandchildren] = useState<number>(0)
  const [maleSiblings, setMaleSiblings] = useState<number>(0)
  const [femaleSiblings, setFemaleSiblings] = useState<number>(0)

  const calculateInheritance = () => {
    if (totalWealth <= 0) {
      alert('Masukkan total harta yang valid')
      return
    }

    let calculatedHeirs: Heir[] = []
    let remaining = totalWealth

    // Suami
    if (hasHusband) {
      let share = 0
      if (maleChildren > 0 || femaleChildren > 0 || maleGrandchildren > 0 || femaleGrandchildren > 0) {
        share = totalWealth * 0.25 // 1/4
      } else {
        share = totalWealth * 0.5 // 1/2
      }
      calculatedHeirs.push({
        name: 'Suami',
        share: share,
        percentage: (share / totalWealth) * 100,
        amount: share
      })
      remaining -= share
    }

    // Istri
    if (wifeCount > 0) {
      let share = 0
      if (maleChildren > 0 || femaleChildren > 0 || maleGrandchildren > 0 || femaleGrandchildren > 0) {
        share = totalWealth * 0.125 // 1/8
      } else {
        share = totalWealth * 0.25 // 1/4
      }
      share *= wifeCount
      calculatedHeirs.push({
        name: `Istri (${wifeCount})`,
        share: share,
        percentage: (share / totalWealth) * 100,
        amount: share
      })
      remaining -= share
    }

    // Ayah
    if (hasFather) {
      let share = 0
      if (maleChildren > 0 || femaleChildren > 0 || maleGrandchildren > 0 || femaleGrandchildren > 0) {
        share = totalWealth * (1/6)
      } else {
        share = totalWealth * 0.25 // 1/4
      }
      calculatedHeirs.push({
        name: 'Ayah',
        share: share,
        percentage: (share / totalWealth) * 100,
        amount: share
      })
      remaining -= share
    }

    // Ibu
    if (hasMother) {
      let share = 0
      if (maleChildren > 0 || femaleChildren > 0 || maleGrandchildren > 0 || femaleGrandchildren > 0) {
        if (maleSiblings > 0 || femaleSiblings > 0) {
          share = totalWealth * (1/6)
        } else {
          share = totalWealth * (1/3)
        }
      } else {
        if (maleSiblings > 0 || femaleSiblings > 0) {
          share = totalWealth * (1/6)
        } else {
          share = totalWealth * (1/3)
        }
      }
      calculatedHeirs.push({
        name: 'Ibu',
        share: share,
        percentage: (share / totalWealth) * 100,
        amount: share
      })
      remaining -= share
    }

    // Anak
    if (maleChildren > 0 || femaleChildren > 0) {
      if (maleChildren > 0 && femaleChildren > 0) {
        // Jika ada anak laki-laki dan perempuan
        const totalParts = (maleChildren * 2) + femaleChildren
        const maleShare = totalWealth * (2/3) * (maleChildren * 2) / totalParts
        const femaleShare = totalWealth * (2/3) * femaleChildren / totalParts
        
        if (maleChildren > 0) {
          calculatedHeirs.push({
            name: `Anak Laki-laki (${maleChildren})`,
            share: maleShare,
            percentage: (maleShare / totalWealth) * 100,
            amount: maleShare
          })
          remaining -= maleShare
        }
        
        if (femaleChildren > 0) {
          calculatedHeirs.push({
            name: `Anak Perempuan (${femaleChildren})`,
            share: femaleShare,
            percentage: (femaleShare / totalWealth) * 100,
            amount: femaleShare
          })
          remaining -= femaleShare
        }
      } else if (maleChildren > 0) {
        // Hanya anak laki-laki
        const share = totalWealth
        calculatedHeirs.push({
          name: `Anak Laki-laki (${maleChildren})`,
          share: share,
          percentage: (share / totalWealth) * 100,
          amount: share
        })
        remaining -= share
      } else {
        // Hanya anak perempuan
        const share = totalWealth
        calculatedHeirs.push({
          name: `Anak Perempuan (${femaleChildren})`,
          share: share,
          percentage: (share / totalWealth) * 100,
          amount: share
        })
        remaining -= share
      }
    }

    // Cucu (jika tidak ada anak)
    if (maleGrandchildren > 0 || femaleGrandchildren > 0) {
      if (maleChildren === 0 && femaleChildren === 0) {
        // Jika tidak ada anak, cucu menggantikan posisi anak
        if (maleGrandchildren > 0 && femaleGrandchildren > 0) {
          const totalParts = (maleGrandchildren * 2) + femaleGrandchildren
          const maleShare = totalWealth * (2/3) * (maleGrandchildren * 2) / totalParts
          const femaleShare = totalWealth * (2/3) * femaleGrandchildren / totalParts
          
          if (maleGrandchildren > 0) {
            calculatedHeirs.push({
              name: `Cucu Laki-laki (${maleGrandchildren})`,
              share: maleShare,
              percentage: (maleShare / totalWealth) * 100,
              amount: maleShare
            })
            remaining -= maleShare
          }
          
          if (femaleGrandchildren > 0) {
            calculatedHeirs.push({
              name: `Cucu Perempuan (${femaleGrandchildren})`,
              share: femaleShare,
              percentage: (femaleShare / totalWealth) * 100,
              amount: femaleShare
            })
            remaining -= femaleShare
          }
        } else if (maleGrandchildren > 0) {
          const share = totalWealth
          calculatedHeirs.push({
            name: `Cucu Laki-laki (${maleGrandchildren})`,
            share: share,
            percentage: (share / totalWealth) * 100,
            amount: share
          })
          remaining -= share
        } else {
          const share = totalWealth
          calculatedHeirs.push({
            name: `Cucu Perempuan (${femaleGrandchildren})`,
            share: share,
            percentage: (share / totalWealth) * 100,
            amount: share
          })
          remaining -= share
        }
      }
    }

    // Saudara kandung (jika tidak ada anak/cucu)
    if (maleSiblings > 0 || femaleSiblings > 0) {
      if (maleChildren === 0 && femaleChildren === 0 && maleGrandchildren === 0 && femaleGrandchildren === 0) {
        if (maleSiblings > 0 && femaleSiblings > 0) {
          const totalParts = (maleSiblings * 2) + femaleSiblings
          const maleShare = totalWealth * (maleSiblings * 2) / totalParts
          const femaleShare = totalWealth * femaleSiblings / totalParts
          
          if (maleSiblings > 0) {
            calculatedHeirs.push({
              name: `Saudara Laki-laki (${maleSiblings})`,
              share: maleShare,
              percentage: (maleShare / totalWealth) * 100,
              amount: maleShare
            })
            remaining -= maleShare
          }
          
          if (femaleSiblings > 0) {
            calculatedHeirs.push({
              name: `Saudara Perempuan (${femaleSiblings})`,
              share: femaleShare,
              percentage: (femaleShare / totalWealth) * 100,
              amount: femaleShare
            })
            remaining -= femaleShare
          }
        } else if (maleSiblings > 0) {
          const share = totalWealth
          calculatedHeirs.push({
            name: `Saudara Laki-laki (${maleSiblings})`,
            share: share,
            percentage: (share / totalWealth) * 100,
            amount: share
          })
          remaining -= share
        } else {
          const share = totalWealth
          calculatedHeirs.push({
            name: `Saudara Perempuan (${femaleSiblings})`,
            share: share,
            percentage: (share / totalWealth) * 100,
            amount: share
          })
          remaining -= share
        }
      }
    }

    setHeirs(calculatedHeirs)
    setRemainingWealth(remaining)
    setShowResult(true)
  }

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const resetForm = () => {
    setTotalWealth(0)
    setHeirs([])
    setRemainingWealth(0)
    setShowResult(false)
    setHasHusband(false)
    setWifeCount(0)
    setHasFather(false)
    setHasMother(false)
    setMaleChildren(0)
    setFemaleChildren(0)
    setMaleGrandchildren(0)
    setFemaleGrandchildren(0)
    setMaleSiblings(0)
    setFemaleSiblings(0)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">Kalkulator Warisan</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Harta (Setelah Hutang & Wasiat)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              Rp
            </span>
            <input
              type="number"
              value={totalWealth || ''}
              onChange={(e) => setTotalWealth(Number(e.target.value))}
              className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Masukkan total harta"
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Ahli Waris</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasHusband}
                  onChange={(e) => setHasHusband(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Apakah ada Suami?</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Istri
              </label>
              <input
                type="number"
                min="0"
                max="4"
                value={wifeCount}
                onChange={(e) => setWifeCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasFather}
                  onChange={(e) => setHasFather(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Apakah ada Ayah?</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasMother}
                  onChange={(e) => setHasMother(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Apakah ada Ibu?</span>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anak
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Laki-laki</label>
                <input
                  type="number"
                  min="0"
                  value={maleChildren}
                  onChange={(e) => setMaleChildren(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Perempuan</label>
                <input
                  type="number"
                  min="0"
                  value={femaleChildren}
                  onChange={(e) => setFemaleChildren(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cucu (jika tidak ada anak)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Laki-laki</label>
                <input
                  type="number"
                  min="0"
                  value={maleGrandchildren}
                  onChange={(e) => setMaleGrandchildren(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Perempuan</label>
                <input
                  type="number"
                  min="0"
                  value={femaleGrandchildren}
                  onChange={(e) => setFemaleGrandchildren(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Saudara Kandung (jika tidak ada anak/cucu)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Laki-laki</label>
                <input
                  type="number"
                  min="0"
                  value={maleSiblings}
                  onChange={(e) => setMaleSiblings(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Perempuan</label>
                <input
                  type="number"
                  min="0"
                  value={femaleSiblings}
                  onChange={(e) => setFemaleSiblings(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={calculateInheritance}
            className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition duration-200 font-medium"
          >
            Hitung Warisan
          </button>
          <button
            onClick={resetForm}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200 font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {showResult && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Hasil Perhitungan</h3>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Total Harta:</span>
              <span className="font-bold text-gray-900">{formatMoney(totalWealth)}</span>
            </div>
            
            {heirs.map((heir, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-700">{heir.name}</span>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{formatMoney(heir.amount)}</div>
                  <div className="text-sm text-gray-500">{heir.percentage.toFixed(2)}%</div>
                </div>
              </div>
            ))}
            
            {remainingWealth > 0 && (
              <div className="flex justify-between items-center py-2 font-medium text-primary-700">
                <span>Sisa Harta:</span>
                <span>{formatMoney(remainingWealth)}</span>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Catatan Penting:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Sisa harta ({formatMoney(remainingWealth)}) dapat dibagikan sesuai kesepakatan ahli waris</li>
              <li>• Pastikan semua ahli waris menyetujui pembagian sisa harta</li>
              <li>• Konsultasikan dengan ahli waris (pendeta/pengurus masjid) untuk konfirmasi</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
