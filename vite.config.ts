import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Expõe alternativas para ambientes que usam NEXT_PUBLIC_* (ex.: Vercel)
  // para serem consumidas no client (Vite normalmente só expõe VITE_*).
  define: {
    __NEXT_PUBLIC_SUPABASE_URL__: JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL || ''),
    __NEXT_PUBLIC_SUPABASE_ANON_KEY__: JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''),
  },
}));
