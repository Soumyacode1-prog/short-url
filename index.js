const express = require('express');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const cookieParser=require('cookie-parser');
const{restrictToLoggedinUserOnly,checkAuth}=require('./middlewares/auth')
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute =require('./routes/user');

const path = require('path');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/shorturl')
  .then(() => console.log("Connected to MongoDB"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

  
app.use("/url",restrictToLoggedinUserOnly ,urlRoute);
app.use("/", checkAuth,staticRoute);
app.use("/user",userRoute);



app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// Redirect route (must be before /url)
app.get('/url/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) return res.status(404).send("Short URL not found");

    res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});



app.listen(PORT, () => console.log(`Server running on ${PORT}`));
