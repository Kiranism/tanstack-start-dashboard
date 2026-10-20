import { createFileRoute } from '@tanstack/react-router';

import { seo } from '@/lib/seo';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: seo({
      title: 'About',
      description:
        'An open-source admin dashboard starter built with TanStack Start, shadcn/ui on Base UI primitives, Tailwind CSS v4, and TypeScript.',
      path: '/about'
    })
  }),
  component: AboutPage
});

function AboutPage() {
  return (
    <div className='min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-12 text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>About</h1>
          <p className='mt-4 text-lg text-muted-foreground'>Learn more about this project</p>
        </div>
        <div className='space-y-8'>
          <section className='rounded-2xl border bg-card p-8 shadow-sm'>
            <h2 className='mb-4 text-xl font-semibold text-foreground'>Open-Source Project</h2>
            <p className='text-lg leading-relaxed text-muted-foreground'>
              This is an open-source admin dashboard starter built with modern web technologies. It
              provides a solid foundation for building powerful admin interfaces and dashboards. The
              source code is freely available for developers to use, modify, and distribute.
            </p>
          </section>
          <section className='rounded-2xl border bg-card p-8 shadow-sm'>
            <h2 className='mb-4 text-xl font-semibold text-foreground'>Demo Purpose</h2>
            <p className='text-lg leading-relaxed text-muted-foreground'>
              This application serves as a demo for demonstration purposes. It showcases the
              features, components, and capabilities of the admin dashboard starter. Feel free to
              explore the interface, test the functionality, and evaluate if it meets your project
              requirements.
            </p>
          </section>
          <section className='rounded-2xl border bg-card p-8 shadow-sm'>
            <h2 className='mb-4 text-xl font-semibold text-foreground'>Data Privacy</h2>
            <p className='text-lg leading-relaxed text-muted-foreground'>
              We take your privacy seriously. No personal data is misused, shared, or sold to third
              parties. Any information collected during your use of this demo application is used
              solely for the purpose of providing the demonstration experience and is handled in
              accordance with best practices for data protection.
            </p>
          </section>
        </div>
        <div className='mt-12 text-center'>
          <p className='text-sm text-muted-foreground'>
            Built with TanStack Start, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </div>
    </div>
  );
}
