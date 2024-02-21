'use client'
import { InputLabel, Slider } from '@mantine/core'

type Props = {
  className?: string
  label?: string
  disabled?: boolean
  formInputProps?: Record<string, any>
}

export default function RadiusSlider({
  className = '',
  label,
  disabled,
  formInputProps,
}: Props) {
  return (
    <div
      className={`${className} grid grid-flow-row-dense grid-cols-[1fr_min-content] items-center gap-1`}
    >
      <InputLabel className="col-span-2">{label}</InputLabel>
      <Slider
        className="w-full"
        disabled={disabled}
        label={null}
        step={10}
        min={10}
        max={150}
        {...formInputProps}
      />
      <span
        className={`${disabled ? 'text-neutral-300' : ''} w-12 whitespace-nowrap text-sm font-medium`}
      >
        {formInputProps?.value} km
      </span>
    </div>
  )
}
