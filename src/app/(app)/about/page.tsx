import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section className="text-black body-font mt-8">
      <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
        <div className="lg:flex-grow flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Supercharge Your Development with Our Ultimate Next.js Boilerplate!
          </h1>
          <p className="mt-4 mb-2 text-md leading-7 text-slate-600 dark:text-slate-400">
            Our Next.js Boilerplate is meticulously crafted to streamline your
            development process. It integrates a powerful tech stack designed to
            enhance performance, scalability, and maintainability. With Next.js
            14 and app routing, you&apos;ll experience the latest enhancements
            and flexible routing options that make your applications faster and
            more efficient.{' '}
          </p>
          <p className="my-2 text-md leading-7 text-slate-600 dark:text-slate-400">
            Our implementation of Auth.js V5 ensures robust authentication,
            while TypeScript provides a reliable and maintainable codebase
            through static typing. Design stunning, responsive interfaces
            quickly with the utility-first approach of TailwindCSS and the
            flexible components of ShadcnUI. Seamlessly manage email
            communications with Resend, and leverage the power of PostgreSQL and
            Prisma for a robust relational database solution with elegant,
            type-safe database access.{' '}
          </p>
          <p className="my-2 text-md leading-7 text-slate-600 dark:text-slate-400">
            Finally, validate and manage forms efficiently using Zod and React
            Form Hook. Our boilerplate accelerates the setup process and ensures
            your project starts with a solid foundation, allowing you to focus
            on building amazing applications. Discover more about our Next.js
            Boilerplate and how it can revolutionize your development workflow.{' '}
          </p>
          <div className="flex justify-center mt-4">
            <Button
              size="lg"
              className="rounded-md bg-black dark:bg-white px-5 py-2.5 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              Get started
            </Button>
          </div>
        </div>
        <div
          id="pattern"
          className="w-32 sm:w-40 lg:max-w-xl lg:w-full md:w-32 xl:w-5/6 bg-contain bg-no-repeat md:ml-40 xl:mr-16"
        >
          <div className="w-full flex gap-3 justify-center ">
            <Badge className="px-5 py-4">Next.js</Badge>
            <Badge className="px-5 py-4">Auth.js</Badge>
            <Badge className="px-5 py-4">TypeScript</Badge>
          </div>
          <div className="w-full flex gap-2 justify-center items-center my-2">
            <Badge className="px-5 py-4">TailwindCSS</Badge>
            <Badge className="px-6 py-4">ShadcnUI</Badge>
            <Badge className="px-5 py-4">Resend</Badge>
          </div>
          <div className="w-full flex gap-3 justify-center my-2">
            <Badge className="px-5 py-4">PostgreSQL</Badge>
            <Badge className="px-5 py-4">Prisma</Badge>
            <Badge className="px-5 py-4">Zoi</Badge>
          </div>
          <div className="w-full flex gap-3 justify-center my-2">
            <Badge className="px-6 py-4">React Form Hook</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
