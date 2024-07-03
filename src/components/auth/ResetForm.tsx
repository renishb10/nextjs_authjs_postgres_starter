'use client';

import { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ResetPasswordSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import * as actions from '@/actions';
import Link from 'next/link';

const ResetForm = () => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const [successMsg, setSuccessMsg] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setErrorMsg('');
    setSuccessMsg('');

    startTransition(() => {
      actions.resetPassword(values).then((data) => {
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@example.com"
                      type="email"
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
            Send Reset Email
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default ResetForm;
