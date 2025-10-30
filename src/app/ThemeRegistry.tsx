'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';

// Create an Emotion cache for SSR support
function createEmotionCache() {
  return createCache({ key: 'mui', prepend: true });
}

/**
 * Ensures Emotion styles generated on the server
 * are injected into the HTML before hydration,
 * so the client and server markup match.
 */
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // Create cache once per request (SSR safe)
  const [cache] = React.useState<EmotionCache>(() => {
    const c = createEmotionCache();
    // required for MUI compatibility
    (c as any).compat = true;
    return c;
  });

  const inserted: string[] = [];
  const prevInsert = cache.insert;

  // Patch Emotion's insert method to collect style names during SSR
  cache.insert = (...args: any[]) => {
    const [, serialized] = args;
    if (!inserted.includes(serialized.name)) {
      inserted.push(serialized.name);
    }
    return (prevInsert as any)(...args);
  };

  // Inject collected styles into HTML during SSR
  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${inserted.join(' ')}`}
      dangerouslySetInnerHTML={{
        // Join all Emotion-generated CSS into a single style tag
        __html: (Object.values(cache.inserted) as string[]).join(' '),
      }}
    />
  ));

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
