import "./globals.css";

export const metadata = {
  title: "Next 13 + Tailwind App",
  description: "Next 13 + Tailwind App Starter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
