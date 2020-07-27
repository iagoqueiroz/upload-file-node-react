const express = require("express");
const routes = express.Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const File = require("./models/File");

const upload = multer(multerConfig);

routes.post("/file/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);

  const { filename: name, size } = req.file;

  const file = await File.create({ name, size, url: `/uploads/${name}` });

  return res.json(file);
});

routes.get("/files", async (req, res) => {
  const files = await File.findAll();

  return res.json(files);
});

module.exports = routes;
