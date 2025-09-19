import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export function TouristFlowChart({ data = [] }) {
  return (
    <div className="h-48">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SafetyTrendChart({ data = [] }) {
  return (
    <div className="h-48">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function HighRiskBar({ data = [] }) {
  return (
    <div className="h-48">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="zone" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="incidents" fill="#ff7f7f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
