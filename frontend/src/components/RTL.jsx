import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const RTL = ({ children, direction }) => {
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [prefixer],
  });

  return (
    <CacheProvider value={cacheRtl}>
      {children}
    </CacheProvider>
  );
};

export default RTL;