const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const { GridFSBucket } = require("mongodb");
const path = require("path");

const app = express();
const PORT = 5005;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = "mongodb+srv://techno:techno12@blogstorage.lh2j9.mongodb.net/";
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfsBucket;
conn.once("open", () => {
  gfsBucket = new GridFSBucket(conn.db, { bucketName: "uploads" });
  console.log("GridFS Bucket initialized");
});

// Multer Configuration for Image Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageId: mongoose.Types.ObjectId, // Store reference to image in GridFS
});

const Blog = mongoose.model("Blog", blogSchema);

// Add a new blog
app.post("/blogs", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const { buffer, originalname, mimetype } = req.file;

    if (!buffer) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Store image in GridFSBucket
    const uploadStream = gfsBucket.openUploadStream(originalname, { contentType: mimetype });
    uploadStream.end(buffer);

    uploadStream.on("finish", async (file) => {
      const blog = new Blog({
        title,
        content,
        imageId: file._id, // Store image ID reference
      });

      await blog.save();
      res.status(201).json(blog);
    });

  } catch (err) {
    console.error("Error uploading blog:", err);
    res.status(500).send(err.message);
  }
});

// Get all blogs with image URLs
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    const formattedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      imageUrl: `http://localhost:5000/image/${blog.imageId}`, // Serve image via API
    }));

    res.json(formattedBlogs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Serve images from GridFSBucket
app.get("/image/:id", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const downloadStream = gfsBucket.openDownloadStream(fileId);
    downloadStream.on("error", () => res.status(404).json({ error: "Image not found" }));

    res.set("Content-Type", "image/jpeg");
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving image" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
