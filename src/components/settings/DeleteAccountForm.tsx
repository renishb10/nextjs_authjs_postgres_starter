'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DeleteAccountSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteUserAccount } from '@/actions/settings/userSettings';
import FormError from '../form/FormError';
import { toast } from '@/components/ui/use-toast';

const DeleteAccountForm = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
  });

  const onSubmit = (values: z.infer<typeof DeleteAccountSchema>) => {
    startTransition(() => {
      deleteUserAccount(values)
        .then((data) => {
          if (data.success) {
            setErrorMsg('');
            toast({
              title: data.success,
            });
            setTimeout(async () => {
              await signOut({ redirect: false });
              router.push('/goodbye');
            }, 2000);
          }

          if (data.error) {
            setErrorMsg(data.error);
          }
        })
        .catch(() => setErrorMsg('Something went wrong!'));
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              name="deleteTxt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Deletion</FormLabel>
                  <FormControl>
                    <Input placeholder=":(" {...field} disabled={isPending} />
                  </FormControl>
                  <FormDescription>
                    This action cannot be undone. Type &apos;delete&apos; to
                    confirm.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMsg} />
          <Button
            type="submit"
            variant="destructive"
            size="lg"
            disabled={isPending}
          >
            Delete Account
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default DeleteAccountForm;
