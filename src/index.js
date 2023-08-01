import app from './app.js'
import { connectdb } from './db.js'

connectdb()

const port = process.env.PORT ?? 4000;
console.log('Server on port', port)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});