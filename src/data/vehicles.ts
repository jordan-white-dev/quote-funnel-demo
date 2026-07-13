export type Makes = Record<string, Record<string, string[]>>
export type VehicleCatalog = Record<string, Makes>

const makes: Makes = {
  Honda: {
    Civic: ['LX', 'Sport'],
    'CR-V': ['EX', 'EX-L'],
  },
  Toyota: {
    Camry: ['LE', 'SE'],
    RAV4: ['XLE', 'Limited'],
  },
  Ford: {
    'F-150': ['XL', 'XLT'],
    Escape: ['Active', 'ST-Line'],
  },
}

const vehicleCatalog: VehicleCatalog = {
  '2026': makes,
  '2025': makes,
  '2024': makes,
}

export function listYears(): string[] {
  return Object.keys(vehicleCatalog).sort((a, b) => b.localeCompare(a))
}

export function listMakes(year: string): string[] {
  return Object.keys(vehicleCatalog[year] ?? {})
}

export function listModels(year: string, make: string): string[] {
  return Object.keys(vehicleCatalog[year]?.[make] ?? {})
}

export function listStyles(year: string, make: string, model: string): string[] {
  return vehicleCatalog[year]?.[make]?.[model] ?? []
}
