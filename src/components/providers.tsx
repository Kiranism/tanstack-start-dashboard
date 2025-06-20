import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
