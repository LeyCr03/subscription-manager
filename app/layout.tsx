import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import Providers from '@/lib/provider/query';
import { Toaster } from '@/components/ui/sonner';
export const metadata = {
  title: "Subscription Manager",
  description: "Subscription Manager Dashboard with nextjs/postgres/node",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <Providers>
      <html lang="en">
        <body className="font-sans bg-background">
          {children}
        </body>
        <Toaster />
      </html>
    </Providers>
  );
}
