"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for our flowers
interface Flower {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  rotation: number;
  type: number;
  color: string;
}

// Define types for particles
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [butterflies, setButterflies] = useState<{id: number, x: number, y: number, delay: number}[]>([]);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showThirdMessage, setShowThirdMessage] = useState(false);
  
  // Initialize flowers, particles, and animations only on the client side
  useEffect(() => {
    // Create flowers with deterministic values
    const generatedFlowers: Flower[] = [];
    for (let i = 0; i < 40; i++) {
      generatedFlowers.push({
        id: i,
        x: 5 + (i % 10) * 9, // Distribute across width
        y: 50 + Math.floor(i / 10) * 10, // Distribute across bottom half
        size: 0.6 + (i % 3) * 0.2, // Vary sizes
        delay: 1 + (i % 15) * 0.2, // Stagger animation
        rotation: -15 + (i % 7) * 5, // Randomize rotation
        type: i % 6, // 6 different flower types
        color: flowerColors[i % flowerColors.length],
      });
    }
    
    // Create decorative particles
    const generatedParticles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      generatedParticles.push({
        id: i,
        x: 5 + (i % 20) * 5,
        y: 5 + Math.floor(i / 20) * 25, 
        size: 3 + (i % 5) * 2,
        duration: 15 + (i % 10) * 2,
        delay: (i % 5) * 0.5,
      });
    }
    
    // Create butterflies
    const generatedButterflies = [];
    for (let i = 0; i < 7; i++) {
      generatedButterflies.push({
        id: i,
        x: 10 + (i % 7) * 12,
        y: 30 + (i % 5) * 10,
        delay: i * 0.8,
      });
    }
    
    setFlowers(generatedFlowers);
    setParticles(generatedParticles);
    setButterflies(generatedButterflies);
    setIsLoaded(true);
    
    // Show second message after 4 seconds
    const timer1 = setTimeout(() => {
      setShowSecondMessage(true);
    }, 4000);
    
    // Show third message after 8 seconds
    const timer2 = setTimeout(() => {
      setShowThirdMessage(true);
    }, 8000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-sky-100 to-indigo-100 flex items-center justify-center">
        <h1 className="text-center text-3xl font-bold text-pink-500">Loading beauty for Aca...</h1>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-indigo-50 via-pink-50 to-purple-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('/petal-bg.png')] opacity-10 bg-repeat"></div>
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-white opacity-40"
          style={{ width: particle.size, height: particle.size }}
          initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
          animate={{
            x: [`${particle.x}%`, `${particle.x + 5}%`, `${particle.x - 3}%`, `${particle.x}%`],
            y: [`${particle.y}%`, `${particle.y - 10}%`, `${particle.y - 5}%`, `${particle.y}%`],
            opacity: [0, 0.7, 0.5, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Heart particles floating up */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pink-500 text-2xl"
          initial={{ 
            x: `${10 + (i % 5) * 20}%`, 
            y: "110%", 
            opacity: 0, 
            scale: 0.5,
            rotate: -20 + (i % 9) * 5
          }}
          animate={{ 
            y: "-10%", 
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.8],
            rotate: ['-20deg', '10deg', '-15deg']
          }}
          transition={{ 
            duration: 15 + (i % 5) * 2, 
            delay: 2 + i * 3, 
            repeat: Infinity,
            ease: "easeOut" 
          }}
        >
          ❤️
        </motion.div>
      ))}
      
      {/* Butterflies */}
      {butterflies.map((butterfly) => (
        <motion.div
          key={`butterfly-${butterfly.id}`}
          className="absolute text-2xl"
          initial={{ x: `${butterfly.x}%`, y: "110%", opacity: 0 }}
          animate={{
            x: [
              `${butterfly.x}%`, 
              `${butterfly.x + 5}%`, 
              `${butterfly.x - 7}%`,
              `${butterfly.x + 10}%`,
              `${butterfly.x - 5}%`,
              `${butterfly.x}%`
            ],
            y: [
              "110%", 
              `${butterfly.y + 30}%`, 
              `${butterfly.y + 20}%`,
              `${butterfly.y + 10}%`,
              `${butterfly.y}%`,
              "-10%"
            ],
            opacity: [0, 1, 1, 1, 0.8, 0],
            rotate: [0, -10, 15, -5, 10, 0],
          }}
          transition={{
            duration: 30,
            delay: butterfly.delay + 2,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            ease: "easeInOut"
          }}
        >
          🦋
        </motion.div>
      ))}
      
      {/* Main messages */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-pink-600 drop-shadow-lg"
            animate={{ 
              textShadow: [
                "0 0 5px rgba(219, 39, 119, 0.5), 0 0 10px rgba(219, 39, 119, 0.3)", 
                "0 0 15px rgba(219, 39, 119, 0.8), 0 0 20px rgba(219, 39, 119, 0.5)",
                "0 0 5px rgba(219, 39, 119, 0.5), 0 0 10px rgba(219, 39, 119, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span 
              className="inline-block"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>{" "}
            semangat aca cantikkkk, kamu keren bangettt!! ❤️{" "}
            <motion.span 
              className="inline-block"
              animate={{ rotate: [0, -10, 0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ✨
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="h-1 w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              width: ["30%", "60%", "30%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <AnimatePresence>
            {showSecondMessage && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="mt-6 text-xl text-purple-700 font-medium px-4"
              >
                Walaupun kamu cape, tapi kamu tetep ngerjain tugas tugas kamuu, keren bangett aaaaaaaa 💜
              </motion.p>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {showThirdMessage && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="mt-4 text-xl text-pink-600 font-medium px-4"
              >
                aku sayang banget sama aca, aca selalu inget aku yaaa!! 🌟
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Realistic flowers */}
      {flowers.map((flower) => (
        <motion.div
          key={`flower-${flower.id}`}
          className="absolute origin-bottom"
          style={{ 
            left: `${flower.x}%`, 
            bottom: `${flower.y / 5}%`, 
            zIndex: Math.floor(flower.y / 10)
          }}
          initial={{ scale: 0, y: 50 }}
          animate={{ 
            scale: flower.size, 
            y: 0, 
            rotate: flower.rotation
          }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 10,
            delay: flower.delay,
          }}
        >
          {renderRealisticFlower(flower)}
        </motion.div>
      ))}
      
      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-800/30 to-transparent z-10" />
    </div>
  );
}

// Flower color options
const flowerColors = [
  "text-pink-400 from-pink-300 to-pink-500",
  "text-rose-400 from-rose-300 to-rose-500",
  "text-purple-400 from-purple-300 to-purple-500",
  "text-violet-400 from-violet-300 to-violet-500",
  "text-blue-400 from-blue-300 to-blue-500",
  "text-red-400 from-red-300 to-red-500",
  "text-orange-400 from-orange-300 to-orange-500",
  "text-fuchsia-400 from-fuchsia-300 to-fuchsia-500",
];

// Render more realistic flowers using SVG
function renderRealisticFlower(flower: Flower) {
  const flowerColors = flower.color.split(" ");
  const gradientFrom = flowerColors[1];
  const gradientTo = flowerColors[2];
  
  switch (flower.type) {
    case 0: // Rose-like flower
      return (
        <div className="relative">
          <motion.div
            className={`w-16 h-16 relative`}
            initial="hidden"
            animate="visible"
          >
            {/* Petals as layered divs */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className={`absolute w-8 h-8 rounded-full ${gradientFrom} ${gradientTo} bg-gradient-to-br`}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(${i % 2 ? 5 : 3}px)`,
                  filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))",
                  opacity: 0.9 - (i * 0.1),
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 - (i * 0.1) }}
                transition={{
                  delay: flower.delay + 0.05 * i,
                  duration: 0.6,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Center of flower */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-5 h-5 bg-yellow-300 rounded-full"
              style={{ 
                transform: "translate(-50%, -50%)",
                filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))"
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: flower.delay + 0.5, duration: 0.3 }}
            />
          </motion.div>
          
          {/* Stem */}
          <motion.div
            className="absolute left-1/2 top-full w-1.5 h-20 bg-green-600"
            style={{ 
              transformOrigin: "top",
              transform: "translateX(-50%)",
              filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))"
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ 
              delay: flower.delay - 0.2, 
              duration: 0.5, 
              ease: "easeOut" 
            }}
          />
          
          {/* Leaves */}
          <motion.div
            className="absolute left-1/2 top-[110%] w-6 h-3 bg-green-500 rounded-full origin-left"
            style={{ transform: "translateX(-100%) rotate(-20deg)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: flower.delay, duration: 0.5 }}
          />
          
          <motion.div
            className="absolute left-1/2 top-[130%] w-5 h-2.5 bg-green-500 rounded-full origin-left"
            style={{ transform: "translateX(0%) rotate(20deg)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: flower.delay + 0.2, duration: 0.5 }}
          />
        </div>
      );
      
    case 1: // Tulip-like flower
      return (
        <div className="relative">
          <motion.div
            className="w-14 h-20 relative"
            initial="hidden"
            animate="visible"
          >
            {/* Petals */}
            <motion.div
              className={`absolute w-10 h-14 ${gradientFrom} ${gradientTo} bg-gradient-to-b rounded-t-full`}
              style={{ 
                left: "50%", 
                transform: "translateX(-50%)",
                filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))"
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: flower.delay, duration: 0.7 }}
            />
            
            <motion.div
              className={`absolute w-10 h-14 ${gradientFrom} ${gradientTo} bg-gradient-to-b rounded-t-full`}
              style={{ 
                left: "50%", 
                transform: "translateX(-50%) rotate(-15deg)",
                opacity: 0.9,
                filter: "drop-shadow(0 0 3px rgba(255,255,255,0.4))"
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.9 }}
              transition={{ delay: flower.delay + 0.1, duration: 0.7 }}
            />
            
            <motion.div
              className={`absolute w-10 h-14 ${gradientFrom} ${gradientTo} bg-gradient-to-b rounded-t-full`}
              style={{ 
                left: "50%", 
                transform: "translateX(-50%) rotate(15deg)",
                opacity: 0.9,
                filter: "drop-shadow(0 0 3px rgba(255,255,255,0.4))"
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.9 }}
              transition={{ delay: flower.delay + 0.2, duration: 0.7 }}
            />
          </motion.div>
          
          {/* Stem */}
          <motion.div
            className="absolute left-1/2 top-full w-1.5 h-24 bg-green-600"
            style={{ 
              transformOrigin: "top",
              transform: "translateX(-50%)"
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ 
              delay: flower.delay - 0.2, 
              duration: 0.5, 
              ease: "easeOut" 
            }}
          />
          
          {/* Leaf */}
          <motion.div
            className="absolute left-1/2 top-[120%] w-8 h-4 bg-green-500 rounded-full origin-left"
            style={{ transform: "translateX(-100%) rotate(-15deg)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: flower.delay, duration: 0.5 }}
          />
        </div>
      );
      
    case 2: // Daisy-like flower
      return (
        <div className="relative">
          <motion.div
            className="w-16 h-16 relative"
            initial="hidden"
            animate="visible"
          >
            {/* Petals */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute w-4 h-7 bg-white rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center bottom",
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-10px)`,
                  filter: "drop-shadow(0 0 3px rgba(255,255,255,0.7))"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: flower.delay + (i * 0.05),
                  duration: 0.4,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Center of flower */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-8 h-8 bg-yellow-300 rounded-full"
              style={{ 
                transform: "translate(-50%, -50%)",
                filter: "drop-shadow(0 0 2px rgba(255,215,0,0.7))"
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: flower.delay + 0.6, duration: 0.3 }}
            />
          </motion.div>
          
          {/* Stem */}
          <motion.div
            className="absolute left-1/2 top-full w-1.5 h-20 bg-green-500"
            style={{ 
              transformOrigin: "top",
              transform: "translateX(-50%)"
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ 
              delay: flower.delay - 0.3, 
              duration: 0.6, 
              ease: "easeOut" 
            }}
          />
          
          {/* Leaves */}
          <motion.div
            className="absolute left-1/2 top-[130%] w-7 h-3 bg-green-500 rounded-full origin-left"
            style={{ transform: "translateX(-100%) rotate(-20deg)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: flower.delay, duration: 0.5 }}
          />
        </div>
      );
      
    case 3: // Sunflower-like flower
      return (
        <div className="relative">
          <motion.div
            className="w-20 h-20 relative"
            initial="hidden"
            animate="visible"
          >
            {/* Outer petals */}
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute w-4 h-9 bg-yellow-400 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center bottom",
                  transform: `translate(-50%, -50%) rotate(${i * 20}deg) translateY(-15px)`,
                  filter: "drop-shadow(0 0 2px rgba(255,235,0,0.5))"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: flower.delay + (i * 0.03),
                  duration: 0.4,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Center of flower */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-10 h-10 bg-yellow-700 rounded-full"
              style={{ 
                transform: "translate(-50%, -50%)",
                filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))"
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: flower.delay + 0.6, duration: 0.4 }}
            />
          </motion.div>
          
          {/* Stem */}
          <motion.div
            className="absolute left-1/2 top-full w-2 h-28 bg-green-600"
            style={{ 
              transformOrigin: "top",
              transform: "translateX(-50%)"
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ 
              delay: flower.delay - 0.3, 
              duration: 0.7, 
              ease: "easeOut" 
            }}
          />
          
          {/* Leaves */}
          <motion.div
            className="absolute left-1/2 top-[120%] w-9 h-4 bg-green-600 rounded-full origin-left"
            style={{ transform: "translateX(-100%) rotate(-25deg)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: flower.delay, duration: 0.5 }}
          />
          
          <motion.div
            className="absolute left-1/2 top-[150%] w-8 h-3.5 bg-green-600 rounded-full origin-right"
            style={{ transform: "translateX(0%) rotate(25deg)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: flower.delay + 0.2, duration: 0.5 }}
          />
        </div>
      );
      
    case 4: // Cherry blossom-like flower
      return (
        <div className="relative">
          <motion.div
            className="w-14 h-14 relative"
            initial="hidden"
            animate="visible"
          >
            {/* Petals */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className={`absolute w-5 h-8 ${gradientFrom} ${gradientTo} bg-gradient-to-b rounded-full`}
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center bottom",
                  transform: `translate(-50%, -50%) rotate(${i * 72}deg) translateY(-7px)`,
                  filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: flower.delay + (i * 0.08),
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Center of flower */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-5 h-5 bg-yellow-200 rounded-full"
              style={{ 
                transform: "translate(-50%, -50%)",
                filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))"
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: flower.delay + 0.5, duration: 0.3 }}
            />
          </motion.div>
          
          {/* Stem */}
          <motion.div
            className="absolute left-1/2 top-full w-1 h-16 bg-green-500"
            style={{ 
              transformOrigin: "top",
              transform: "translateX(-50%)"
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ 
              delay: flower.delay - 0.2, 
              duration: 0.5, 
              ease: "easeOut" 
            }}
          />
        </div>
      );
      
    case 5: // Lotus-like flower
      return (
        <div className="relative">
          <motion.div
            className="w-16 h-16 relative"
            initial="hidden"
            animate="visible"
          >
            {/* Inner petals */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`inner-petal-${i}`}
                className={`absolute w-4 h-8 ${gradientFrom} ${gradientTo} bg-gradient-to-b rounded-full`}
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center bottom",
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-4px)`,
                  filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{
                  delay: flower.delay + 0.4 + (i * 0.06),
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Outer petals */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`outer-petal-${i}`}
                className={`absolute w-5 h-9 ${gradientFrom} ${gradientTo} bg-gradient-to-b rounded-full`}
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center bottom",
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-8px)`,
                  filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{
                  delay: flower.delay + (i * 0.06),
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Center of flower */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-6 h-6 bg-yellow-300 rounded-full"
              style={{ 
                transform: "translate(-50%, -50%)",
                filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))"
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: flower.delay + 0.8, duration: 0.3 }}
            />
          </motion.div>
          
          {/* Stem */}
          <motion.div
            className="absolute left-1/2 top-full w-1.5 h-18 bg-green-600"
            style={{ 
              transformOrigin: "top",
              transform: "translateX(-50%)"
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ 
              delay: flower.delay - 0.2, 
              duration: 0.5, 
              ease: "easeOut" 
            }}
          />
          
          {/* Leaves */}
          <motion.div
            className="absolute left-1/2 top-[120%] w-7 h-3 bg-green-500 rounded-full origin-left"
            style={{ transform: "translateX(-100%) rotate(-20deg)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: flower.delay, duration: 0.5 }}
          />
        </div>
      );
      
    default:
      return (
        <div className="relative">
          <div className="text-3xl">🌸</div>
          
          {/* Stem */}
          <motion.div
            className="absolute left-1/2 top-full w-1 h-16 bg-green-500"
            style={{ 
              transformOrigin: "top",
              transform: "translateX(-50%)"
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ 
              delay: flower.delay - 0.2, 
              duration: 0.5, 
              ease: "easeOut" 
            }}
          />
        </div>
      );
  }
}