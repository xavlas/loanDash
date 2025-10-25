import { Hono } from 'hono'

const app = new Hono()

// Stockage en mémoire
const notes = []

app.get('/notes', (c) => c.json(notes))

app.post('/notes', async (c) => {
  const { note } = await c.req.json()
  if (typeof note === 'string' && note.trim()) {
    notes.unshift(note.trim())
    return c.json({ success: true })
  }
  return c.json({ success: false, error: 'Note invalide' }, 400)
})

export default app
