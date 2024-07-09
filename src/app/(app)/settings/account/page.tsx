'use client';

import DeleteAccountForm from '@/components/settings/DeleteAccountForm';
import { Separator } from '@/components/ui/separator';

const AccountPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          You can manage your account here.
        </p>
      </div>
      <Separator />
      <DeleteAccountForm />
    </div>
  );
};
export default AccountPage;
