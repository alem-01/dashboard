const robots = {
    UserAgent: '*',
    Disallow: '/'
}

export function get (req, res) {
	res.setHeader('Content-Type', 'text/plain')

  const content = Object.keys(robots)
  .reduce((acc, next) => {
    return acc += `${next}: ${robots[next]}\n`
  }, '')

	res.end(content)
}
