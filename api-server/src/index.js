import { Hono } from 'hono'

const app = new Hono()

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
