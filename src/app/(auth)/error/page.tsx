import Logo from '@/components/navbar/Logo';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <Logo />
        <h2 className="mt-6 text-4xl">Uh-ho! Something went wrong!</h2>
        <p>If the problem persists, please contact our support team.</p>
        <Button className="mt-2" size="lg">
          Home
        </Button>
      </div>
    </div>
  );
};
export default ErrorPage;
