"use client";

interface GlobalErrorProps {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "#F8FAFC",
            color: "#0F172A",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "22px", margin: 0 }}>Critical error</h1>
          <p style={{ margin: 0, maxWidth: "520px", lineHeight: 1.6, color: "#64748B" }}>
            The application failed unexpectedly. Reload to continue.
          </p>
          {typeof error.digest !== "undefined" ? (
            <p style={{ margin: 0, fontFamily: "ui-monospace", fontSize: "12px", color: "#475569" }}>
              {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => reset()}
            style={{
              cursor: "pointer",
              padding: "10px 16px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              background: "white",
              fontWeight: 600,
              color: "#0F172A",
            }}
          >
            Reload app
          </button>
        </div>
      </body>
    </html>
  );
}
