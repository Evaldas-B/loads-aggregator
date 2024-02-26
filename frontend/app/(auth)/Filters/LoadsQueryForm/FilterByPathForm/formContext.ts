import { UseFormInput, createFormContext } from '@mantine/form'
import { LoadsQueryByPath } from './schema'

type Validate = UseFormInput<LoadsQueryByPath>['validate']

export const validate: Validate = {
  waypoints: {
    inputText: (value, values, path) => {
      const [, index] = path.split('.')

      // Validates that location was selected from the list
      if (value && value !== values.waypoints[+index].name)
        return 'Location must be selected from list'

      // Validates that all of the location inputs have values if at least on location was provided
      if (!values.waypoints[+index].name) return 'This field is required'
    },
  },
}

export const [
  LoadsQueryByPathFormProvider,
  useLoadsQueryByPathFormContext,
  useLoadsQueryByPathForm,
] = createFormContext<LoadsQueryByPath>()
