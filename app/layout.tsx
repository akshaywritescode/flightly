import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";
import { ThemeProvider } from "./providers/themeProviders";


export const metadata: Metadata = {
  title: "Flightly | Real-Time Flight Search & Price Comparison",
  description:
    "Flightly helps you search and compare flights with real-time pricing, airline filters, and clear insights to choose the best route for your trip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} w-auto bg-[#edebeb] antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
