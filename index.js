const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// EJSni view engine sifatida o'rnatish
app.set('view engine', 'ejs');

// Static fayllar uchun papka
app.use(express.static('public'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Yangi mahsulot qo'shish formasi
app.get('/add-product', (req, res) => {
    res.render('add-product');
});

// Yangi mahsulot qo'shish
app.post('/add-product', (req, res) => {
    fs.readFile('./data/products.json', (err, data) => {
        if (err) throw err;
        let products = JSON.parse(data);
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            name: req.body.name,
            price: req.body.price
        };
        products.push(newProduct);
        fs.writeFile('./data/products.json', JSON.stringify(products, null, 2), (err) => {
            if (err) throw err;
            res.redirect('/products');
        });
    });
});

app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishga tushdi`);
});
