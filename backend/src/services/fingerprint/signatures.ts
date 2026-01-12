/**
 * 🐉 DRAGON-EYE SIGNATURES DATABASE 🕵️‍♂️
 * 
 * Passive Intelligence Signatures for web technology detection.
 * Separated from logic for easier updates and maintenance.
 * 
 * Structure:
 * - Cookies: Detect backend via session structure
 * - Headers: Detect server/framework via HTTP headers
 * - HTML: (Future) Detect via meta tags or scripts
 * - Errors: Active error patterns (The "Active" component)
 */

export interface TechSignature {
    lang?: string | undefined;
    db?: string | undefined;
    server?: string | undefined;
    confidence?: number; // 0-100
    description?: string;
}

export interface TechSignatures {
    cookies: Record<string, TechSignature>;
    headers: {
        'x-powered-by': Record<string, TechSignature>;
        'server': Record<string, TechSignature>;
        'via'?: Record<string, TechSignature>;
        'x-aspnet-version'?: Record<string, TechSignature>;
    };
    errors: { sig: string; db: string; confidence: number; }[];
}

export const DRAGON_SIGNATURES: TechSignatures = {
    cookies: {
        'phpsessid': { lang: 'PHP', db: 'MySQL', confidence: 80 },
        'laravel_session': { lang: 'PHP (Laravel)', db: 'MySQL', confidence: 95 },
        'x-magento-vary': { lang: 'PHP (Magento)', db: 'MySQL', confidence: 95 },
        'wp-settings': { lang: 'PHP (WordPress)', db: 'MySQL', confidence: 95 },
        'jsessionid': { lang: 'Java', db: 'Oracle', confidence: 70 },
        'grails_remember_me': { lang: 'Java (Grails)', db: 'H2', confidence: 90 },
        'play_session': { lang: 'Java/Scala (Play)', db: 'PostgreSQL', confidence: 85 },
        'asp.net_sessionid': { lang: 'ASP.NET', server: 'IIS', db: 'MSSQL', confidence: 95 },
        '__requestverificationtoken': { lang: 'ASP.NET (MVC)', server: 'IIS', db: 'MSSQL', confidence: 90 },
        'connect.sid': { lang: 'Node.js (Express)', db: 'MongoDB', confidence: 60 }, // Generic, but often Mongo
        'sails.sid': { lang: 'Node.js (Sails)', db: 'PostgreSQL', confidence: 90 },
        'csrftoken': { lang: 'Python (Django)', db: 'PostgreSQL', confidence: 80 },
        'sessionid': { lang: 'Python (Django)', db: 'PostgreSQL', confidence: 80 },
        'flask-session': { lang: 'Python (Flask)', db: 'SQLite', confidence: 85 },
        '_rail_session': { lang: 'Ruby on Rails', db: 'PostgreSQL', confidence: 95 },
        'rack.session': { lang: 'Ruby (Rack)', db: 'PostgreSQL', confidence: 85 },
        'ci_session': { lang: 'PHP (CodeIgniter)', db: 'MySQL', confidence: 90 },
        'io': { lang: 'Node.js (Socket.io)', confidence: 70 },
        'meteor_login_token': { lang: 'Node.js (Meteor)', db: 'MongoDB', confidence: 95 },
    },
    headers: {
        'x-powered-by': {
            'express': { lang: 'Node.js (Express)', confidence: 90 },
            'asp.net': { lang: 'ASP.NET', server: 'IIS', db: 'MSSQL', confidence: 95 },
            'php': { lang: 'PHP', confidence: 90 },
            'java': { lang: 'Java', confidence: 80 },
            'jboss': { lang: 'Java (JBoss)', confidence: 90 },
            'next.js': { lang: 'Node.js (Next.js)', confidence: 95 },
            'sails': { lang: 'Node.js (Sails)', confidence: 90 },
        },
        'server': {
            'apache': { server: 'Apache', lang: 'PHP', confidence: 70 },
            'nginx': { server: 'Nginx', confidence: 60 },
            'iis': { server: 'IIS', lang: 'ASP.NET', db: 'MSSQL', confidence: 95 },
            'gunicorn': { lang: 'Python', server: 'Gunicorn', confidence: 90 },
            'kestrel': { server: 'Kestrel', lang: 'ASP.NET Core', confidence: 95 },
            'jetty': { server: 'Jetty', lang: 'Java', confidence: 90 },
            'tomcat': { server: 'Tomcat', lang: 'Java', confidence: 90 },
            'cloudflare': { server: 'Cloudflare (WAF)', confidence: 100 },
            'glassfish': { server: 'GlassFish', lang: 'Java', confidence: 95 },
            'cowboy': { lang: 'Erlang (Cowboy)', confidence: 95 },
        }
    },
    errors: [
        { sig: 'You have an error in your SQL syntax', db: 'MySQL', confidence: 100 },
        { sig: 'Warning: mysql_', db: 'MySQL', confidence: 100 },
        { sig: 'unclosed quotation mark after the character string', db: 'MSSQL', confidence: 100 },
        { sig: 'Microsoft OLE DB Provider for SQL Server', db: 'MSSQL', confidence: 100 },
        { sig: 'syntax error at or near', db: 'PostgreSQL', confidence: 100 },
        { sig: 'PostgreSQL query failed:', db: 'PostgreSQL', confidence: 100 },
        { sig: 'ORA-', db: 'Oracle', confidence: 100 },
        { sig: 'SQL command not properly ended', db: 'Oracle', confidence: 100 },
        { sig: 'SQLite Error', db: 'SQLite', confidence: 100 },
        { sig: 'unrecognized token:', db: 'SQLite', confidence: 100 },
        { sig: 'CLI Driver', db: 'DB2', confidence: 100 },
        { sig: 'Microsoft Jet Database Engine', db: 'Access', confidence: 100 },
        { sig: 'MongoError', db: 'MongoDB', confidence: 100 },
        { sig: 'Cast to ObjectId failed', db: 'MongoDB', confidence: 95 },
        { sig: 'Redis::CommandError', db: 'Redis', confidence: 100 },
    ]
};
