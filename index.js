// BASE SETUP
// =============================================================================

const server = require('./api/server.js');

const port = process.env.PORT || 8080;        // set our port

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});