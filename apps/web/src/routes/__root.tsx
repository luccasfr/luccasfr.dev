import { Toaster } from "@luccasfr/ui/components/sonner";
import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

import "../index.css";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "Lucas Ferreira — Senior Full-Stack Engineer",
      },
      {
        name: "description",
        content: "Lucas Ferreira (luccasfr): engenheiro full-stack e sócio da JeraSoft. Delphi, PHP, TypeScript, Python e Rust.",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
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
        <Toaster richColors />
      </ThemeProvider>
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
    </>
  );
}
