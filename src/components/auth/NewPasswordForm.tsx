'use client';

import { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { NewPasswordSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import * as actions from '@/actions';

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const [successMsg, setSuccessMsg] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setErrorMsg('');
    setSuccessMsg('');

    startTransition(() => {
      actions.newPassword(values, token).then((data) => {
        if (data) {
          setErrorMsg(data.error);
          setSuccessMsg(data.success);
        }
      });
    });
  };

  return (
    <div className="mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMsg} />
          <FormSuccess message={successMsg} />
          <Button
            type="submit"
            size="lg"
            className="w-full py-2"
            disabled={isPending}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default NewPasswordForm;
