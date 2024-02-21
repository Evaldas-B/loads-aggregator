'use client'

import { supabaseClient } from '@/utils/supabase/client'
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconExclamationCircle } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const iconExclamationMark = <IconExclamationCircle />

export default function SignIn() {
  const router = useRouter()

  const [authError, setAuthError] = useState<string | null>(null)

  const supabase = supabaseClient()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  type FormValues = typeof form.values
  const signIn = async ({ email, password }: FormValues) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message)
      form.setFieldValue('password', '')
    } else {
      setAuthError(null)
      router.push('/')
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" href="/auth/signup">
          Create account
        </Anchor>
      </Text>

      <form onSubmit={form.onSubmit(signIn)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {authError && (
            <Alert
              className="mb-2"
              variant="light"
              color="red"
              title={authError}
              icon={iconExclamationMark}
            />
          )}

          <TextInput label="Email" {...form.getInputProps('email')} />
          <PasswordInput
            label="Password"
            mt="md"
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            {/* <Anchor component="button" size="sm">
            Forgot password?
          </Anchor> */}
          </Group>

          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
