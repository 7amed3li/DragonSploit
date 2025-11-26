import express from 'express';
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Home Page with Login Form (Tests HTML Parameter Discovery)
app.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Welcome to DragonSploit Mock Target</h1>
                <p>This is a simulated vulnerable application.</p>
                
                <h2>Login (POST Injection Test)</h2>
                <form action="/login" method="POST">
                    <label>Username:</label> <input type="text" name="username"><br>
                    <label>Password:</label> <input type="password" name="password"><br>
                    <button type="submit">Login</button>
                </form>

                <h2>Search Products (GET Injection Test)</h2>
                <a href="/rest/products/search?q=apple">Search for Apple</a>
            </body>
        </html>
    `);
});

// 2. Vulnerable Login Endpoint (Tests POST Body Injection)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`[Mock Target] POST /login - User: ${username}, Pass: ${password}`);

    if (username && (username.includes("'") || username.includes("OR"))) {
        if (username.includes("'") && !username.includes("OR")) {
            return res.status(500).send("SQL Syntax Error: You have an error in your SQL syntax near '''");
        }
        if (username.includes("OR '1'='1")) {
            return res.send("<h1>Welcome Admin!</h1><p>Flag: {SQLI_POST_SUCCESS}</p>");
        }
    }
    res.send("Invalid credentials");
});

// 3. Vulnerable JSON API (Tests JSON Injection)
app.post('/api/search', (req, res) => {
    const { query } = req.body;
    console.log(`[Mock Target] POST /api/search - Query: ${query}`);

    if (query && query.includes("'")) {
        return res.status(500).json({ error: "Database error: syntax error at or near \"'\"" });
    }
    res.json({ results: [] });
});

// 4. Vulnerable GET Endpoint (Tests Query Param Injection)
app.get('/rest/products/search', (req, res) => {
    const query = req.query.q || req.query.query || req.query.search || '';
    console.log(`[Mock Target] GET /rest/products/search - Query: ${query}`);

    if (typeof query === 'string' && (query.includes("'") || query.includes("OR"))) {
        if (query.includes("'") && !query.includes("OR")) {
            return res.status(500).send("SQL Syntax Error: You have an error in your SQL syntax near '''");
        }
        if (query.includes("OR '1'='1")) {
            return res.json({
                status: 'success',
                data: [
                    { id: 1, name: 'Admin User', email: 'admin@juice-sh.op', password: 'hashed_password' },
                    { id: 2, name: 'Jim', email: 'jim@juice-sh.op' }
                ]
            });
        }
    }
    res.json({ status: 'success', data: [] });
});

app.listen(port, () => {
    console.log(`🎯 Mock Vulnerable Target running at http://localhost:${port}`);
    console.log(`👉 Home (Forms): http://localhost:${port}/`);
    console.log(`👉 API (JSON):   http://localhost:${port}/api/search`);
});
