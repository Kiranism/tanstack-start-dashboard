import { useRouter } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

type NotFoundProps = {
  title?: string;
  description?: string;
};

export function NotFound({
  title = "Something's missing",
  description = "Sorry, the page you are looking for doesn't exist or has been moved."
}: NotFoundProps) {
  const router = useRouter();

  return (
    <div className='absolute top-1/2 left-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center'>
      <span className='bg-linear-to-b from-foreground to-transparent bg-clip-text text-[10rem] leading-none font-extrabold text-transparent'>
        404
      </span>
      <h2 className='font-heading my-2 text-2xl font-bold'>{title}</h2>
      <p>{description}</p>
      <div className='mt-8 flex justify-center gap-2'>
        <Button onClick={() => router.history.back()} variant='default' size='lg'>
          Go back
        </Button>
        <Button onClick={() => router.navigate({ to: '/dashboard' })} variant='ghost' size='lg'>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
