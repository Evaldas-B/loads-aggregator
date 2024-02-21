'use client'

import ByPathFiltersLayer from './ByPathFiltersLayer'
import ByPointsFiltersLayer from './ByPointsFiltersLayer'

export default function FiltersLayer() {
  return (
    <>
      <ByPointsFiltersLayer />
      <ByPathFiltersLayer />
    </>
  )
}
