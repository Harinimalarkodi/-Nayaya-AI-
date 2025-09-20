const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { processDocument, getDocuments } = require("../controllers/documentController");

router.post("/upload", upload.single("file"), processDocument);
router.get("/documents", getDocuments);

module.exports = router;
