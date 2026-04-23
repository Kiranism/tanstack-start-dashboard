import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [{ title: 'About' }]
  }),
  component: AboutPage
});

function AboutPage() {
  return (
    <div className='min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-12 text-center'>
          <h1 className='text-foreground text-3xl font-bold tracking-tight sm:text-4xl'>About</h1>
          <p className='text-muted-foreground mt-4 text-lg'>Learn more about this project</p>
        </div>
        <div className='space-y-8'>
          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>Open-Source Project</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              This is an open-source admin dashboard starter built with modern web technologies. It
              provides a solid foundation for building powerful admin interfaces and dashboards. The
              source code is freely available for developers to use, modify, and distribute.
            </p>
          </section>
          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>Demo Purpose</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              This application serves as a demo for demonstration purposes. It showcases the
              features, components, and capabilities of the admin dashboard starter. Feel free to
              explore the interface, test the functionality, and evaluate if it meets your project
              requirements.
            </p>
          </section>
          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>Data Privacy</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              We take your privacy seriously. No personal data is misused, shared, or sold to third
              parties. Any information collected during your use of this demo application is used
              solely for the purpose of providing the demonstration experience and is handled in
              accordance with best practices for data protection.
            </p>
          </section>
        </div>
        <div className='mt-12 text-center'>
          <p className='text-muted-foreground text-sm'>
            Built with TanStack Start, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </div>
    </div>
  );
}
