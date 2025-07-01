#!/usr/bin/env node

/**
 * 🚀 Next.js Project Setup Script
 * Interaktives Setup mit KI-Interview + Next.js Installation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const inquirer = require('inquirer');
const chalk = require('chalk');

console.log(chalk.blue.bold('\n🚀 Next.js Project Setup - KI-Interview\n'));

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: '📋 Projekt-Name:',
    default: 'my-nextjs-app',
    validate: input => input.length > 0
  },
  {
    type: 'list',
    name: 'projectType',
    message: '🎯 Projekt-Typ:',
    choices: [
      { name: '🚀 Startup (MVP, schnelle Iteration)', value: 'startup' },
      { name: '🏢 Enterprise (Sicherheit, Compliance)', value: 'enterprise' },
      { name: '👤 Personal (Portfolio, Blog)', value: 'personal' },
      { name: '🎨 Agency (Client-Projekte)', value: 'agency' }
    ]
  },
  {
    type: 'checkbox',
    name: 'features',
    message: '⚡ Hauptfeatures:',
    choices: [
      { name: '🔐 Authentication (NextAuth.js)', value: 'auth' },
      { name: '💾 Database (Prisma + PostgreSQL)', value: 'database' },
      { name: '💳 Payments (Stripe)', value: 'payments' },
      { name: '📧 Email (Resend)', value: 'email' },
      { name: '🎨 Styling (Tailwind CSS)', value: 'tailwind' },
      { name: '📊 Analytics (Vercel Analytics)', value: 'analytics' },
      { name: '🌍 i18n (Internationalization)', value: 'i18n' },
      { name: '🔍 SEO (Metadata, Sitemap)', value: 'seo' }
    ]
  },
  {
    type: 'list',
    name: 'priority',
    message: '🎯 Hauptfokus:',
    choices: [
      { name: '⚡ Speed (Schnelle Entwicklung)', value: 'speed' },
      { name: '🔒 Security (Sicherheit first)', value: 'security' },
      { name: '📈 Scale (Skalierbarkeit)', value: 'scale' },
      { name: '💰 Revenue (Monetarisierung)', value: 'revenue' }
    ]
  },
  {
    type: 'confirm',
    name: 'includeTests',
    message: '🧪 Testing Setup (Jest + Testing Library):',
    default: true
  },
  {
    type: 'confirm',
    name: 'includeDocker',
    message: '🐳 Docker Setup:',
    default: false
  },
  {
    type: 'input',
    name: 'description',
    message: '📝 Kurze Projekt-Beschreibung:',
    default: 'Ein Next.js 15+ Projekt'
  }
];

async function main() {
  try {
    console.log(chalk.yellow('📋 Beantworte ein paar Fragen für das optimale Setup...\n'));
    
    const answers = await inquirer.prompt(questions);
    
    console.log(chalk.green('\n✅ Setup wird erstellt...\n'));
    
    // 1. Package.json updaten
    updatePackageJson(answers);
    
    // 2. Next.js konfigurieren
    createNextConfig(answers);
    
    // 3. TypeScript Setup
    createTsConfig();
    
    // 4. Tailwind Setup (falls gewählt)
    if (answers.features.includes('tailwind')) {
      setupTailwind();
    }
    
    // 5. AI-Workflow Dateien anpassen
    updateAIWorkflows(answers);
    
    // 6. Starter-Files erstellen
    createStarterFiles(answers);
    
    // 7. Dokumentation aktualisieren
    updateDocumentation(answers);
    
    console.log(chalk.green.bold('\n🎉 Setup komplett!\n'));
    
    // Nächste Schritte anzeigen
    showNextSteps(answers);
    
  } catch (error) {
    console.error(chalk.red('❌ Fehler beim Setup:'), error.message);
    process.exit(1);
  }
}

function updatePackageJson(answers) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  packageJson.name = answers.projectName;
  packageJson.description = answers.description;
  
  // Dependencies je nach Features
  if (answers.features.includes('auth')) {
    packageJson.dependencies['next-auth'] = '^4.24.0';
  }
  
  if (answers.features.includes('database')) {
    packageJson.dependencies['@prisma/client'] = '^5.0.0';
    packageJson.devDependencies['prisma'] = '^5.0.0';
  }
  
  if (answers.features.includes('tailwind')) {
    packageJson.devDependencies['tailwindcss'] = '^3.4.0';
    packageJson.devDependencies['postcss'] = '^8.4.0';
    packageJson.devDependencies['autoprefixer'] = '^10.4.0';
  }
  
  if (answers.features.includes('payments')) {
    packageJson.dependencies['stripe'] = '^14.0.0';
  }
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log(chalk.blue('📦 package.json aktualisiert'));
}

function createNextConfig(answers) {
  const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: []
  },
  ${answers.features.includes('i18n') ? 'i18n: {\n    locales: ["de", "en"],\n    defaultLocale: "de"\n  },' : ''}
  ${answers.features.includes('analytics') ? 'analytics: {\n    vercel: true\n  },' : ''}
  images: {
    remotePatterns: [
      // Hier externe Image-Domains eintragen
    ]
  }
};

module.exports = nextConfig;`;

  fs.writeFileSync('next.config.js', config);
  console.log(chalk.blue('⚙️ next.config.js erstellt'));
}

function createTsConfig() {
  const tsConfig = {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "es6"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [
        {
          "name": "next"
        }
      ],
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"],
        "@/components/*": ["./src/components/*"],
        "@/lib/*": ["./src/lib/*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  };

  fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));
  console.log(chalk.blue('📘 tsconfig.json erstellt'));
}

function setupTailwind() {
  // Tailwind Config
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

  fs.writeFileSync('tailwind.config.js', tailwindConfig);
  
  // PostCSS Config
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

  fs.writeFileSync('postcss.config.js', postcssConfig);
  
  console.log(chalk.blue('🎨 Tailwind CSS konfiguriert'));
}

function updateAIWorkflows(answers) {
  // START-PROMPT.md mit projekt-spezifischen Daten updaten
  let startPrompt = fs.readFileSync('AI-WORKFLOWS/START-PROMPT.md', 'utf8');
  
  startPrompt = startPrompt
    .replace('[PROJECT_NAME]', answers.projectName)
    .replace('[PROJECT_TYPE]', answers.projectType)
    .replace('[PROJECT_FEATURES]', answers.features.join(', '))
    .replace('[PROJECT_PRIORITIES]', answers.priority);
  
  fs.writeFileSync('AI-WORKFLOWS/START-PROMPT.md', startPrompt);
  console.log(chalk.blue('🤖 AI-Workflows angepasst'));
}

function createStarterFiles(answers) {
  // Basis src/ Struktur
  fs.mkdirSync('src/app', { recursive: true });
  fs.mkdirSync('src/components', { recursive: true });
  fs.mkdirSync('src/lib', { recursive: true });
  
  // App Router Layout
  const layout = `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body${answers.features.includes('tailwind') ? ' className="font-sans"' : ''}>{children}</body>
    </html>
  )
}`;

  fs.writeFileSync('src/app/layout.tsx', layout);
  
  // Homepage
  const homepage = `export default function Home() {
  return (
    <main${answers.features.includes('tailwind') ? ' className="container mx-auto p-8"' : ''}>
      <h1${answers.features.includes('tailwind') ? ' className="text-4xl font-bold mb-4"' : ''}>
        ${answers.projectName}
      </h1>
      <p${answers.features.includes('tailwind') ? ' className="text-gray-600"' : ''}>
        ${answers.description}
      </p>
    </main>
  )
}`;

  fs.writeFileSync('src/app/page.tsx', homepage);
  
  console.log(chalk.blue('📁 Next.js Starter-Files erstellt'));
}

function updateDocumentation(answers) {
  // 1. OVERVIEW.MD mit projekt-spezifischen Infos ergänzen
  let overviewContent = fs.readFileSync('docs/OVERVIEW.MD', 'utf8');
  
  // Projekt-Info am Anfang hinzufügen
  const projectInfo = `
## 🎯 Projekt-Information

- **Name**: ${answers.projectName}
- **Typ**: ${answers.projectType}
- **Beschreibung**: ${answers.description}
- **Priorität**: ${answers.priority}
- **Features**: ${answers.features.join(', ')}
- **Setup-Datum**: ${new Date().toLocaleDateString('de-DE')}

---

`;

  // Nach dem ersten Heading einfügen
  overviewContent = overviewContent.replace(
    /^(# [^\n]+\n\n[^\n]+\n\n)/,
    `$1${projectInfo}`
  );
  
  fs.writeFileSync('docs/OVERVIEW.MD', overviewContent);
  
  // 2. PROJECT.md Template mit echten Werten füllen
  updateProjectTemplate(answers);
  
  // 3. Zusätzliche Files basierend auf Features erstellen
  createFeatureSpecificDocs(answers);
  
  console.log(chalk.blue('📚 Dokumentation aktualisiert'));
}

function updateProjectTemplate(answers) {
  let projectContent = fs.readFileSync('docs/project/PROJECT.md', 'utf8');
  
  // Alle Platzhalter ersetzen
  const replacements = {
    '[PROJECT_NAME]': answers.projectName,
    '[KURZE_BESCHREIBUNG_DES_PROJEKTS]': answers.description,
    '[CURRENT_VERSION]': '0.1.0',
    '[START_DATE]': new Date().toLocaleDateString('de-DE'),
    '[PROJECT_TYPE]': answers.projectType,
    '[HAUPTTECHNOLOGIEN]': getMainTech(answers.features),
    '[LAST_UPDATE_DATE]': new Date().toLocaleDateString('de-DE'),
    '[MAINTAINER_NAME]': 'Project Team'
  };
  
  Object.entries(replacements).forEach(([placeholder, value]) => {
    projectContent = projectContent.replaceAll(placeholder, value);
  });
  
  // Feature-spezifische Ersetzungen
  if (answers.features.includes('auth')) {
    projectContent = projectContent.replace(
      '[FEATURE_1]',
      'User Authentication'
    );
  }
  
  if (answers.features.includes('database')) {
    projectContent = projectContent.replace(
      '[FEATURE_2]',
      'Database Integration'
    );
  }
  
  fs.writeFileSync('docs/project/PROJECT.md', projectContent);
  console.log(chalk.green('  ✓ PROJECT.md mit echten Werten gefüllt'));
}

function getMainTech(features) {
  const tech = ['Next.js 15', 'TypeScript', 'React'];
  
  if (features.includes('tailwind')) tech.push('Tailwind CSS');
  if (features.includes('database')) tech.push('Prisma', 'PostgreSQL');
  if (features.includes('auth')) tech.push('NextAuth.js');
  
  return tech.join(', ');
}

function createFeatureSpecificDocs(answers) {
  // Erstelle nur relevante Dokumentations-Files
  const docsToCreate = [];
  
  if (answers.features.includes('auth')) {
    docsToCreate.push('security/AUTH.md');
    docsToCreate.push('api/AUTH.md');
  }
  
  if (answers.features.includes('database')) {
    docsToCreate.push('database/SCHEMA.md');
    docsToCreate.push('database/MODELS.md');
  }
  
  if (answers.features.includes('payments')) {
    docsToCreate.push('api/PAYMENTS.md');
  }
  
  if (answers.priority === 'security') {
    docsToCreate.push('security/OWASP.md');
    docsToCreate.push('security/RATE_LIMITING.md');
  }
  
  // Files erstellen mit Templates
  docsToCreate.forEach(filePath => {
    const fullPath = `docs/${filePath}`;
    const dir = path.dirname(fullPath);
    
    // Verzeichnis erstellen falls nötig
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Template-Inhalt generieren
    const content = generateDocTemplate(filePath, answers);
    fs.writeFileSync(fullPath, content);
    
    console.log(chalk.green(`  ✓ ${filePath} erstellt`));
  });
}

function generateDocTemplate(filePath, answers) {
  const templates = {
    'security/AUTH.md': `# 🔐 Authentication Strategy

## Overview
Authentication-Strategie für ${answers.projectName}.

## Authentication Method
${answers.features.includes('auth') ? '- NextAuth.js Integration' : '- Custom Authentication'}

## Implementation
- [ ] User Registration
- [ ] Login/Logout
- [ ] Session Management
- [ ] Password Reset

## Security Considerations
- [ ] Password Hashing
- [ ] Rate Limiting
- [ ] CSRF Protection
- [ ] XSS Prevention

---
**Auto-generated for ${answers.projectName} on ${new Date().toLocaleDateString('de-DE')}**`,

    'api/AUTH.md': `# 🔑 API Authentication

## Endpoints

### POST /api/auth/login
\`\`\`typescript
// Request
{
  email: string;
  password: string;
}

// Response
{
  user: User;
  token: string;
}
\`\`\`

### POST /api/auth/logout
\`\`\`typescript
// Invalidate session
\`\`\`

---
**Auto-generated for ${answers.projectName} on ${new Date().toLocaleDateString('de-DE')}**`,

    'database/SCHEMA.md': `# 💾 Database Schema

## Overview
Database schema für ${answers.projectName}.

## Tables

### Users
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

---
**Auto-generated for ${answers.projectName} on ${new Date().toLocaleDateString('de-DE')}**`,

    'database/MODELS.md': `# 🗃️ Data Models

## User Model
\`\`\`typescript
interface User {
  id: number;
  email: string;
  createdAt: Date;
}
\`\`\`

---
**Auto-generated for ${answers.projectName} on ${new Date().toLocaleDateString('de-DE')}**`,

    'api/PAYMENTS.md': `# 💳 Payment API

## Stripe Integration

### POST /api/payments/create-intent
\`\`\`typescript
// Create payment intent
\`\`\`

---
**Auto-generated for ${answers.projectName} on ${new Date().toLocaleDateString('de-DE')}**`,

    'security/OWASP.md': `# 🛡️ OWASP Security Guidelines

## OWASP Top 10 Compliance for ${answers.projectName}

### 1. Injection
- [ ] SQL Injection Prevention
- [ ] NoSQL Injection Prevention

### 2. Broken Authentication
- [ ] Multi-factor Authentication
- [ ] Session Management

### 3. Sensitive Data Exposure
- [ ] Data Encryption
- [ ] HTTPS Enforcement

---
**Auto-generated for ${answers.projectName} on ${new Date().toLocaleDateString('de-DE')}**`,

    'security/RATE_LIMITING.md': `# ⚡ Rate Limiting Implementation

## Rate Limiting Strategy for ${answers.projectName}

### API Endpoints
- **General API**: 100 requests/minute
- **Authentication**: 5 requests/minute
- **File Upload**: 10 requests/minute

### Implementation
\`\`\`typescript
// Rate limiting middleware
\`\`\`

---
**Auto-generated for ${answers.projectName} on ${new Date().toLocaleDateString('de-DE')}**`
  };

  return templates[filePath] || `# ${filePath}\n\nDokumentation für ${answers.projectName}.\n\n---\n**Auto-generated on ${new Date().toLocaleDateString('de-DE')}**`;
}

function showNextSteps(answers) {
  console.log(chalk.green.bold('🎯 Nächste Schritte:\n'));
  
  console.log(chalk.yellow('1. Dependencies installieren:'));
  console.log(chalk.gray('   npm install\n'));
  
  console.log(chalk.yellow('2. Development starten:'));
  console.log(chalk.gray('   npm run dev\n'));
  
  console.log(chalk.yellow('3. KI-Chat in Cursor öffnen und eingeben:'));
  console.log(chalk.gray('   "@AI-WORKFLOWS/START-PROMPT.md - Projekt ist eingerichtet, lass uns mit der Entwicklung beginnen"\n'));
  
  console.log(chalk.yellow('4. Weitere Commands:'));
  console.log(chalk.gray('   npm run validate  # Projekt-Struktur prüfen'));
  console.log(chalk.gray('   npm run ai-check  # Dokumentation validieren'));
  console.log(chalk.gray('   npm run help      # Alle verfügbaren Commands\n'));
  
  console.log(chalk.blue('📚 Wichtige Files:'));
  console.log(chalk.gray('   • docs/OVERVIEW.MD     → Master-Übersicht'));
  console.log(chalk.gray('   • docs/WORKFLOWS.MD    → Standard-Abläufe'));
  console.log(chalk.gray('   • AI-WORKFLOWS/        → KI-Chat Leitfäden\n'));
  
  console.log(chalk.green('🚀 Viel Erfolg mit deinem Projekt!'));
}

// Script starten
main(); 