import type { ReactNode } from "react";

// Locale handling is introduced by the i18n story; es-CR is the market default.
const DEFAULT_LOCALE = "es-CR";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>{children}</body>
    </html>
  );
}
