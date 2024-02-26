import { createFormContext, UseFormInput } from '@mantine/form'
import { LoadsQueryByPoints } from './schema'

export const validation = {}

type Validate = UseFormInput<LoadsQueryByPoints>['validate']

export const validate: Validate = {
  pickup: {
    inputText: (value, values) =>
      value.length && !values.pickup.name
        ? 'Location must be selected from the list'
        : null,
  },
  delivery: {
    inputText: (value, values) =>
      value.length && !values.delivery.name
        ? 'Location must be selected from the list'
        : null,
  },
}

export const [
  LoadsQueryByPointsFormProvider,
  useLoadsQueryByPointsFormContext,
  useLoadsQueryByPointsForm,
] = createFormContext<LoadsQueryByPoints>()
