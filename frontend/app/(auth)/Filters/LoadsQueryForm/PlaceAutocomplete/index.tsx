'use client'
import { Combobox, TextInput, useCombobox } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { useEffect, useState } from 'react'
import placeAutocompleteService, {
  PlaceAutocompleteOption,
} from './placeAutocompleteService'
import { useDebouncedValue } from '@mantine/hooks'

type InputProps = ReturnType<UseFormReturnType<any>['getInputProps']>

type Props = {
  label?: string
  inputPropsName?: InputProps
  inputPropsInputText?: InputProps
  inputPropsCoordinates?: InputProps
  className?: string
}

export default function PlaceAutocomplete({
  label,
  inputPropsInputText,
  inputPropsName,
  inputPropsCoordinates,

  className = '',
}: Props) {
  const combobox = useCombobox()
  const [options, setOptions] = useState<PlaceAutocompleteOption[]>([])
  const [debounced] = useDebouncedValue(inputPropsInputText?.value, 250)

  const setAutocompleteOptions = async (value: string) => {
    const locations = await placeAutocompleteService(value) // Fetches options
    setOptions(locations)
  }

  useEffect(() => {
    setAutocompleteOptions(debounced)
  }, [debounced])

  const setFormValues = ({
    name = '',
    coordinates = null,
    inputText,
  }: {
    name?: string
    coordinates?: { lng: number; lat: number } | null
    inputText: string
  }) => {
    inputPropsName?.onChange(name)
    inputPropsCoordinates?.onChange(coordinates)
    inputPropsInputText?.onChange(inputText)
  }

  const optionComponents = options.map(({ id, name, country, coordinates }) => (
    <Combobox.Option
      value={id}
      key={id}
      onClick={() => {
        const fullName = [name, country].join(', ')
        setFormValues({ name: fullName, coordinates, inputText: fullName })
      }}
    >
      <div className="font-medium">{name}</div>
      <div className="text-xs">{country}</div>
    </Combobox.Option>
  ))

  return (
    <Combobox
      onOptionSubmit={() => {
        combobox.closeDropdown()
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label={label}
          {...inputPropsInputText}
          onChange={async (event) => {
            const value = event.currentTarget.value

            setFormValues({ inputText: value })

            combobox.openDropdown()
            combobox.updateSelectedOptionIndex()
          }}
          onBlur={() => combobox.closeDropdown()}
          className={className}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={optionComponents.length === 0}>
        <Combobox.Options>{optionComponents}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
