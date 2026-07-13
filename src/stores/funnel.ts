import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

// #region Types
type Vehicle = {
  year: string
  make: string
  model: string
  style: string
}
export type RepairAction = 'replace' | 'repair'
export type ChipCount = 1 | 2 | 3
export type SideWindow = 'vent glass' | 'front door' | 'back door' | 'quarter panel'
type DamageState = {
  windshield: {
    isChecked: boolean
    repairAction: '' | RepairAction
    chipCount: 0 | ChipCount
  }
  sideWindow: {
    isChecked: boolean
    driver: { isChecked: boolean; windows: Array<SideWindow> }
    passenger: { isChecked: boolean; windows: Array<SideWindow> }
  }
  rearWindow: { isChecked: boolean }
}
export type PaymentMethod = 'own' | 'insurance'
export type PlanTier = 'premium' | 'standard' | 'glass'
type Plan = {
  paymentMethod: PaymentMethod
  planTier: '' | PlanTier
}
export type ServiceLocation = 'mobile' | 'store'
type ServiceSchedule = {
  serviceLocation: '' | ServiceLocation
  slot: string
}
type ContactInformation = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  allowsTextUpdates: boolean
}
// #endregion

const ZIP_CODE_PATTERN = /^\d{5}(?:-\d{4})?$/

export const useFunnelStore = defineStore('funnel', () => {
  // #region Domain State
  const vehicle = reactive<Vehicle>({ year: '', make: '', model: '', style: '' })
  const damageState = reactive<DamageState>({
    windshield: {
      isChecked: false,
      repairAction: '',
      chipCount: 0,
    },
    sideWindow: {
      isChecked: false,
      driver: { isChecked: false, windows: [] },
      passenger: { isChecked: false, windows: [] },
    },
    rearWindow: { isChecked: false },
  })
  const zipCode = ref('')
  const quoteEmail = ref('')
  const plan = reactive<Plan>({
    paymentMethod: 'own',
    planTier: '',
  })
  const serviceSchedule = reactive<ServiceSchedule>({
    serviceLocation: '',
    slot: '',
  })
  const contactInformation = reactive<ContactInformation>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    allowsTextUpdates: false,
  })
  // #endregion

  // #region Computed State
  const isVehicleComplete = computed(
    () =>
      vehicle.year !== '' && vehicle.make !== '' && vehicle.model !== '' && vehicle.style !== '',
  )
  const isZipCodeValid = computed(() => ZIP_CODE_PATTERN.test(zipCode.value))
  // TODO: nested follow-up rules
  const isDamageSelectionComplete = computed(
    () =>
      damageState.windshield.isChecked ||
      damageState.sideWindow.isChecked ||
      damageState.rearWindow.isChecked,
  )
  const isPlanComplete = computed(() => plan.planTier !== '')
  const isServiceScheduleComplete = computed(
    () => serviceSchedule.serviceLocation !== '' && serviceSchedule.slot !== '',
  )
  const isContactInformationComplete = computed(
    () =>
      contactInformation.firstName !== '' &&
      contactInformation.lastName !== '' &&
      contactInformation.email.includes('@') &&
      contactInformation.phoneNumber.replace(/\D/g, '').length === 10,
  )
  const vehicleDisplayName = computed(() => `${vehicle.year} ${vehicle.make} ${vehicle.model}`)
  // #endregion

  return {
    vehicle,
    damageState,
    zipCode,
    quoteEmail,
    plan,
    serviceSchedule,
    contactInformation,
    isVehicleComplete,
    isZipCodeValid,
    isDamageSelectionComplete,
    isPlanComplete,
    isServiceScheduleComplete,
    isContactInformationComplete,
    vehicleDisplayName,
  }
})
