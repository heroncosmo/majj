# Pipeline de Migrations

Este diretório mantém migrations versionadas do esquema do Supabase.

Como usar (local):
1. Garanta que o Supabase CLI esteja instalado (https://supabase.com/docs/guides/cli)
2. Faça login: `supabase login`
3. Vincule o projeto: `supabase link --project-ref <PROJECT_REF>`
4. Aplique migrações localmente: `supabase db reset` (atenção: apaga dados locais)
5. Criar nova migration a partir de diffs: `supabase db diff -f nome_significativo`
6. Subir para produção: utilize `supabase db push` com cautela e janela de manutenção

CI (sugestão):
- Adicionar um job que execute `supabase db reset` para validar que a base sobe 100% com as migrations.
- Não executar `push` na CI de `main` sem aprovação manual.

Observações:
- Após qualquer mudança direta em `schema.sql`, crie uma migration correspondente.
- Use `SET search_path = public` em funções SECURITY DEFINER.
- Prefira `(select auth.uid())` em políticas RLS por performance.

