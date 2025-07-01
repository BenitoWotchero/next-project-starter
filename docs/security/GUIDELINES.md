# 🛡️ Security Guidelines

> **Security-Standards und Best Practices für [PROJECT_NAME]**

## 🎯 Security Overview

### Security-First Approach
Diese Dokumentation stellt sicher, dass [PROJECT_NAME] den höchsten Security-Standards entspricht und gegen die häufigsten Bedrohungen geschützt ist.

### Threat Model
```mermaid
graph TD
    A[External Threats] --> B[Authentication Bypass]
    A --> C[Data Injection]
    A --> D[XSS Attacks]
    A --> E[CSRF Attacks]
    B --> F[Secure Auth Implementation]
    C --> G[Input Validation]
    D --> H[Output Sanitization]
    E --> I[CSRF Protection]
```

## 🔐 Authentication & Authorization

### Secure Authentication
```typescript
// ✅ Sichere Passwort-Hashing
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12; // Mindestens 12 rounds
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
```

### Session Management
```typescript
// ✅ Sichere Session-Konfiguration
export const sessionConfig = {
  secret: process.env.SESSION_SECRET!, // Mindestens 32 Zeichen
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Verhindert XSS via document.cookie
    maxAge: 1000 * 60 * 60 * 24, // 24 Stunden
    sameSite: 'strict' as const // CSRF-Schutz
  }
};
```

### JWT Security
```typescript
// ✅ Sichere JWT-Implementation
import jwt from 'jsonwebtoken';

export function createToken(payload: any): string {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { 
      expiresIn: '1h',
      issuer: 'your-app-name',
      audience: 'your-app-users'
    }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
```

## 🛡️ Input Validation & Sanitization

### Schema Validation mit Zod
```typescript
import { z } from 'zod';

// ✅ Strenge Input-Validation
export const userSchema = z.object({
  email: z.string().email().max(255),
  password: z.string()
    .min(8, 'Mindestens 8 Zeichen')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           'Passwort muss Groß-, Kleinbuchstaben, Zahlen und Sonderzeichen enthalten'),
  name: z.string().min(2).max(100).regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/)
});

export const apiRequestSchema = z.object({
  id: z.string().uuid(),
  data: z.object({}).passthrough()
});
```

### SQL Injection Prevention
```typescript
// ✅ Prepared Statements verwenden
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sicher - Prisma verhindert automatisch SQL Injection
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true } // Nur benötigte Felder
  });
}

// ❌ NIEMALS: Raw SQL mit String-Interpolation
// const query = `SELECT * FROM users WHERE id = '${id}'`; // GEFÄHRLICH!
```

## 🌐 Web Security Headers

### Security Headers Implementation
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  }
};
```

### HTTPS & TLS
```typescript
// ✅ HTTPS-Umleitung
export function httpsRedirect(req: Request) {
  if (process.env.NODE_ENV === 'production' && 
      req.headers.get('x-forwarded-proto') !== 'https') {
    return Response.redirect(`https://${req.headers.get('host')}${req.url}`, 301);
  }
}
```

## 🔒 API Security

### Rate Limiting
```typescript
// ✅ Rate Limiting Implementation
import { NextRequest } from 'next/server';

const requests = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(ip: string, maxRequests = 100, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!requests.has(ip) || requests.get(ip)!.resetTime < windowStart) {
    requests.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  
  const current = requests.get(ip)!;
  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }
  
  current.count++;
  return { allowed: true, remaining: maxRequests - current.count };
}
```

### API Route Protection
```typescript
// ✅ Sichere API-Route-Implementation
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Rate Limiting
  const ip = request.ip ?? '127.0.0.1';
  const { allowed } = rateLimit(ip);
  
  if (!allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  
  // Authentication für geschützte Routen
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }
    
    try {
      verifyToken(token);
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }
  
  return NextResponse.next();
}
```

## 🔍 XSS Prevention

### Output Sanitization
```typescript
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// ✅ Server-side HTML Sanitization
export function sanitizeHtml(dirty: string): string {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);
  
  return purify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'title'],
    FORBID_SCRIPTS: true
  });
}

// ✅ React Components mit XSS-Schutz
export function SafeHtml({ content }: { content: string }) {
  const sanitized = sanitizeHtml(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

### CSP Implementation
```typescript
// ✅ Content Security Policy
export const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Minimieren in Production
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join('; ');
```

## 🛡️ CSRF Protection

### CSRF Token Implementation
```typescript
import crypto from 'crypto';

// ✅ CSRF Token Generation
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function verifyCSRFToken(token: string, sessionToken: string): boolean {
  return crypto.timingSafeEqual(
    Buffer.from(token, 'hex'),
    Buffer.from(sessionToken, 'hex')
  );
}

// ✅ Form mit CSRF-Schutz
export function ProtectedForm({ csrfToken }: { csrfToken: string }) {
  return (
    <form method="post">
      <input type="hidden" name="csrf_token" value={csrfToken} />
      {/* Weitere Form-Felder */}
    </form>
  );
}
```

## 🔐 Environment Security

### Secure Environment Variables
```bash
# ✅ Sichere Environment-Konfiguration
# .env.local (NIEMALS committen!)
DATABASE_URL="postgresql://user:password@localhost:5432/db"
NEXTAUTH_SECRET="super-secure-secret-min-32-chars"
JWT_SECRET="another-super-secure-secret-for-jwt"
API_KEY="your-external-api-key"

# Produktions-spezifische Variablen
NODE_ENV="production"
HTTPS_ONLY="true"
```

### Environment Validation
```typescript
// ✅ Environment Variable Validation
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'test', 'production'])
});

export const env = envSchema.parse(process.env);
```

## 📊 Security Monitoring

### Security Logging
```typescript
// ✅ Security Event Logging
interface SecurityEvent {
  type: 'auth_failure' | 'rate_limit' | 'suspicious_activity';
  ip: string;
  userAgent: string;
  timestamp: Date;
  details: Record<string, any>;
}

export function logSecurityEvent(event: SecurityEvent) {
  console.warn('Security Event:', {
    ...event,
    severity: getEventSeverity(event.type)
  });
  
  // In Production: Send to monitoring service
  // monitoring.track('security_event', event);
}

function getEventSeverity(type: SecurityEvent['type']): 'low' | 'medium' | 'high' {
  switch (type) {
    case 'rate_limit': return 'medium';
    case 'auth_failure': return 'high';
    case 'suspicious_activity': return 'high';
  }
}
```

## 🔧 Security Testing

### Automated Security Tests
```typescript
// ✅ Security Unit Tests
describe('Security Tests', () => {
  test('should hash passwords securely', async () => {
    const password = 'TestPassword123!';
    const hash = await hashPassword(password);
    
    expect(hash).not.toBe(password);
    expect(hash.length).toBeGreaterThan(50);
    expect(await verifyPassword(password, hash)).toBe(true);
  });
  
  test('should reject invalid input', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    
    expect(() => {
      userSchema.parse({ email: maliciousInput });
    }).toThrow();
  });
  
  test('should enforce rate limits', () => {
    const ip = '192.168.1.1';
    
    // Simuliere zu viele Requests
    for (let i = 0; i < 101; i++) {
      rateLimit(ip, 100);
    }
    
    const result = rateLimit(ip, 100);
    expect(result.allowed).toBe(false);
  });
});
```

## 🚨 Incident Response

### Security Incident Checklist
- [ ] **Immediate Response**
  - [ ] Isolate affected systems
  - [ ] Document the incident
  - [ ] Notify security team
  
- [ ] **Investigation**
  - [ ] Analyze logs and traces
  - [ ] Identify attack vectors
  - [ ] Assess data impact
  
- [ ] **Recovery**
  - [ ] Patch vulnerabilities
  - [ ] Restore affected services
  - [ ] Update security measures
  
- [ ] **Post-Incident**
  - [ ] Conduct post-mortem
  - [ ] Update security policies
  - [ ] Improve monitoring

## 📋 Security Checklist

### Development Security
- [ ] **Input Validation** → Alle Inputs validiert mit Zod
- [ ] **Output Sanitization** → XSS-Schutz implementiert
- [ ] **Authentication** → Sichere Auth-Implementation
- [ ] **Authorization** → Rollenbasierte Zugriffskontrolle
- [ ] **Session Management** → Sichere Session-Konfiguration
- [ ] **Rate Limiting** → API-Rate-Limiting implementiert
- [ ] **HTTPS** → HTTPS überall erzwungen
- [ ] **Headers** → Security Headers konfiguriert
- [ ] **Environment** → Sichere Umgebungsvariablen

### Production Security
- [ ] **Monitoring** → Security-Monitoring aktiv
- [ ] **Logging** → Security-Events werden geloggt
- [ ] **Backups** → Regelmäßige sichere Backups
- [ ] **Updates** → Dependency-Updates überwacht
- [ ] **Penetration Testing** → Regelmäßige Security-Audits
- [ ] **Incident Response** → Incident-Response-Plan vorhanden

---

**📅 Last Updated:** [LAST_UPDATE_DATE]  
**🔒 Security Officer:** [SECURITY_OFFICER_NAME]  
**🔄 Review Schedule:** Monthly security reviews

## 🤖 AI-Chat Integration

**Security References:**
```
"Implementiere Feature X nach @docs/security/GUIDELINES.md"
"Überprüfe Code gegen @docs/security/GUIDELINES.md Security-Standards"
"Führe Security-Review nach @docs/security/GUIDELINES.md durch"
```

**Related Documents:**
- **[OWASP Guidelines](OWASP.md)** → OWASP Top 10 Compliance
- **[Rate Limiting](RATE_LIMITING.md)** → API Rate Limiting Implementation
- **[Route Protection](ROUTE_PROTECTION.md)** → Route Security Implementation 