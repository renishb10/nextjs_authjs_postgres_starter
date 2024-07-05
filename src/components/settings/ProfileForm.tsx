'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { UserSchema } from '@/schemas';
import { useEffect, useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { userSettings } from '@/actions/settings/userSettings';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import FormError from '../form/FormError';

export function ProfileForm() {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues: Partial<z.infer<typeof UserSchema>> = {
    name: '',
    email: '',
    password: undefined,
    isTwoFactorEnabled: undefined,
  };

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues,
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.name || undefined,
        email: user?.email || undefined,
        password: undefined,
        newPassword: undefined,
        isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      });
    }
  }, [user, form]);

  function onSubmit(values: z.infer<typeof UserSchema>) {
    startTransition(() => {
      userSettings(values)
        .then((data) => {
          if (data.success) {
            update();
            setErrorMsg('');
            toast({
              title: data.success,
            });
          }

          if (data.error) {
            setErrorMsg(data.error);
          }
        })
        .catch(() => setErrorMsg('Something went wrong!'));
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" disabled={isPending} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {user?.isOAuth === false && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@gmail.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      autoComplete="new-password"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      autoComplete="new-password"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0 5">
                    <FormLabel>Two Factor Authentication</FormLabel>
                    <FormDescription>
                      Enable Two Factor Authentication for your account
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}
        <FormError message={errorMsg} />
        <Button type="submit" disabled={isPending}>
          Update profile
        </Button>
      </form>
    </Form>
  );
}
