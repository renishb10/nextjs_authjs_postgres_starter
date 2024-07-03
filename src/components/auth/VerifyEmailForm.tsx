'use client';

import { useCallback, useEffect, useState } from 'react';
import { RiseLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';
import FormSuccess from '../form/FormSuccess';
import FormError from '../form/FormError';

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing Token!');
      return;
    }

    actions
      .verifyEmail(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((e) => {
        setError('Something went wrong!');
        console.log(e);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="mt-2 flex items-center justify-center">
      {!success && !error && <RiseLoader />}
      <div className="py-4">
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </div>
  );
};
export default VerifyEmailForm;
