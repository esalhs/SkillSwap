import type { FiltersState } from '@/shared/types'

export type SidebarPanelProps = {
filters: FiltersState
onChange: (filters: FiltersState) => void
}

export type ActiveFiltersBarProps = {
filters: FiltersState
onReset: () => void
onRemoveFilter: (type: keyof FiltersState, value: string) => void
}