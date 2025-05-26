"use client";
import { Suspense } from "react";
import { Slide, ToastContainer } from "react-toastify";
import MuiThemeProvider from "@/providers/MuiThemeProvider";
import FullScreenLoader from "@/components/common/loader/FullScreenLoader";
import "react-toastify/dist/ReactToastify.css";
import "@/css/global.css";
import UserAuthenticationWrapper from "@/components/wrapper/UserAuthenticationWrapper";
import { METADATA } from "@/lib/constants";
 const metadata = {
  title: METADATA.title,
  description: METADATA.description,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Suspense fallback={<FullScreenLoader />}>
          <MuiThemeProvider>
            <UserAuthenticationWrapper>{children}</UserAuthenticationWrapper>
          </MuiThemeProvider>
        </Suspense>

        <ToastContainer
          transition={Slide}
          limit={4}
          position="bottom-right"
          theme="colored"
          hideProgressBar
        />
      </body>
    </html>
  );
}
