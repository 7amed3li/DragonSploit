// src/worker/signatures.ts

/**
 * قاموس بصمات الأخطاء المركزي لمنصة DragonSploit.
 * هذا الملف هو "ترسانة الأسلحة" التي يستخدمها العمال المتخصصون.
 * تم تجميعه بناءً على بحث استخباراتي شامل.
 *
 * @version 1.0.0
 * @author DragonSploit Team (Hamed & Manus)
 */

// ====================================================================================
// データベース署名 (Database Signatures)
// ====================================================================================

/**
 * تجميع شامل لكل بصمات أخطاء SQLite المعروفة.
 */
export const SQLITE_ERROR_SIGNATURES: string[] = [
  // High-Confidence
  "unrecognized token:", "near \".\": syntax error", "near \"(\": syntax error", "sql error or missing database", "syntax error", "no such function:", "misuse of aggregate function",
  // Medium-Confidence
  "no such table:", "no such column:", "datatype mismatch", "constraint failed", "too many terms in compound select",
  // Host Language Wrappers
  "SQLITE_CONSTRAINT", "invalid number of bindings", "database is locked", "sqlite3.OperationalError", "PDOException: SQLSTATE",
  // Advanced & File System
  "window functions are not supported", "incorrect number of arguments to function", "result of subquery is not a single row", "cannot VACUUM from within a transaction", "unable to open database file", "disk I/O error", "database is read-only", "not a database",
  // Niche & System Constraints
  "cannot change schema of table", "no such pragma:", "table sqlite_master may not be modified", "cannot convert text to integer", "cannot convert blob to text", "maximum statement length exceeded", "recursive trigger too deep", "authorization denied",
];

/**
 * بصمات أخطاء MySQL و MariaDB.
 */
export const MYSQL_ERROR_SIGNATURES: string[] = [
  "XPATH syntax error",
  "Duplicate entry",
  "You have an error in your SQL syntax",
  "Division by zero",
  "Illegal mix of collations",
  "supplied argument is not a valid MySQL result",
];

/**
 * بصمات أخطاء PostgreSQL.
 */
export const POSTGRESQL_ERROR_SIGNATURES: string[] = [
  "invalid input value for enum",
  "syntax error at or near",
  "relation \"...\" does not exist", // The '...' is a placeholder, but the phrase is key
  "relation does not exist",
  "could not serialize access",
  "invalid input syntax for type",
  "pg_query()",
];

/**
 * بصمات أخطاء Microsoft SQL Server (MSSQL).
 */
export const MSSQL_ERROR_SIGNATURES: string[] = [
  "The conversion of a",
  "Unclosed quotation mark",
  "Syntax error near",
  "XML parsing error",
  "An expression of non-boolean type specified in a context where a condition is expected",
];

/**
 * بصمات أخطاء NoSQL Injection (خاصة MongoDB).
 */
export const NOSQL_INJECTION_SIGNATURES: string[] = [
  "BSON: bad type",
  "SyntaxError: Unexpected token", // Can be generic JS, but common in NoSQL context
  "Error: EPIPE",
  "argument must be a string", // Common in Node.js MongoDB drivers
];


// ====================================================================================
// توقيعات متعددة اللغات (Multi-Lingual Signatures)
// ====================================================================================

/**
 * بصمات أخطاء SQL شائعة بلغات مختلفة.
 */
export const MULTI_LINGUAL_SQL_SIGNATURES: Record<string, string[]> = {
  de: [ // German
    "fehler in der sql-syntax",
    "keine solche tabelle:",
  ],
  ru: [ // Russian
    "ошибка синтаксиса",
    "нет такой таблицы",
  ],
  zh: [ // Chinese (Simplified)
    "语法错误",
    "无此表",
  ],
  es: [ // Spanish
    "error de sintaxis sql",
    "no existe la tabla:",
  ],
  ar: [ // Arabic
    "خطأ في بناء جملة sql",
    "لا يوجد جدول بهذا الاسم:",
  ],
  fr: [ // French
    "erreur de syntaxe sql",
    "aucune table de ce nom:",
  ],
  ja: [ // Japanese
    "構文エラー",
    "そのようなテーブルはありません:",
  ],
  pt: [ // Portuguese
    "erro de sintaxe sql",
    "tabela inexistente:",
  ],
};

// ====================================================================================
// تجميع شامل للاستخدام في العامل الحالي
// ====================================================================================

/**
 * مصفوفة شاملة تجمع كل بصمات SQL المعروفة (باستثناء NoSQL) للاستخدام العام.
 * في المستقبل، يمكن للعامل الذكي اختيار القائمة المناسبة بناءً على بصمة التكنولوجيا.
 */
export const ALL_SQL_ERROR_SIGNATURES: string[] = [
  ...SQLITE_ERROR_SIGNATURES,
  ...MYSQL_ERROR_SIGNATURES,
  ...POSTGRESQL_ERROR_SIGNATURES,
  ...MSSQL_ERROR_SIGNATURES,
  // دمج كل البصمات متعددة اللغات في مصفوفة واحدة
  ...Object.values(MULTI_LINGUAL_SQL_SIGNATURES).flat(),
];
