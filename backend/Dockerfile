# استخدم صورة Node.js رسمية
FROM node:18-alpine

# أنشئ مجلد العمل داخل الحاوية
WORKDIR /usr/src/app

# زيادة مهلة الشبكة لـ npm ليكون أكثر صبرًا
RUN npm config set fetch-timeout 600000
RUN npm config set fetch-retry-maxtimeout 600000

# انسخ ملفات package.json
COPY package*.json ./

# انسخ مخطط Prisma
COPY prisma ./prisma/

# قم بتثبيت جميع المكتبات
RUN npm install

# قم بإنشاء عميل Prisma باستخدام Data Proxy لتجنب تنزيل المحركات
RUN npx prisma generate --data-proxy

# انسخ باقي ملفات التطبيق
COPY . .

# عرّض المنفذ الذي سيعمل عليه التطبيق
EXPOSE 3000

# الأمر الافتراضي لتشغيل التطبيق
CMD [ "npm", "run", "dev" ]
