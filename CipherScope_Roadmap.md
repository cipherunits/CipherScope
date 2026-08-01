# نقشه راه توسعه CipherScope

## معرفی پروژه

**CipherScope** یک ابزار CLI برای نمایش اطلاعات مهم پروژه هنگام اجرا است.

هدف:

- نمایش وضعیت Runtime پروژه
- نمایش Environment
- نمایش Git
- نمایش Docker
- نمایش اطلاعات Node و Package Manager
- شخصی‌سازی ظاهر ترمینال
- مدیریت کامل از طریق فایل کانفیگ

---

# مرحله ۱ — ساخت اولین NPM Package

## هدف

ساخت ساده‌ترین نسخه فقط برای تست چرخه کامل npm.

در این مرحله فقط یک پیام نمایش داده می‌شود.

## کارها

- ساخت پروژه Node.js
- تنظیم package.json
- ساخت CLI Entry
- اضافه کردن command

مثال:

```bash
npm i cipher-scope
```

اجرا:

```bash
npx cipher-scope
```

خروجی:

```bash
Hello from CipherScope
```

## خروجی مرحله

- Package روی npm منتشر شده باشد.
- نصب با npm موفق باشد.
- اجرای npx کار کند.

---

# مرحله ۲ — ساخت دستور Init

## هدف

اضافه کردن سیستم ساخت فایل تنظیمات.

دستور:

```bash
npx cipher-scope init
```

خروجی:

```bash
✔ Created cipherscope.toml
```

ساخت فایل:

```
cipherscope.toml
```

با تنظیمات پیش‌فرض:

```toml
[project]
name = "My Project"


[ui]
mode = "default"
bold = true
animation = false


[modules]
env = false
git = true
docker = false
node = true
memory = false
```

---

# مرحله ۳ — ساخت Static UI Engine

## هدف

ساخت موتور نمایش اولیه بدون اتصال به کانفیگ.

در این مرحله تنظیمات داخل کد هستند.

مثال:

```ts
const config = {
  theme: "default",
  bold: true,
  animation: false
}
```

## قابلیت‌ها

- نمایش Banner
- رنگ‌ها
- Bold
- Animation
- Template های مختلف

Mode ها:

```
default
minimal
compact
cyber
```

---

# مرحله ۴ — اتصال فایل TOML

## هدف

انتقال کنترل از کد به فایل تنظیمات.

اضافه کردن:

- خواندن فایل TOML
- اعتبارسنجی تنظیمات
- مدیریت خطا

مثال:

```toml
[ui]

mode = "cyber"
bold = true
animation = true


[modules]

git = true
env = true
docker = true
```

از این مرحله به بعد رفتار برنامه از فایل کنترل می‌شود.

---

# مرحله ۵ — سیستم Dynamic Configuration

## هدف

تمام بخش‌های برنامه از طریق کانفیگ مدیریت شوند.

قابلیت‌ها:

- فعال یا غیرفعال کردن ماژول‌ها
- تغییر Theme
- تغییر Layout
- کنترل Animation
- کنترل اطلاعات نمایش داده شده

مثال:

```toml
[modules]

env = true
git = true
docker = true
memory = true
network = false
```

---

# مرحله ۶ — نمایش اطلاعات Environment

## هدف

نمایش اطلاعات محیط اجرای پروژه.

مثال خروجی:

```
Environment

NODE_ENV=development
PORT=3000
API_URL=https://api.example.com
```

## تنظیمات

```toml
[env]

enabled = true
hideSecrets = true
```

## امنیت

مقادیر حساس نباید نمایش داده شوند:

مخفی:

```
PASSWORD
TOKEN
SECRET
KEY
```

نمایش:

```
DATABASE_URL=****
JWT_SECRET=****
```

---

# مرحله ۷ — Git Integration

## هدف

نمایش وضعیت Git پروژه.

اطلاعات:

```
Branch: main
Commit: a82bc91
Status: clean
```

تنظیمات:

```toml
[git]

enabled = true
```

---

# مرحله ۸ — Docker Integration

## هدف

نمایش اطلاعات Docker هنگام Build و Run.

مشکل هدف:

وقتی چند سرویس Docker وجود دارد مشخص نیست هر سرویس با چه تنظیماتی اجرا شده است.

مثال:

```
Docker

Service: frontend

Image:
frontend:v1

Port:
3000

Environment:
staging
```

تنظیمات:

```toml
[docker]

enabled = true
```

---

# مرحله ۹ — نمایش اطلاعات Runtime

## هدف

نمایش اطلاعات لحظه اجرای برنامه.

اطلاعات:

```
Node:
v24.11.1

Package Manager:
pnpm

Framework:
Next.js

Memory:
1.2GB

OS:
Linux
```

تنظیمات:

```toml
[runtime]

node = true
memory = true
os = true
```

---

# مرحله ۱۰ — Custom Branding

## هدف

هر پروژه بتواند برند خودش را نمایش دهد.

مثال:

```toml
[brand]

name = "CipherUnit"
logo = true
```

خروجی:

```
██████╗██╗██████╗

CipherUnit

Environment:
Production
```

---

# مرحله ۱۱ — اجرای خودکار قبل از Command ها

## هدف

نمایش اطلاعات قبل از اجرای پروژه.

مثال:

قبل:

```bash
npm run dev
```

بعد:

```
CipherScope

Checking environment...
Checking git...
Checking docker...

Starting application...
```

روش‌های پیاده‌سازی:

- npm lifecycle scripts
- command wrapper
- custom runner


مثال:

```bash
cipher-scope run dev
```

---

# مرحله ۱۲ — آماده‌سازی برای Production

## کارها

- نوشتن Documentation
- ساخت Example Project
- تست کامل
- مدیریت Error
- CI/CD
- Semantic Versioning
- انتشار خودکار npm

---

# چشم‌انداز نهایی

CipherScope تبدیل شود به:

> ابزار مشاهده وضعیت پروژه قبل و هنگام اجرای برنامه

پشتیبانی:

✅ Environment  
✅ Git  
✅ Docker  
✅ Node  
✅ Package Manager  
✅ Memory  
✅ Runtime Info  
✅ Custom Theme  
✅ Custom Branding  
✅ Config Driven UI  
