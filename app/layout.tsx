import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import Providers from '@/lib/provider/query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes'

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
        <html lang="en" suppressHydrationWarning>  {/* Added suppressHydrationWarning */}
            <body className="font-sans bg-background">
                <ThemeProvider attribute="class" defaultTheme='light' enableSystem={false}> {/* Moved ThemeProvider here. disabled to avoid issues*/}
                    <Providers>
                        {children}
                        <Toaster />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}