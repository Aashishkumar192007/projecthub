'use client';

import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
  Graticule
} from 'react-simple-maps';
import { useSpring, animated } from 'react-spring';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function InteractiveGlobe() {
  const [rotation, setRotation] = useState<[number, number, number]>([0, -20, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Auto spin
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotation(r => [r[0] - 0.5, r[1], r[2]]);
    }, 50);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handlePointerDown = (e: any) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotation(r => [r[0] + dx * 0.5, r[1] - dy * 0.5, r[2]]);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const markers = [
    { name: "New York", coordinates: [-74.006, 40.7128] },
    { name: "London", coordinates: [-0.1278, 51.5074] },
    { name: "Dubai", coordinates: [55.2708, 25.2048] },
    { name: "Singapore", coordinates: [103.8198, 1.3521] },
  ];

  return (
    <div 
      className="w-full h-full min-h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <ComposableMap
        projection="geoOrthographic"
        projectionConfig={{
          rotate: rotation,
          scale: 200
        }}
        width={800}
        height={600}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Ocean / Sphere Background */}
        <Sphere stroke="#2A2A30" strokeWidth={0.5} fill="#0A0A0A" />
        
        {/* Grid lines */}
        <Graticule stroke="#161616" strokeWidth={0.5} />

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1E1E22"
                stroke="#3F3F46"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#2A2A30", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates as [number, number]}>
            <circle 
              r={6} 
              fill="#06B6D4" 
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse"
            />
            <circle r={2} fill="#FFFFFF" />
          </Marker>
        ))}
      </ComposableMap>

      {/* Internal Shadow to make it look like a 3D sphere */}
      <div className="absolute inset-0 pointer-events-none rounded-full" style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.8) 100%)',
        width: 400,
        height: 400,
        margin: 'auto'
      }}></div>
    </div>
  );
}
