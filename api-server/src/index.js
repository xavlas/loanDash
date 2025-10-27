import { Hono } from 'hono'

const app = new Hono()

// Middleware CORS personnalisé
app.use('*', async (c, next) => {
  // Récupérer l'origine de la requête
  const origin = c.req.header('Origin')
  const allowedOrigins = [
    'https://loandash.pages.dev',
    'http://localhost:5173'  // Pour le développement local
  ]
  
  // Vérifier si l'origine est autorisée
  if (origin && allowedOrigins.includes(origin)) {
    c.header('Access-Control-Allow-Origin', origin)
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    c.header('Access-Control-Max-Age', '86400')
    c.header('Access-Control-Allow-Credentials', 'true')
  }

  // Gérer les requêtes OPTIONS (preflight)
  if (c.req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: c.res.headers
    })
  }

  await next()
})

// Route santé
app.get('/api/health', (c) => c.json({ status: 'OK', message: 'API Hono fonctionne', timestamp: new Date().toISOString() }))

// Login (exemple minimal)
app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json()
  if (email === 'test@test.com' && password === 'test') {
    return c.json({ message: 'Connexion réussie', token: 'demo-token', user: { email } })
  }
  return c.json({ error: 'Identifiants invalides' }, 401)
})

// Register (exemple minimal)
app.post('/api/auth/register', async (c) => {
  const { email, password, firstName, lastName } = await c.req.json()
  // Ici, tu pourrais ajouter la logique d'enregistrement
  return c.json({ message: 'Inscription réussie', token: 'demo-token', user: { email, firstName, lastName } }, 201)
})

// Profile (exemple protégé, token fictif)
app.get('/api/user/profile', (c) => {
  const auth = c.req.header('authorization')
  if (auth === 'Bearer demo-token') {
    return c.json({ user: { email: 'test@test.com', firstName: 'Test', lastName: 'User' } })
  }
  return c.json({ error: 'Non authentifié' }, 401)
})

export default app
