import { Database } from 'backend/supabase/functions/databaseTypes'

type Db = Database['public']
type FunctionName = keyof Db['Functions']
type Functions = Db['Functions']

export type FunctionArgs<T extends FunctionName> = Functions[T]['Args']
