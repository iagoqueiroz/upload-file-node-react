const express = require("express");
const routes = express.Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const File = require("./models/File");

const upload = multer(multerConfig);

routes.post("/files", upload.single("file"), async (req, res) => {
  console.log(req.file);

  const { filename: name, size, originalname } = req.file;

  const file = await File.create({
    name,
    originalName: originalname,
    size,
    url: `http://localhost:3000/uploads/${name}`,
  });

  return res.json(file);
});

routes.get("/files", async (req, res) => {
  const files = await File.findAll();

  return res.json(files);
});

routes.delete("/files/:id", async (req, res) => {
  const file = await File.findByPk(req.params.id);

  if (file === null) {
    return res.json({ error: "File not found" });
  }

  file.destroy();

  return res.json({ message: "File deleted successfully" });
});

module.exports = routes;
