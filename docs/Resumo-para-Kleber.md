# Majik Services – Resumo Executivo para Kleber

Este documento apresenta o estado atual do sistema web da Majik Services (site + painel administrativo), o que ele faz, como utilizá‑lo e como publicar/operar em produção.

## Visão geral
- Plataforma web para divulgação dos serviços de limpeza e gestão de leads (orçamentos) e profissionais.
- Parte pública (site institucional) + parte autenticada (painéis do usuário e do administrador).
- Backend, banco de dados e autenticação fornecidos pelo Supabase.
- Fluxos E2E testados com Playwright (navegação, envio de orçamento, painel admin).

## Principais funcionalidades
1) Site institucional
   - Páginas: Início, Serviços, Sobre, Contato, Registrar Profissional, Solicitar Orçamento.
   - SEO básico e ícones (manifest, favicon, sitemap, robots).

2) Cadastro de profissionais (público)
   - Formulário com nome, telefone, especialidades, bio.
   - Após cadastro, perfil é criado automaticamente (trigger) com status “approved” e disponível.

3) Solicitação de Orçamento (público)
   - Formulário registra um orçamento na tabela `quotes` (status inicial: `new`).
   - Geração de link WhatsApp com mensagem pré-preenchida para facilitar contato.

4) Autenticação
   - Login por e‑mail/senha via Supabase Auth.
   - Usuário com papel `admin` acessa diretamente o painel administrativo `/admin`.

5) Painel Administrativo (Admin)
   - Aba “Profissionais”: busca por nome, paginação (10/pg) e modal de detalhes.
   - Aba “Orçamentos”: filtros (Todos, Em andamento, Concluídos), paginação (10/pg), botão “Marcar concluído”, botão WhatsApp do cliente.
   - “Em andamento” = tudo que não foi concluído (status: `new`, `assigned`, `in_progress`).

6) WhatsApp integrado
   - Links para profissionais e clientes com mensagens automáticas.

## Fluxos principais
- Lead: cliente preenche orçamento → aparece na aba Orçamentos → contato por WhatsApp → “Marcar concluído”.
- Profissional: cadastro público → perfil cai como aprovado/disponível → fica visível na aba Profissionais.
- Admin: login → gerencia Profissionais e Orçamentos em `/admin`.

## Tecnologias
- Frontend: React + TypeScript + Vite + Tailwind CSS.
- Backend/Banco/Auth: Supabase (PostgreSQL + RLS + Auth + Edge Functions). 
- Testes E2E: Playwright.

## Segurança (RLS)
- Tabela `profiles`: RLS habilitada. Usuário acessa somente seu próprio perfil; admin pode listar.
- Tabela `quotes`: `INSERT` público permitido; `SELECT/UPDATE` para admin; clientes não enxergam os orçamentos dos outros.
- Funções auxiliares e policies garantem que apenas administradores listem/alterem orçamentos.

## Banco de dados (principais objetos)
- `public.profiles` (id=auth.uid(), full_name, phone, specialties jsonb, bio, role, status, available, timestamps)
- `public.quotes` (id, name, email, phone, service, address, status, timestamps)
- Trigger pós‑signup: cria/atualiza `profiles` a partir do Supabase Auth.

## Painel Admin – detalhes de uso
- Profissionais
  - Busca por nome, paginação, “Ver Detalhes” (especialidades, bio, projetos caso existam).
- Orçamentos
  - Filtros: 
    - “Todos” → todos os orçamentos
    - “Em andamento” → `new`, `assigned`, `in_progress`
    - “Concluídos” → `completed`
  - Ações: WhatsApp, “Marcar concluído”.

## Testes (Playwright)
- 3 ciclos E2E executados com sucesso:
  - Login admin, Profissionais (busca/modal/paginação), Orçamentos (filtros, WhatsApp, concluir), logout.
- Sem erros 401/500 nos fluxos validados.

## Como rodar localmente
1) Pré‑requisitos: Node 18+.
2) Variáveis de ambiente (.env):
   - NEXT_PUBLIC_SUPABASE_URL=https://wxdqcbtpxivikhsvbjkp.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4ZHFjYnRweGl2aWtoc3ZiamtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzk2MjAsImV4cCI6MjA3MzcxNTYyMH0.dXWh6zPSbArJREX8tRjUunXD5I1GqnVb6o2Gv_0XvBM
3) Instalar dependências: `npm ci`
4) Rodar em desenvolvimento: `npm run dev` (Vite)
5) Build: `npm run build`
6) Preview da build: `npm run preview` (ou `npx vite preview`)

## Deploy na Vercel (projeto: majj)
1) Conectar repositório GitHub ao projeto Vercel “majj” (ou criar novo projeto a partir do repositório).
2) Definir variáveis de ambiente no painel Vercel (NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY).
3) Build Command: `npm run build`
4) Output Directory: `dist`
5) Redeploy e validar as rotas públicas e `/admin` (com usuário admin).

Observação: também é possível usar o CLI da Vercel, mas é recomendável manter o deploy automático a cada push no GitHub.

## Envio ao GitHub (integração)
- O projeto está pronto para versionamento. Para publicar:
  1) Criar um repositório GitHub (ou informar a URL existente).
  2) Adicionar o remote: `git remote add origin <URL_DO_REPO>`
  3) Commit inicial (se necessário) e push: `git add . && git commit -m "feat: primeira versão Majik Services" && git push -u origin main`
  4) Conectar o repositório na Vercel (projeto “majj”).

Caso deseje, posso realizar essa configuração e o push diretamente — preciso apenas do link do repositório GitHub (ou autorização para criar um) e acesso (token/credenciais) se o repositório for privado.

## Acessos e credenciais
- Admin (para o painel `/admin`):
  - E‑mail: brasilmajik@gmail.com
  - Senha provisória: Ibira2019!  (recomenda-se alterar no primeiro acesso)
- Observação: Senhas podem (e devem) ser redefinidas via “Esqueci minha senha” do Supabase Auth.

## Próximos passos sugeridos (opcionais)
- Email transacional para confirmação de orçamento/contato.
- Dashboard de métricas (número de leads por período, conversões, origem do tráfego).
- Ajustes finos de SEO e conteúdo (texto/imagens) para melhorar conversão.

---

Em caso de dúvidas ou para efetivar o deploy/push, estou à disposição para executar imediatamente e validar em produção.

