// src/worker/jobs/sqli/signatures.ts

export const SQLI_SIGNATURES_DICTIONARY = {
    // ====================================================================================
    // 💡 الفئة 1-3: توقيعات SQLite الأساسية - عالية ومتوسطة الثقة وأخطاء الـ Wrappers
    //    (Core SQLite - High/Medium Confidence & Host Language Wrappers)
    // ====================================================================================
    
    "SQLITE_CORE_HIGH_CONFIDENCE": [
      "unrecognized token:",
      "near \".\": syntax error",
      "near \"(\": syntax error",
      "sql error or missing database",
      "syntax error",
      "no such function:",
      "misuse of aggregate function"
    ],
    
    "SQLITE_CORE_MEDIUM_CONFIDENCE": [
      "no such table:",
      "no such column:",
      "datatype mismatch",
      "constraint failed",
      "too many terms in compound select"
    ],
    
    "SQLITE_HOST_WRAPPER_ERRORS": [
      "SQLITE_CONSTRAINT",
      "invalid number of bindings",
      "database is locked",
      "sqlite3.OperationalError",
      "PDOException: SQLSTATE"
    ],
    
    // ====================================================================================
    // 💡 الفئة 5-6: توقيعات SQLite المتقدمة وأخطاء نظام الملفات
    //    (Advanced SQLite & File System Errors)
    // ====================================================================================
    
    "SQLITE_ADVANCED_FUNCTIONS_ERRORS": [
      "window functions are not supported",
      "incorrect number of arguments to function",
      "result of subquery is not a single row",
      "cannot VACUUM from within a transaction"
    ],
    
    "SQLITE_FILE_SYSTEM_ERRORS": [
      "unable to open database file",
      "disk I/O error",
      "database is read-only",
      "not a database"
    ],
    
    // ====================================================================================
    // 💡 الفئة 9-11: توقيعات SQLite الأكثر تخصصًا وقيود النظام
    //    (SQLite Niche & System Constraint Errors)
    // ====================================================================================
    
    "SQLITE_PRAGMA_METADATA_FAILURES": [
      "cannot change schema of table",
      "no such pragma:",
      "table sqlite_master may not be modified",
      "cannot convert text to integer",
      "cannot convert blob to text"
    ],
    
    "SQLITE_SYSTEM_CONSTRAINT_ERRORS": [
      "maximum statement length exceeded",
      "recursive trigger too deep",
      "authorization denied"
    ],
    
    // ====================================================================================
    // 💡 الفئة 4، 7، 12: توقيعات اللغات المتعددة (Multi-Lingual Signatures)
    // ====================================================================================
    
    "SQLITE_MULTI_LINGUAL_SIGNATURES": [
      // German (الألمانية)
      "fehler in der sql-syntax",
      "keine solche tabelle:",
      // Russian (الروسية)
      "ошибка синтаксиса",
      "нет такой таблицы",
      // Chinese (Simplified) (الصينية المبسطة)
      "语法错误",
      "无此表",
      // Spanish (الإسبانية)
      "error de sintaxis sql",
      "no existe la tabla:",
      // Arabic (العربية)
      "خطأ في بناء جملة sql",
      "لا يوجد جدول بهذا الاسم:",
      // French (الفرنسية)
      "erreur de syntaxe sql",
      "aucune table de ce nom:",
      // Japanese (اليابانية)
      "構文エラー",
      "そのようなテーブルはありません:",
      // Portuguese (البرتغالية)
      "erro de sintaxe sql",
      "tabela inexistente:"
    ],
    
    // ====================================================================================
    // 💡 الفئة 13-16: توقيعات قواعد البيانات الشاملة (Universal Database Signatures)
    //    (MySQL, PostgreSQL, MSSQL, NoSQL)
    // ====================================================================================
    
    "MYSQL_ERROR_BASED_SIGNATURES": [
      "XPATH syntax error",
      "Duplicate entry",
      "You have an error in your SQL syntax",
      "Division by zero"
    ],
    
    "POSTGRESQL_ERROR_BASED_SIGNATURES": [
      "invalid input value for enum",
      "syntax error at or near",
      "relation \"...\" does not exist",
      "could not serialize access"
    ],
    
    "MSSQL_ERROR_BASED_SIGNATURES": [
      "The conversion of a",
      "Unclosed quotation mark",
      "Syntax error near",
      "XML parsing error"
    ],
    
    "NOSQL_INJECTION_ERRORS": [
      "BSON: bad type",
      "SyntaxError: Unexpected token",
      "Error: EPIPE"
    ],
    
    // ====================================================================================
    // 💡 الفئة 17: حمولات الحقن المعتمدة على الزمن والمنطق (Blind SQLi Payloads)
    //    (Time-Based & Boolean-Based Payloads)
    // ====================================================================================
    
    "SQLITE_TIME_BASED_CORE_FUNCTIONS": [
      "sqlite_sleep(S)",
      "CAST(ABS(RANDOM()) AS INT) (Complex Math)",
      "LIKE with large input/JOINs"
    ],
    
    "SQLITE_BOOLEAN_BASED_CORE_TECHNIQUES": [
      "CASE WHEN (condition) THEN 1 ELSE 0 END",
      "EXISTS(SELECT 1 WHERE condition)"
    ]
};

// إنشاء وتصدير مصفوفة مجمعة للفحص السريع
export const ALL_SQL_ERROR_SIGNATURES: string[] = [
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_CORE_HIGH_CONFIDENCE,
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_CORE_MEDIUM_CONFIDENCE,
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_HOST_WRAPPER_ERRORS,
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_ADVANCED_FUNCTIONS_ERRORS,
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_FILE_SYSTEM_ERRORS,
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_PRAGMA_METADATA_FAILURES,
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_SYSTEM_CONSTRAINT_ERRORS,
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_MULTI_LINGUAL_SIGNATURES,
    ...SQLI_SIGNATURES_DICTIONARY.MYSQL_ERROR_BASED_SIGNATURES,
    ...SQLI_SIGNATURES_DICTIONARY.POSTGRESQL_ERROR_BASED_SIGNATURES,
    ...SQLI_SIGNATURES_DICTIONARY.MSSQL_ERROR_BASED_SIGNATURES,
    ...SQLI_SIGNATURES_DICTIONARY.NOSQL_INJECTION_ERRORS,
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_TIME_BASED_CORE_FUNCTIONS,
    ...SQLI_SIGNATURES_DICTIONARY.SQLITE_BOOLEAN_BASED_CORE_TECHNIQUES,
].map(s => s.toLowerCase());