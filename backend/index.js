const express= require("express");
const app= express();
require('dotenv').config();
const mongoose= require("mongoose");
const { holding } = require("./model/HoldingsModel.js");
const { position } = require("./model/PositionModel.js");
const cors= require("cors");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");
const {user}= require("./model/UserModel.js");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./middleware/authMiddleware.js");
const PORT= process.env.PORT || 3002;
const url= process.env.MONGO_URL;

app.listen(PORT, ()=>{
    console.log("Server Started");
});

mongoose.connect(url).then(()=>{
    console.log("Db Connected");
});


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


app.get("/allHoldings", verifyToken, async (req, res) => {
  console.log("AllHoldings")
  let allHoldings = await holding.find({});
  // console.log(allHoldings);
  res.json(allHoldings);
});

app.get("/allPositions", verifyToken, async (req, res) => {
  let allPositions = await position.find({});
  // console.log(allPositions);
  res.json(allPositions);
});

app.post("/signup", async (req, res)=>{
    const {username, email, password}= req.body;

    try{
        let existingUser= await user.findOne({$or: [{email}, {username}]});
        if(existingUser) {
            return res.status(400).json({msg:"User already exists"});
        }
        let hashedPass=await bcrypt.hash(password, 8);
        let newUser= new user({
            username: username,
            email: email,
            password: hashedPass,
        });
        await newUser.save();
        res.status(201).json({msg: "Signup successful"})
    }catch(err){
        res.status(500).json({ msg: "Signup failed", error: err.message });
    }
});

app.post("/login", async (req, res)=>{
    const {username, password}= req.body;

    try {
      const existingUser = await user.findOne({ username });
      if (!existingUser) {
        return res.status(404).json({ msg: "User Not Found" });
      }

      const passMatch = await bcrypt.compare(password, existingUser.password);
      if (!passMatch) {
        return res.status(401).json({ msg: "Invalid Username or Password" });
      }

      const token = jwt.sign(
        { id: existingUser._id, username: existingUser.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite:"lax",
        maxAge: 3600000,
      })

      res.status(200).json({ msg: "LogIn Successful"});
    } catch (err) {
      res.status(500).json({ msg: "Login failed", error: err.message });
    }   
});

app.get("/me", verifyToken, async (req, res) => {
  try {
    const currUser = await user.findById(req.user.id).select("-password");
    if (!currUser) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    res.json(currUser);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch user", error: err.message });
  }
});

app.post("/logout", (req, res)=>{
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ msg: "Logged out successfully" });
})