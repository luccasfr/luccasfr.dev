import { Toaster } from "@luccasfr/ui/components/sonner";
import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

import "../index.css";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <div id="top" className="relative min-h-svh">
          <Header />
          <Outlet />
        </div>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
