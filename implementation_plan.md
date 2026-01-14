# خطة هندسة الواجهة الأمامية لـ DragonSploit (Enterprise-Grade Engineering Plan)

تستهدف هذه الخطة بناء واجهة أمامية بمستوى عالمي، تعكس التعقيد الهندسي للـ Backend (الذي يستخدم Intent-Based Orchestration). سنبتعد عن الحلول السطحية ونركز على **Feature-Sliced Design (FSD)**، **الأمان الدفاعي (Security-by-Design)**، و **الأداء العالي (High-Performance Computing)** في المتصفح.

## 1. الفلسفة المعمارية: العمق الهندسي قبل الجماليات
*   **Feature-Sliced Design (FSD)**: تقسيم المشروع إلى طبقات (`app`, `pages`, `widgets`, `features`, `entities`, `shared`) لضمان قابلية التوسع والصيانة. هذا النمط هو المقياس الذهبي للتطبيقات الكبيرة في 2025.
*   **Hexagonal Architecture (Port & Adapters)**: فصل منطق العمل (Business Logic) عن واجهة المستخدم (UI)، مما يسمح باختبار "نواة التطبيق" بشكل مستقل تمامًا عن React.
*   **Security-First**: تطبيق مبادئ OWASP Top 10 للواجهات الأمامية (CSP, XSS Protection, Secure State Management).

## 2. الهيكل الهندسي للمشروع (Structure)
سنعتمد هيكلية FSD الصارمة:

```bash
frontend/
├── src/
│   ├── app/                # تهيئة التطبيق (Providers, Global Styles, Router)
│   ├── processes/          # العمليات المعقدة التي تمتد عبر صفحات متعددة (مثل مسار المصادقة الكامل)
│   ├── pages/              # تجميع للـ Widgets لإنشاء صفحات كاملة
│   ├── widgets/            # كتل UI مستقلة (مثل Navbar, ActiveScanTerminal)
│   ├── features/           # وظائف المستخدم (مثل AuthByEmail, LaunchScan, ExportReport)
│   ├── entities/           # وحدات نطاق العمل (User, Target, Scan, Vulnerability)
│   ├── shared/             # كود قابل لإعادة الاستخدام (UI Kit, API Client, Utils)
│   │   ├── api/            # طبقة اتصال API (Axios Interceptors, Type-Safe Requests)
│   │   ├── ui/             # مكتبة المكونات التصميمية (Atomic Design System)
│   │   └── lib/            # مكتبات مساعدة (Security, Validation)
```

## 3. الركائز التقنية (Tech Stack)
*   **Core**: React 19 (أحدث الميزات), TypeScript 5.5 (Strict Mode).
*   **State Management**: `Zustand` (للحالة العامة الخفيفة) + `TanStack Query` (لإدارة حالة الخادم والكاش الذكي).
*   **Performance**: الاستعانة بـ **Web Workers** لمعالجة سجلات التيرمينال الضخمة (Log Processing) بعيداً عن الخيط الرئيسي (Main Thread) لضمان واجهة سلسة "60 FPS" حتى تحت الضغط.
*   **Security Layer**:
    *   **DomPurify**: لتعقيم أي مخرجات HTML (خاصة في تقارير الثغرات).
    *   **HttpOnly Cookie Support**: لن نقوم بتخزين التوكنات في LocalStorage أبدًا.
    *   **Content Security Policy (CSP)**: تكوين صارم لمنع هجمات XSS.

## 4. الجودة والاختبار (Quality Assurance)
*   **Unit Testing**: استخدام `Vitest` لاختبار منطق العمل (Entities & Features).
*   **E2E Testing**: استخدام `Playwright` لمحاكاة سيناريوهات هجوم كاملة من الواجهة.
*   **Clean Code Standards**: تكوين `ESLint` مع قواعد `Airbnb` + `SonarQube` للتحليل الساكن.

## 5. التصميم "الاحترافي" (Professional Aesthetic)
رغم التركيز الهندسي، ستكون الواجهة مذهلة، ولكن بأسلوب "وظيفي" (Functional Aesthetics) مثل أدوات الاستخبارات الحقيقية (Palantir, Maltego):
*   **Data Density**: تصميم يراعي عرض كميات ضخمة من البيانات بوضوح.
*   **Visual Feedback**: مؤشرات دقيقة لكل حالة (Loading, Processing, Success, Failure).
*   **Theming**: نظام تصميمي ذكي يدعم التباين العالي (High Contrast) لسهولة القراءة في البيئات المظلمة.

> [!IMPORTANT]
> **ملاحظة للمستخدم**: هذه الخطة تنقل المشروع من مجرد "شكل جميل" إلى "منصة هندسية متكاملة".

## 6. خطوات التنفيذ التدريجي
1.  **Init**: تهيئة المشروع مع FSD Structure ووأدوات الـ Quality (Husky, Lint-staged).
2.  **Core**: بناء طبقة الـ API والـ Auth (Entities/User, Features/Auth).
3.  **Domain**: بناء وحدات العمل الأساسية (Target Management, Scan Logic).
4.  **Complex UI**: تطوير "Ternimal Widget" باستخدام Web Workers.
5.  **Integration**: ربط الواجهة مع الـ Backend Orchestrator عبر WebSockets أو Polling ذكي.
