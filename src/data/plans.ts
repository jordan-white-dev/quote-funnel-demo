import type { PlanTier } from '@/stores/funnel'

export type PlanDefinition = {
  id: PlanTier
  label: string
  bullets: string[]
  special?: string
  disclaimer?: string
  price: number
  wasPrice?: number
}

export const PLANS: PlanDefinition[] = [
  {
    id: 'premium',
    label: 'Premium',
    bullets: [
      'Expert windshield repair',
      'Exclusive resin sealant',
      'Nationwide lifetime guarantee',
      'New wiper blades',
      'Rain Repel Treatment',
    ],
    special: 'Special: Save $75',
    price: 324.94,
  },
  {
    id: 'standard',
    label: 'Standard',
    bullets: [
      'Expert windshield repair',
      'Exclusive resin sealant',
      'Nationwide lifetime guarantee',
      'New wiper blades',
    ],
    price: 274.94,
    wasPrice: 349.94,
  },
  {
    id: 'glass',
    label: 'Glass service only',
    bullets: [
      'Expert windshield repair',
      'Exclusive resin sealant',
      'Nationwide lifetime guarantee',
    ],
    disclaimer:
      'New wiper blades are not included with glass service only. Because chips can disrupt the glass surface, we recommend new wipers after a repair.',
    price: 234.97,
  },
]
