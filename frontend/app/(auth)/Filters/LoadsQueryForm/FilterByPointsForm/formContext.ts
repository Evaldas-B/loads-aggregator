import { createFormContext } from '@mantine/form'
import { LoadsQueryByPoints, loadsQueryByPointsSchema } from './schema'

export const initialLoadsQueryByPoints = loadsQueryByPointsSchema.parse({})

export const [
  LoadsQueryByPointsFormProvider,
  useLoadsQueryByPointsFormContext,
  useLoadsQueryByPointsForm,
] = createFormContext<LoadsQueryByPoints>()
