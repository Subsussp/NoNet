require('dotenv').config(); // MUST be first

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const router = require("./src/routes handler/root.js");
const urouter = require("./src/routes handler/user.js");
const cartrouter = require("./src/routes handler/cart.js");
const adminro = require("./src/routes handler/admin.js");
const OrderRout = require("./src/routes handler/Order.js");

const redis = require("./src/connections/redis.js");
const connect = require("./src/connections/dbconnect.js");

const { isAdmin, isAuth } = require("./src/utils/authunitace.js");

const items = require("./src/models/items.js");
const Catg = require("./src/models/Catg.js");

const app = express();
const PORT = process.env.PORT || 3000;

/* ================== TRUST PROXY ================== */
app.set("trust proxy", 1);

/* ================== SESSION ================== */
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 90,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    },
  })
);

/* ================== CORS ================== */
const allowedOrigins = [
  process.env.FRURL,
  "https://subsussp.github.io",
  "https://subsussp.github.io/NoNet",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ================== BODY PARSING ================== */
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

/* ================== CLOUDINARY ================== */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

/* ================== ROUTES ================== */
app.use("/", urouter);
app.use("/items", router);
app.use("/admin", isAuth, isAdmin, adminro);
app.use("/cart", cartrouter);
app.use("/order", isAuth, OrderRout);

app.get("/catg", async (req, res) => {
  const catgs = await Catg.find({});
  res.json(catgs[0]?.Catgs || []);
});

/* ================== REDIS CACHE (SAFE) ================== */
async function cacheItems() {
  const data = await items.find({});
  const cached = await redis.get("items");

  if (cached !== JSON.stringify(data)) {
    await redis.setEx("items", 60 * 60 * 24, JSON.stringify(data));
  }
}

/* ================== START SERVER ================== */
app.listen(PORT, async () => {
  try {
    await connect();
    await redis.connect();

    // Cache every 10 minutes (NOT every second)
    setInterval(cacheItems, 1000 * 60 * 10);

    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
});app.use(sessionmidm)
app.use('/', urouter)
app.get('/auth/callback',async function (req,res){
  res.send('Sent')
} )
app.route('/photos').post(async function (req,res){
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, upload_preset: "ml_default" },
    "a2u3COUnO-zRi0aSVbpU5bRw9uI"
  );

  res.json({ timestamp, signature });
}).delete(async function (req,res){
  const { imageUrl , index ,itemId} = req.body;
  const item = await items.findById(itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });
  if (index < 0 || index >= item.img.length) {
    return res.status(400).json({ message: "Invalid image index" });
  }
  const publicId = imageUrl.split("/").pop().split(".")[0]; // Extracts the filename
  await cloudinary.uploader.destroy(publicId).then((res)=>console.log('photo deleted' + JSON.stringify(res, null, 2)));
  item.img.splice(index, 1);
  await item.save();

  res.sendStatus(200);

})
app.get('/catg',async function (req,res){
  let catgs = await Catg.find({})
  res.json(catgs[0].Catgs)
}).post('/add-catg',async function (req,res) {
  let catg = req.body.data
  try{
    await Catg.findOneAndUpdate({name:'Catgs'},{$set:{Catgs:catg}})
    res.send(201)
  }catch(error){
    res.send(404)
  }
})
app.use('/items',router)
app.use('/admin',isAuth,isAdmin,adminro)
app.use('/cart', cartrouter)
app.use('/order',isAuth,OrderRout)
async function inter(){ 
  let string = await items.find({})
  if (redis.get('data') !== JSON.stringify(string)){
    return redis.setEx('data', (60 * 60 * 48) ,JSON.stringify(string))
  }
}
 
setInterval(inter,1000)
module.exports={store}
app.listen(PORT, async function () {
  try {
    await connect();
    await redis.connect()
    console.log("Running");
  } catch (err) {
    console.log("Error: " + err);
  }
});
