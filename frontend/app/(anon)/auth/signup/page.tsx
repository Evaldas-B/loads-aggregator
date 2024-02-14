'use client'

import { createClient } from '@/utils/supabase/client'
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

export default function SignUp() {
  const router = useRouter()

  const [authError, setAuthError] = useState<string | null>(null)

  const supabase = createClient()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  type FormValues = typeof form.values
  const signUp = async ({ email, password }: FormValues) => {
    const { error } = await supabase.auth.signUp({
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
      <Title ta="center">Welcome!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" href="/auth/signin">
          Sign in
        </Anchor>
      </Text>

      <form onSubmit={form.onSubmit(signUp)}>
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
          </Group>

          <Button type="submit" fullWidth mt="xl">
            Sign up
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
