import "./globals.css";

export const metadata = {
  title: "PortBuilder — Build Your Stunning Portfolio in Minutes",
  description: "Create a professional, live portfolio website with beautiful themes, analytics, and resume export. No coding required.",
  keywords: "portfolio builder, portfolio website, personal website, resume builder, developer portfolio",
  openGraph: {
    title: "PortBuilder — Build Your Stunning Portfolio",
    description: "Create a professional, live portfolio website with beautiful themes. No coding required.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6C63FF" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
