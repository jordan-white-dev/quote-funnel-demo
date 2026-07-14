import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { PLANS } from '@/data/plans'

// #region Types
type Vehicle = {
  year: string
  make: string
  model: string
  style: string
}
export type RepairAction = 'replace' | 'repair'
export type ChipCount = 1 | 2 | 3
export type SideWindow = 'Vent glass' | 'Front door' | 'Back door' | 'Quarter panel'
export const SIDE_WINDOWS: SideWindow[] = ['Vent glass', 'Front door', 'Back door', 'Quarter panel']

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
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/
const isEmailPlausible = (email: string) => EMAIL_PATTERN.test(email)

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
export const formatUSD = (amount: number) => usdFormatter.format(amount)

export const REPAIR_SUPPLIES_PRICE = 7.99
const SALES_TAX_RATE = 0.08

export const STORE_ADDRESS = '1234 Auto Glass Way, Columbus, OH 43235'

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
  const isQuoteEmailPlausible = computed(() => isEmailPlausible(quoteEmail.value))

  // Damage
  const isWindshieldSectionSatisfied = computed(() => {
    const { isChecked, repairAction, chipCount } = damageState.windshield

    if (!isChecked) return true
    if (repairAction === '') return false

    const isSatisfied = repairAction === 'replace' || chipCount > 0
    return isSatisfied
  })
  const isSideSatisfied = (side: { isChecked: boolean; windows: SideWindow[] }) =>
    !side.isChecked || side.windows.length > 0
  const isSideWindowSectionSatisfied = computed(() => {
    const { isChecked, driver, passenger } = damageState.sideWindow

    if (!isChecked) return true
    if (!driver.isChecked && !passenger.isChecked) return false

    const isSatisfied = isSideSatisfied(driver) && isSideSatisfied(passenger)
    return isSatisfied
  })
  const isDamageSelectionComplete = computed(
    () =>
      (damageState.windshield.isChecked ||
        damageState.sideWindow.isChecked ||
        damageState.rearWindow.isChecked) &&
      isWindshieldSectionSatisfied.value &&
      isSideWindowSectionSatisfied.value,
  )
  const damageSummary = computed(() => {
    const parts: string[] = []
    const { windshield, sideWindow, rearWindow } = damageState

    if (windshield.isChecked) {
      parts.push(
        windshield.repairAction === 'repair'
          ? `repair ${windshield.chipCount} chip${windshield.chipCount === 1 ? '' : 's'} in the windshield`
          : 'replace the windshield',
      )
    }
    if (sideWindow.isChecked) {
      const windowCount = sideWindow.driver.windows.length + sideWindow.passenger.windows.length
      parts.push(`fix ${windowCount} side window${windowCount === 1 ? '' : 's'}`)
    }
    if (rearWindow.isChecked) {
      parts.push('replace the rear window')
    }

    const joined = parts.join(' and ')
    return joined.charAt(0).toUpperCase() + joined.slice(1)
  })

  const isPlanComplete = computed(() => plan.planTier !== '')
  const selectedTierPrice = computed(
    () => PLANS.find((planDefinition) => planDefinition.id === plan.planTier)?.price ?? 0,
  )
  const selectedTierLabel = computed(
    () => PLANS.find((planDefinition) => planDefinition.id === plan.planTier)?.label ?? '',
  )
  const subtotal = computed(() => selectedTierPrice.value + REPAIR_SUPPLIES_PRICE)
  const salesTax = computed(() => subtotal.value * SALES_TAX_RATE)
  const total = computed(() => subtotal.value + salesTax.value)

  const isServiceScheduleComplete = computed(
    () => serviceSchedule.serviceLocation !== '' && serviceSchedule.slot !== '',
  )
  const isContactInformationComplete = computed(
    () =>
      contactInformation.firstName !== '' &&
      contactInformation.lastName !== '' &&
      isEmailPlausible(contactInformation.email) &&
      contactInformation.phoneNumber.replace(/\D/g, '').length === 10,
  )
  const vehicleDisplayName = computed(() => `${vehicle.year} ${vehicle.make} ${vehicle.model}`)
  // #endregion

  // #region Actions

  // Vehicle
  function selectYear(year: string) {
    vehicle.year = year
    vehicle.make = ''
    vehicle.model = ''
    vehicle.style = ''
  }
  function selectMake(make: string) {
    vehicle.make = make
    vehicle.model = ''
    vehicle.style = ''
  }
  function selectModel(model: string) {
    vehicle.model = model
    vehicle.style = ''
  }

  // Damage
  function setWindshieldChecked(isChecked: boolean) {
    damageState.windshield.isChecked = isChecked
    if (!isChecked) {
      damageState.windshield.repairAction = ''
      damageState.windshield.chipCount = 0
    }
  }
  function setWindshieldRepairAction(repairAction: '' | RepairAction) {
    damageState.windshield.repairAction = repairAction
    damageState.windshield.chipCount = 0
  }
  function setSideChecked(side: 'driver' | 'passenger', isChecked: boolean) {
    damageState.sideWindow[side].isChecked = isChecked
    if (!isChecked) {
      damageState.sideWindow[side].windows = []
    }
  }
  function setSideWindowChecked(isChecked: boolean) {
    damageState.sideWindow.isChecked = isChecked
    if (!isChecked) {
      setSideChecked('driver', false)
      setSideChecked('passenger', false)
    }
  }

  function setServiceLocation(serviceLocation: '' | ServiceLocation) {
    if (serviceLocation === serviceSchedule.serviceLocation) return
    serviceSchedule.serviceLocation = serviceLocation
    serviceSchedule.slot = ''
  }
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
    isQuoteEmailPlausible,
    isDamageSelectionComplete,
    isPlanComplete,
    selectedTierPrice,
    subtotal,
    salesTax,
    total,
    isServiceScheduleComplete,
    isContactInformationComplete,
    vehicleDisplayName,
    selectedTierLabel,
    damageSummary,
    selectYear,
    selectMake,
    selectModel,
    setWindshieldChecked,
    setWindshieldRepairAction,
    setSideChecked,
    setSideWindowChecked,
    setServiceLocation,
  }
})
