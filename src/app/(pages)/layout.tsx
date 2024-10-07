import { Metadata } from "next";
import { Suspense } from "react";

import { ThemeModeProvider } from "@/_metronic/partials";
import { ToastContainer } from "react-toastify";
import { MasterInit } from "@/layout/MasterInit";
import { MasterLayout } from "@/layout/MasterLayout";
import { LayoutSplashScreen, LayoutProvider } from "@/layout/core";
import { AuthInit, AuthProvider } from "@/modules/auth";
// import { ServiceProvider } from "@/components/store/data";

export const metadata: Metadata = {
  title: "Politics",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <LayoutProvider>
          {/* <ThemeModeProvider> */}
          {/* <ServiceProvider> */}
            <AuthInit>
              <MasterLayout>
                <AuthProvider>
                  <ToastContainer />
                  {children}
                </AuthProvider>
              </MasterLayout>
              <MasterInit />
            </AuthInit>
          {/* </ServiceProvider> */}
          {/* </ThemeModeProvider> */}
        </LayoutProvider>
      </Suspense>
    </>
  );
}
