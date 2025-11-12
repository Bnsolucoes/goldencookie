# Deploy do Golden Cookie na Vercel

Este guia mostra como fazer o deploy do site Golden Cookie na Vercel.

## Pré-requisitos

- Conta no GitHub
- Conta na Vercel (gratuita)
- Código do projeto

## Passo a Passo

### 1. Preparar o Repositório GitHub

1. Crie um novo repositório no GitHub
2. Faça upload dos arquivos do projeto ou use git:

```bash
git init
git add .
git commit -m "Initial commit - Golden Cookie"
git branch -M main
git remote add origin https://github.com/seu-usuario/golden-cookie.git
git push -u origin main
```

### 2. Configurar na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Importe o repositório do GitHub
4. Configure o projeto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `pnpm install`

### 3. Variáveis de Ambiente

Na seção "Environment Variables", adicione:

```
VITE_APP_TITLE=Golden Cookie - Cardápio Digital
```

### 4. Deploy

1. Clique em "Deploy"
2. Aguarde o build finalizar (geralmente 2-3 minutos)
3. Seu site estará disponível em uma URL como: `golden-cookie.vercel.app`

## Configurações Importantes

### Build Settings

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "client/dist",
  "installCommand": "pnpm install"
}
```

### Domínio Customizado (Opcional)

1. Vá em Settings > Domains
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções da Vercel

## Atualizações Futuras

Sempre que você fizer alterações no código:

1. Faça commit das mudanças no GitHub
2. A Vercel fará deploy automático da nova versão

## Personalizações Necessárias

Antes do deploy em produção, atualize:

### 1. Número do WhatsApp

No arquivo `client/src/pages/Home.tsx`, substitua:

```typescript
const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
```

Por:

```typescript
const whatsappUrl = `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(message)}`;
```

### 2. Chave PIX

No arquivo `client/src/components/PixPayment.tsx`, substitua:

```typescript
const pixKey = "seuemail@exemplo.com";
```

Por sua chave PIX real (email, telefone, CPF ou chave aleatória).

### 3. Instagram

No arquivo `client/src/pages/Home.tsx`, atualize:

```html
<p className="mt-6 text-sm text-muted-foreground">
  Também aceitamos pedidos pelo Instagram: @goldencookie
</p>
```

Com seu Instagram real.

## Suporte

Para problemas com o deploy, consulte a [documentação da Vercel](https://vercel.com/docs).

## Otimizações Mobile

O site já está otimizado para acesso via QR Code em dispositivos móveis:

- Design responsivo
- Imagens otimizadas
- Performance otimizada
- Touch-friendly buttons

---

**Golden Cookie** - Cookies artesanais feitos com amor! 🍪
