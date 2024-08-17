const express = require('express');
const os = require('os');
const app = express();
app.use('/',async (req, res) => {
    console.log(`Im in the server ${os.hostname()}`);
    res.json({message: `Response:${os.hostname()}!`});
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
