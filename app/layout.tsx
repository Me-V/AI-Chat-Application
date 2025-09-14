import type { Metadata } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import "./globals.css"; 
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';

export const metadata: Metadata = {
  title: 'Chat Application',
  description: 'A modern chat application built with Next.js and Material-UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}