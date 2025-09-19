export function fetchTourists() {
  return Promise.resolve([
    { id: 'T-001', name: 'Alice Kumar', idType: 'Aadhaar', contacts: '9876543210', status: 'Active', lat: 12.9716, lng: 77.5946 },
    { id: 'T-002', name: 'Bob Singh', idType: 'Passport', contacts: '+91-9123456780', status: 'Checked out', lat: 12.2958, lng: 76.6394 }
  ])
}

export function fetchAlerts() {
  return Promise.resolve([
    { id: 'A-100', time: '2025-09-18T10:23:00Z', location: { lat: 12.9716, lng: 77.5946 }, touristId: 'T-001', status: 'Open', type: 'SOS' },
    { id: 'A-101', time: '2025-09-18T08:10:00Z', location: { lat: 12.2958, lng: 76.6394 }, touristId: 'T-002', status: 'Closed', type: 'Panic' }
  ])
}

export function fetchAnalytics() {
  return Promise.resolve({
    touristFlow: [
      { date: '2025-09-13', value: 120 },
      { date: '2025-09-14', value: 200 },
      { date: '2025-09-15', value: 150 }
    ],
    safetyTrend: [
      { date: '2025-09-13', score: 78 },
      { date: '2025-09-14', score: 75 },
      { date: '2025-09-15', score: 80 }
    ],
    highRiskZones: [
      { zone: 'Zone A', incidents: 12 },
      { zone: 'Zone B', incidents: 7 }
    ]
  })
}
