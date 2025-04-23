'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Form from 'next/form';
import { useActionState } from 'react';

import loginAction from './loginAction';

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, null);

    return (
      <>
      {state?.success === false && (
            <div className="text-red-500 text-sm">
                {state.message}
            </div>
      )}
        <Form action={formAction}>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="eu@exemplo.com" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input type="password" name="password" placeholder="********" />
        </div>
        <div>
          <Button className="w-full mt-6" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </>
    )
}