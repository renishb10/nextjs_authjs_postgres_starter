'use client';

import { useState, useTransition, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoginSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import * as actions from '@/actions';
import Link from 'next/link';

const OTPInputSchema = z.object({
  digit1: z.string().length(1),
  digit2: z.string().length(1),
  digit3: z.string().length(1),
  digit4: z.string().length(1),
});

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Uh-ho! This email is already associated with another login method!'
      : '';

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const [successMsg, setSuccessMsg] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(OTPInputSchema),
    defaultValues: {
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: '',
    },
  });

  const digit1Ref = useRef<HTMLInputElement>(null);
  const digit2Ref = useRef<HTMLInputElement>(null);
  const digit3Ref = useRef<HTMLInputElement>(null);
  const digit4Ref = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement>
  ) => {
    if (e.target.value.length === 1 && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    if (showTwoFactor) {
      const otpValues = otpForm.getValues();
      values.code = `${otpValues.digit1}${otpValues.digit2}${otpValues.digit3}${otpValues.digit4}`;
    }

    setErrorMsg('');
    setSuccessMsg('');

    startTransition(() => {
      actions
        .signIn(values, callbackUrl)
        .then((data) => {
          if (data) {
            if (data?.error) {
              form.reset();
              setErrorMsg(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccessMsg(data.success);
            }

            if (data?.twoFactor) {
              setShowTwoFactor(true);
            }
          }
        })
        .catch(() => {
          setErrorMsg('Something went wrong.');
        });
    });
  };

  return (
    <div className="mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <Form {...otpForm}>
                <div className="text-sm font-sans font-semibold text-center">
                  2FA Code
                </div>
                <div className="flex space-x-4 justify-center">
                  <FormField
                    control={otpForm.control}
                    name="digit1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="-"
                            autoComplete="off"
                            type="text"
                            maxLength={1}
                            disabled={isPending}
                            className="text-center w-12"
                            ref={digit1Ref}
                            onChange={(e) => {
                              field.onChange(e);
                              handleInputChange(e, digit2Ref);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={otpForm.control}
                    name="digit2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="-"
                            autoComplete="off"
                            type="text"
                            maxLength={1}
                            disabled={isPending}
                            className="text-center w-12"
                            ref={digit2Ref}
                            onChange={(e) => {
                              field.onChange(e);
                              handleInputChange(e, digit3Ref);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={otpForm.control}
                    name="digit3"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="-"
                            autoComplete="off"
                            type="text"
                            maxLength={1}
                            disabled={isPending}
                            className="text-center w-12"
                            ref={digit3Ref}
                            onChange={(e) => {
                              field.onChange(e);
                              handleInputChange(e, digit4Ref);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={otpForm.control}
                    name="digit4"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="-"
                            autoComplete="off"
                            type="text"
                            maxLength={1}
                            disabled={isPending}
                            className="text-center w-12"
                            ref={digit4Ref}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormDescription>
                  Please enter the 4-digit code sent to your registered email
                  address. This helps secure your account by verifying your
                  identity.
                </FormDescription>
                <FormMessage />
              </Form>
            )}
            {!showTwoFactor && (
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
                          placeholder="johndoe@example.com"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset-password">
                          Forgot Password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={errorMsg || urlError} />
          <FormSuccess message={successMsg} />
          <Button
            type="submit"
            size="lg"
            className="w-full py-2"
            disabled={isPending}
          >
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
