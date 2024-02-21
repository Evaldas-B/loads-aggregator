import { createFormContext } from '@mantine/form'
import { LoadsQueryByPath, loadsQueryByPathSchema } from './schema'

export const initialLoadsQueryByPath = loadsQueryByPathSchema.parse({})

export const [
  LoadsQueryByPathFormProvider,
  useLoadsQueryByPathFormContext,
  useLoadsQueryByPathForm,
] = createFormContext<LoadsQueryByPath>()
