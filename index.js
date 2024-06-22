const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// EJSni view engine sifatida o'rnatish
app.set('view engine', 'ejs');

// Static fayllar uchun papka
app.use(express.static('public'));

// Bosh sahifa
app.get('/', (req, res) => {
    res.render('index');
});

// Mahsulotlar ro'yxati
app.get('/products', (req, res) => {
    fs.readFile('./data/products.json', (err, data) => {
        if (err) throw err;
        const products = JSON.parse(data);
        res.render('products', { products: products });
    });
});

// Mahsulot detallari
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    fs.readFile('./data/products.json', (err, data) => {
        if (err) throw err;
        const products = JSON.parse(data);
        const product = products.find(p => p.id == productId);
        res.render('product', { product: product });
    });
});

app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishga tushdi`);
});
