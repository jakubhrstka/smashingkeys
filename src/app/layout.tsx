import type { Metadata } from "next";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { AVAILABLE_THEMES, ROBOTO_MONO } from "@/lib/constants";
import { Toaster } from "sonner";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  const userPreferedThemeName = session?.user?.preferedThemeName;

  return (
    <html
      lang="en"
      data-theme={`${
        userPreferedThemeName &&
        AVAILABLE_THEMES.includes(userPreferedThemeName)
          ? `theme-${userPreferedThemeName}`
          : "theme-bento"
      }`}
    >
      <body
        className={cn(
          ROBOTO_MONO.className,
          "flex flex-col justify-between min-h-screen tracking-tight bg-background text-secondary"
        )}
      >
        <Providers userThemeName={userPreferedThemeName}>
          <Header />

          <main className="grow flex flex-col">{children}</main>

          <Footer />
          <Toaster position={"bottom-center"} richColors={true} />
        </Providers>
      </body>
    </html>
  );
}
