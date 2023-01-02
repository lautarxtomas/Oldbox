import express from 'express';

const app = express()

app.get('/users', (req, res) => {
    res.json({
        data: "Lionel Andrés Messi"
    })
})

app.listen(8080, function() {
    console.log('Node server is running on port 8080')
});

