const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json({extended: true}))
const PORT = process.env.NODE_PORT || 5000

async function run() {
    try {

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Dear Developer catched a SERVER ERROR...', e.message, e);
        process.exit(1);
    }
}
run();














