"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const markers = [
  { id: 1, x: 410, y: 420, label: "Male'" },
  { id: 2, x: 410, y: 380, label: "Airport" },
  { id: 3, x: 320, y: 530, label: "Maafushi" },
  { id: 4, x: 600, y: 150, label: "Thulusdhoo" },
  { id: 5, x: 500, y: 350, label: "Himmafushi" },
  { id: 6, x: 400, y: 100, label: "Resorts" },
  { id: 7, x: 300, y: 400, label: "Thiafushi" },
  { id: 8, x: 550, y: 250, label: "Huraa" },
  { id: 9, x: 350, y: 500, label: "Gulhi" },
  { id: 10, x: 300, y: 570, label: "Guraidhoo" },
  { id: 11, x: 410, y: 350, label: "Hulhumale" },
  { id: 12, x: 200, y: 350, label: "Resorts" },
  { id: 13, x: 200, y: 200, label: "Resorts" },
]

export default function Hero() {
  const [connections, setConnections] = useState<[number, number][]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const start = Math.floor(Math.random() * markers.length)
      let end
      do {
        end = Math.floor(Math.random() * markers.length)
      } while (end === start)

      setConnections((prev) => [...prev.slice(-4), [start, end]])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-image">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white md:text-left md:w-1/2 md:pr-8"
        >
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Your Gateway to Island Adventures
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl mb-4"
          >
            <img
            className="grayscale hover:filter-none transition-all duration-300 transform hover:-translate-y-2"
            src="images/macros.png" />
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-xl md:text-2xl mb-8"
          >
            Fast, and Reliable Speedboat Transfers
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block md:w-1/2"
        >
          <svg width="auto" height="auto" viewBox="0 0 800 600">
            <defs>
              <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </linearGradient>
            </defs>
            <rect width="800" height="600" fill="url(#ocean)" />
            <image href="images/Maldives_location_map.svg" width="800" height="600" opacity="0.9" />

            {/* Animated connections */}
            {connections.map(([startIndex, endIndex], i) => (
              <AnimatedTransferRoute
                key={`${startIndex}-${endIndex}-${i}`}
                start={markers[startIndex]}
                end={markers[endIndex]}
              />
            ))}

            {/* Markers and labels */}
            <g className="markers-and-labels">
              {markers.map((marker) => (
                <MapMarker key={marker.id} {...marker} />
              ))}
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

function MapMarker({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <>
      <circle cx={x} cy={y} r="5" fill="#EF4444" />
      <text x={x} y={y + 20} fontFamily="Arial" fontSize="12" fill="white" textAnchor="middle">
        {label}
      </text>
    </>
  )
}

function AnimatedTransferRoute({ start, end }: { start: { x: number; y: number }; end: { x: number; y: number } }) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      pathRef.current.style.strokeDasharray = `${length} ${length}`
      pathRef.current.style.strokeDashoffset = `${length}`
      pathRef.current.getBoundingClientRect()
      pathRef.current.style.transition = "stroke-dashoffset 4s ease-in-out"
      pathRef.current.style.strokeDashoffset = "0"
    }
  }, [])

  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2
  const curveFactor = 30 + Math.random() * 60 // Random curve between 30 and 90
  const controlX = midX - curveFactor + Math.random() * curveFactor * 2
  const controlY = midY - curveFactor + Math.random() * curveFactor * 2

  return (
    <>
      <path
        ref={pathRef}
        d={`M${start.x},${start.y} Q${controlX},${controlY} ${end.x},${end.y}`}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
      />
      <circle cx={start.x} cy={start.y} r="3" fill="#FCD34D" />
      <circle cx={end.x} cy={end.y} r="3" fill="#FCD34D" />
    </>
  )
}