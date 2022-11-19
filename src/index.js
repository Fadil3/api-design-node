const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Hello World' }))

    res.end()
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Not Found' }))
})

const PORT = process.env.PORT || 9999

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
