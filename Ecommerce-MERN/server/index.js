const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const adminRoutes = require("./routes/admin");
// Cloudinary (optional): used for image uploads and transformations
const { v2: cloudinary } = require("cloudinary");

const app = express();
const PORT = process.env.PORT || 8000;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://vikeshramesh1:vikesh@cluster0.mqjh8.mongodb.net/Ecommerce?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log(`--DB connected--`);
});

// Configure Cloudinary from environment variables
// Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in your environment.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dpgtq9x7p",
  api_key: process.env.CLOUDINARY_API_KEY || "682196242583675",
  api_secret: process.env.CLOUDINARY_API_SECRET || "6mjO1w3ROcoIN8Xqy6qMaPcccUU",
});

// Example helper: async upload function (will not run automatically)
async function exampleUpload() {
  if (!process.env.ENABLE_CLOUDINARY_EXAMPLE) return;
  try {
    const uploadResult = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      { public_id: "shoes_example" }
    );
    console.log("Cloudinary upload result:", uploadResult.public_id);

    const optimized = cloudinary.url("shoes_example", { fetch_format: "auto", quality: "auto" });
    console.log("Optimized URL:", optimized);
  } catch (err) {
    console.error("Cloudinary example upload failed:", err.message);
  }
}

// Call the example only when explicitly enabled by env var
exampleUpload();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// CORS configuration for multiple environments
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.FRONTEND_URL 
      ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
      : ['http://localhost:3000', 'http://localhost:3001', 'https://navathaniya.vercel.app', 'https://navathaniya.onrender.com'];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, (error) => {
  if (error) {
    console.log(`--Error in starting the server-- ${error}`);
    return;
  }
  console.log(`--Server is up and running on ${PORT} --`);
});
