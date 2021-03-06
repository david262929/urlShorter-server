require('dotenv').config()
const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

const app = express()
app.use(cors())

app.use(express.json({extended: true}))

app.use('/api/auth', require('./src/routes/auth.routes'))
app.use('/api/link', require('./src/routes/link.routes'))
app.use('/t', require('./src/routes/redirect.routes'))

const PORT = process.env.NODE_PORT || 5000

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Dear Developer catched a SERVER ERROR...', e.message, e);
        process.exit(1);
    }
}
run();














