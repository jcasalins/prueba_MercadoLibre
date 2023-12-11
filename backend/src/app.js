import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/api.routes.js'
const app = express()
app.disable('x-powered-by')

const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173']
const corsOrigin = (origin, callback) => {
  if (whitelist.includes(origin)) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}
app.use(
  cors({
    origin: corsOrigin,
    methods: ['GET', 'POST']
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app
