import * as React from 'react';
import { Icons } from '@/components/icons';
import { Link } from '@tanstack/react-router';
import {
  Infobar,
  InfobarContent,
  InfobarGroup,
  InfobarGroupContent,
  InfobarHeader,
  InfobarTrigger,
  useInfobar
} from '@/components/ui/infobar';

// Default/fallback data when no content is set
const defaultData = {
  title: 'Documentation',
  sections: [
    {
      title: 'Getting Started',
      description: 'Learn how to get started with this application.',
      links: [
        {
          title: 'Installation Guide',
          url: '#'
        }
      ]
    }
  ]
};

export function InfoSidebar({ ...props }: React.ComponentProps<typeof Infobar>) {
  const { content } = useInfobar();
  const data = content || defaultData;

  return (
    <Infobar {...props}>
      <InfobarHeader className='sticky top-0 z-10 flex flex-row items-center justify-between gap-2 border-b bg-sidebar px-4 py-3'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-lg font-semibold wrap-break-word'>{data.title}</h2>
        </div>
        <div className='shrink-0'>
          <InfobarTrigger />
        </div>
      </InfobarHeader>
      <InfobarContent>
        <InfobarGroup>
          <InfobarGroupContent>
            <div className='flex flex-col gap-6 px-4 py-4'>
              {data.sections && data.sections.length > 0 ? (
                data.sections.map((section) => (
                  <div key={section.title} className='flex flex-col gap-3'>
                    {section.title && (
                      <h3 className='text-sm font-semibold text-foreground'>{section.title}</h3>
                    )}
                    {section.description && (
                      <p className='text-sm leading-relaxed text-muted-foreground'>
                        {section.description}
                      </p>
                    )}
                    {section.links && section.links.length > 0 && (
                      <div className='flex flex-col gap-2'>
                        <h4 className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
                          Learn more
                        </h4>
                        <ul className='flex flex-col gap-1.5'>
                          {section.links.map((link) => (
                            <li key={link.title}>
                              <Link
                                to={link.url}
                                className='flex items-center gap-1.5 text-sm text-primary underline'
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <span>{link.title}</span>
                                <Icons.chevronRight className='h-3 w-3' />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className='px-2 py-4 text-center text-sm text-muted-foreground'>
                  No content available
                </div>
              )}
            </div>
          </InfobarGroupContent>
        </InfobarGroup>
      </InfobarContent>
    </Infobar>
  );
}
