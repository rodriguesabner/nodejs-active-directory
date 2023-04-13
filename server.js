const app = require('./src/app');
const port = process.env.PORT || 21300;

app.listen(port, () => {
    console.log("Success! Port: ", port);
})
