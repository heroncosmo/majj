export type EdgeFunctionOptions = {
  headers?: Record<string, string>
  signal?: AbortSignal
}

// Build-time fallbacks (Vercel NEXT_PUBLIC_* envs)
// @ts-expect-error replaced at build by Vite define
declare const __NEXT_PUBLIC_SUPABASE_URL__: string
// @ts-expect-error replaced at build by Vite define
declare const __NEXT_PUBLIC_SUPABASE_ANON_KEY__: string

const PUBLIC_URL = import.meta.env.VITE_SUPABASE_URL || __NEXT_PUBLIC_SUPABASE_URL__
const PUBLIC_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || __NEXT_PUBLIC_SUPABASE_ANON_KEY__

// Centraliza chamada de Edge Functions com headers e logs padrões
export async function callEdgeFunction<T = unknown>(name: string, payload?: unknown, opts: EdgeFunctionOptions = {}): Promise<T> {
  const url = `${PUBLIC_URL}/functions/v1/${name}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${PUBLIC_ANON}`,
    ...opts.headers,
  }

  const started = Date.now()
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
      signal: opts.signal,
    })

    const duration = Date.now() - started
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[edge:${name}] failed`, { status: res.status, duration, text })
      throw new Error(`Edge function ${name} failed: ${res.status}`)
    }

    const data = (await res.json()) as T
    // light log in dev only
    if (import.meta.env.MODE !== 'production') {
      console.debug(`[edge:${name}] ok`, { duration })
    }
    return data
  } catch (err) {
    console.error(`[edge:${name}] error`, err)
    throw err
  }
}

