import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export function PokemonSkeleton() {
  return (
    <div className='animate-pulse space-y-6'>
      {/* Selector card skeleton */}
      <Card>
        <CardHeader>
          <div className='h-6 w-40 rounded bg-muted' />
          <div className='mt-2 h-4 w-72 rounded bg-muted' />
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className='h-9 w-14 rounded-md bg-muted' />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pokemon card skeleton */}
      <Card>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <div className='h-7 w-32 rounded bg-muted' />
            <div className='h-5 w-16 rounded-full bg-muted' />
          </div>
          <div className='mt-2 h-4 w-48 rounded bg-muted' />
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center gap-6 sm:flex-row'>
            <div className='size-40 rounded-lg bg-muted' />
            <div className='w-full flex-1 space-y-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='space-y-1'>
                  <div className='flex justify-between'>
                    <div className='h-4 w-24 rounded bg-muted' />
                    <div className='h-4 w-8 rounded bg-muted' />
                  </div>
                  <div className='h-2 w-full rounded-full bg-muted' />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className='h-3 w-64 rounded bg-muted' />
        </CardFooter>
      </Card>
    </div>
  );
}
