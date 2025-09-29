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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
