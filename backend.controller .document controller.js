const Document = require("../models/Document");
const { Configuration, OpenAIApi } = require("openai");
const translate = require("@vitalets/google-translate-api");
const fs = require("fs");
const pdfParse = require("pdf-parse");

// OpenAI config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Upload and process document
exports.processDocument = async (req, res) => {
  try {
    const file = req.file;
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // Clause simplification using OpenAI GPT
    const simplified = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Simplify legal clauses in plain language." },
        { role: "user", content: text }
      ]
    });

    // Translate if requested
    let translated = simplified.data.choices[0].message.content;
    if (req.body.language && req.body.language !== "en") {
      const translation = await translate(translated, { to: req.body.language });
      translated = translation.text;
    }

    // Risk assessment (mock score)
    const riskScore = Math.floor(Math.random() * 100);

    // Save to DB
    const doc = new Document({
      name: file.originalname,
      content: text,
      simplified: translated,
      language: req.body.language || "en",
      riskScore
    });
    await doc.save();

    res.json({ success: true, document: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all documents
exports.getDocuments = async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 });
  res.json(docs);
};
