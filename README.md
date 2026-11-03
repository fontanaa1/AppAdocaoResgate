# 🐾 Resgate e Adoção Pet

Aplicativo desenvolvido para auxiliar no registro de animais resgatados por meio de fotografias, permitindo capturar imagens pela câmera ou selecioná-las da galeria e armazená-las na nuvem utilizando o **Supabase Storage**.

## ✨ Funcionalidades

- Captura de fotos utilizando a câmera do dispositivo.
- Seleção de imagens pela galeria.
- Integração com o Capacitor Camera.
- Envio de imagens para o Supabase Storage.
- Armazenamento no bucket `fotos-camera`.
- Recuperação da URL pública da imagem.
- Visualização da fotografia dentro do aplicativo.

## 🛠️ Tecnologias utilizadas

- React
- JavaScript
- Vite
- Capacitor
- Capacitor Camera
- Supabase
- Android

## 📋 Pré-requisitos

Antes de começar, instale:

- Node.js 22 ou superior.
- npm.
- Git.
- Android Studio e Android SDK (para desenvolvimento Android).
- Java JDK 21 (para compilação Android).

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/fontanaa1/AppAdocaoResgate.git
```

Entre na pasta:

```bash
cd AppAdocaoResgate
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado `.env.local`, utilizando o `.env.example` como referência.

No Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Abra o arquivo `.env.local` e configure suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA
```

**Importante:** utilize somente a chave pública `anon` ou `publishable`. Nunca coloque a chave `service_role` ou chaves secretas no frontend.

### 4. Executar localmente

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite disponibilizará o endereço local no terminal, normalmente:

```text
http://localhost:5173
```

### 5. Gerar a versão de produção

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta `dist`.

## ☁️ Configuração do Supabase Storage

O projeto utiliza o Supabase para armazenar as fotografias dos animais resgatados.

### Configuração necessária

1. Crie um projeto no Supabase.
2. Acesse a área Storage.
3. Crie um bucket chamado `fotos-camera`.
4. Configure o bucket como público, caso utilize URLs públicas para visualizar as imagens.
5. Configure as políticas de acesso necessárias para permitir os uploads.

O aplicativo utiliza o seguinte fluxo:

1. Captura ou seleção da imagem.
2. Conversão da imagem para Blob.
3. Geração de um nome único para o arquivo.
4. Upload para o bucket `fotos-camera`.
5. Recuperação da URL pública.
6. Exibição da fotografia no aplicativo.

## 📱 Executar no Android

Depois de configurar as variáveis de ambiente e instalar as dependências:

### 1. Gerar o build React

```bash
npm run build
```

### 2. Sincronizar com o Capacitor

```bash
npx cap sync android
```

### 3. Abrir o projeto no Android Studio

```bash
npx cap open android
```

Também é possível gerar o APK de depuração pelo terminal:

```powershell
cd android
.\gradlew assembleDebug
```

O APK será gerado em:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 🔐 Segurança das variáveis de ambiente

**Nunca envie credenciais sensíveis para o GitHub ou inclua valores reais de variáveis de ambiente em commits.**

O projeto utiliza o arquivo `.env.example` para documentar quais variáveis são necessárias, sem armazenar credenciais reais.

Exemplo do `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

O arquivo `.env.local` deve conter as credenciais reais somente no ambiente local.

### Arquivos que não devem ser enviados ao Git

Adicione as seguintes regras ao `.gitignore`:

```gitignore
# Variáveis de ambiente
.env
.env.*
!.env.example

# Dependências
node_modules/

# Builds
dist/

# Arquivos do sistema
.DS_Store
Thumbs.db
```

**Atenção:** variáveis com prefixo `VITE_` são incorporadas ao código disponibilizado no navegador ou aplicativo. Portanto, somente informações públicas podem ser utilizadas nelas.

### Configuração no GitHub Actions

Para gerar o APK automaticamente pelo GitHub Actions, configure as seguintes credenciais em:

**Settings → Secrets and variables → Actions → New repository secret**

Crie:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

O workflow utiliza esses Secrets durante a etapa de compilação, sem precisar colocar os valores diretamente no arquivo YAML.

## ⚙️ GitHub Actions

O projeto possui automação para gerar o APK Android.

O processo é executado quando há um push nas branches `main` ou `master`, ou quando o workflow é iniciado manualmente.

Etapas da automação:

1. Clonagem do repositório.
2. Configuração do Node.js.
3. Configuração do Java 21.
4. Instalação das dependências.
5. Build do React.
6. Sincronização do Capacitor.
7. Compilação do APK.
8. Publicação do APK como Artifact.

Para baixar o aplicativo:

1. Acesse a aba **Actions** do GitHub.
2. Abra uma execução concluída com sucesso.
3. Localize a seção **Artifacts**.
4. Baixe `Resgate-e-Adocao-Pet-APK`.

## 📂 Estrutura do projeto

```text
AppAdocaoResgate/
│
├── android/
│   └── app/
│
├── src/
│   ├── services/
│   │   └── supabase.js
│   │
│   ├── AdocaoResgateApp.jsx
│   └── ...
│
├── .github/
│   └── workflows/
│       └── build-apk.yml
│
├── .env.example
├── .gitignore
├── capacitor.config.json
├── index.html
├── package.json
└── README.md
```

## 👩‍💻 Desenvolvedora

**Lorena Fontana**

Projeto desenvolvido com foco em tecnologia, proteção animal e incentivo à adoção responsável.

---

🐾 **Resgate e Adoção Pet — Todo animal merece uma segunda chance!** 🧡
