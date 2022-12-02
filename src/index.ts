import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'

app.listen(9999, () => {
  console.log('Server listening on port 9999')
})
