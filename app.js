const path = require('path');
const express = require('express');
const db = require('./utils/sql');
const PORT = process.env.PORT || 5000;

// importing modals

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');

const adminRoutes = require('./router/admin')
const shopRoutes = require('./router/shop')

const errorHandle = require('./controllers/error').errorHandle


// setting up Express app and URLencoding and static directory
app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

// setting up pug template

// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next)=> {
    User.findByPk(1)
    .then(user =>{
        req.user = user;
        next();
    })
    .catch( err => console.log(err))
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorHandle);

// user"marchent" product association
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
// it means a product only belongs to the marchent that created it.
User.hasMany(Product);
// it means a user could relate to or has many products

// user cart association
User.hasOne(Cart);
// user could only has one cart
Cart.belongsTo(User);
// cart could only belong to a user at a time
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
// cart could belongs to many products and vic-versa

// user order association
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem})


// db.sync({force: true})
db.sync()
.then(result => {
    return User.findByPk(1)
})
.then(user => {
    if(!user) {
        return User.create({name: 'Soliman', email: 'm.soliman@gmail.com'})
    }
    return user
})
.then(user => {
    return user.createCart()
})
.then( user => {
    app.listen(PORT);
}).catch( err => {
    console.log(err)
})
