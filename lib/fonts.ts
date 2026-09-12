import { Montserrat } from 'next/font/google';

/**
 * Used for the long-form guide section (EdHubPage's #education block) only —
 * the rest of the site keeps the system sans stack from globals.css.
 */
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
