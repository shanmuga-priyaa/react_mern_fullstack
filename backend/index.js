const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
app.use(express.json());
app.use(cors());


//Database Connection with MongoDB
mongoose.connect("mongodb+srv://shanmu:1234@cluster0.h9832.mongodb.net/e-commerce")

//API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}` )
    }
})
const upload = multer({storage: storage})

//creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    
    })
})

//schema for Cretating Products
const product = mongoose.model("product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    avilable:{
        type: Boolean,
        default: true,
    },
})

app.post("/addproduct", async(req, res) => {
    let products = await product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const newproduct = new product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(newproduct);
    await newproduct.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// creating api for deleting products
app.post('/removeproduct', async(req, res) => {
    await product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating api for getting all products
app.get('/allproducts',async(req, res) => {
    let products = await product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

//schema creating for user model
const Users = mongoose.model("Users",{
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating endpoint for registering user
app.post('/signup', async (req, res) => {
    console.log("Requested Body: ", req.body);
    let check = await Users.findOne({ email: req.body.email });
    if (check) {

        console.log("User already exists:", req.body.email);
        return res.status(400).json({ success: false, error: "existing user found with same email address" });
    } else {
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            name: req.body.username, // corrected from 'usename' to 'username'
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();
        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } // Added this closing brace for the else block
}); 


// creating endpoint for login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user){
    const passCompare = req.body.password === user.password;
     if (passCompare) {
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    }
    else{
        res.json({ success: false, error: "Wrong Password" });
    }
  }
  else{
    res.json({ success: false, error: "Wroung Email Id" });
  }

}) 

//creating endpoint for newcollection data
app.get('/newcollections', async(req, res) => {
    let products = await product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);    
})

//creating endpoint for popular in women section
app.get('/popularinwomen', async(req, res) => {
   let products = await product.find({category:"women"});
   let popular_in_women = products.slice(0,4);
   console.log("Popular In Women Fetched");
   res.send(popular_in_women);
})

//creating middleware for fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"Please authenticate using a valid token"});
}
else{
    try{
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).send({errors:"Please authenticate using a valid token"});
    }
}
}

//creating endpoint for adding to cart
app.post('/addtocart',fetchUser, async(req, res) => {
    console.log("added",req.body.itemId)
   let userData = await Users.findOne({ _id: req.user.id });
   userData.cartData[req.body.itemId] += 1;
   await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
   res.send("Added");

})

// creating endpoint for removing from cart data
app.post('/removefromcart',fetchUser, async(req, res) => {
    console.log("removed",req.body.itemId)
    let userData = await Users.findOne({ _id: req.user.id });
    if(userData.cartData[req.body.itemId]>0)    
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
    res.send("Removed");
})

//creating endpoint to get cart data
app.post('/getcart',fetchUser, async(req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if(!error){
        console.log("Server is Successfully Running " + port);
    }
    else{
        console.log("Error Occured, Server is not Running" + error);
    }
    
})