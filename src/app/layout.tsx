import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import Providers from "@/components/Providers";
import AuthChecker from "@/components/AuthChecker";
import { almarai } from "@/utils/fonts";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Head from "next/head";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const dgagnadeen = localFont({
  src: [
    {
      path: "../fonts/alfont_com_DGAgnadeen-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/alfont_com_DGAgnadeen-Ultralight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/alfont_com_DGAgnadeen-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/alfont_com_DGAgnadeen-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/alfont_com_DGAgnadeen-Bold.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/alfont_com_DGAgnadeen-Extrabold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/alfont_com_DGAgnadeen-Heavy.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "ElQema | القمة في الكيمياء",
  description: "منصة القمة لتدريس منهج الكيمياء للمرحلة الثانوية.",
  keywords:
    "el-qema , القمة , القمه , القمه في الكمياء , القمة في الكمياء , محمد عبد الصمد , عبد الصمد , alqema , alqemah , alqema , alqemah , elqema , elqemah , elqema , elqemah , alqima",
  openGraph: {
    title: "ElQema | القمة في الكيمياء",
    description: "منصة القمة لتدريس منهج الكيمياء للمرحلة الثانية.",
    url: "https://elqema.com",
    images: [
      {
        url: "https://el-qema.com/images/seologo.jpg",
        alt: "القمة في الكيمياء",
      },
    ],
  },
  icons: {
    icon: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <AuthChecker>
        <Providers>
          <body className={cn(dgagnadeen.className, "dark:bg-dark_background")}>
            <NextTopLoader height={3} showSpinner={false} />
            <ThemeProvider
              attribute="light"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
              <ShadcnToaster />
            </ThemeProvider>
          </body>
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
          />
        </Providers>
      </AuthChecker>
    </html>
  );
}
