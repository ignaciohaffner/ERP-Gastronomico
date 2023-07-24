import app from './app.js'
import { connectdb } from './db.js'

connectdb()
app.listen(4000)
console.log('Server on port', 4000)
console.log('a ver si anda esta basura')
