import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout wraps pages with the site-wide header and footer.
 */
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
    </>
  );
}
