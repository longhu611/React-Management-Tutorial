const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            "id": 1,
            "name": "홍길동",
            "sex": "남",
            "birth": "900116",
            "job": "학생"
        },
        {
            "id": 2,
            "name": "이순신",
            "sex": "남",
            "birth": "160116",
            "job": "장군"
        },
        {
            "id": 3,
            "name": "신사임당",
            "sex": "여",
            "birth": "850116",
            "job": "5만원"
        }
    ]);
})

app.listen(port, () => console.log(`Listening on port ${port}`));