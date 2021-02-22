const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())
app.use(cors())

const emails = [
	{ from: 'yosi', to: 'test', title: 'hey Test', body: 'blah blah blah' },
	{ from: 'test', to: 'yosi', title: 'hey Yos', body: 'blah blah blah' },
	{ from: 'test', to: 'test', title: 'hey myself', body: 'blah blah blah' },
]

app.get('/secret', vt, (req, res) => {
	console.log(req.user)
	res.json({ msg: 'you got me!', user: req.user })
})

app.get('/inbox', vt, (req, res) => {
	res.json(emails.filter((mail) => mail.to == req.user.user.username))
})

app.get('/sent', vt, (req, res) => {
	res.json(emails.filter((mail) => mail.from == req.user.user.username))
})
app.post('/newmail', vt, (req, res) => {
	const { to, title, body } = req.body
	emails.push({ from: req.user.user.username, to, title, body })
	res.json({ msg: 'created' })
})

function vt(req, res, next) {
	jwt.verify(req.header('Authorization'), 'bLaH', (err, user) => {
		if (err) {
			res.status(401).json({ err })
			throw err
		}
		req.user = user
		next()
	})
}

app.listen(1001, () =>
	console.log('rockin1001, all the rest server is up & running')
)
