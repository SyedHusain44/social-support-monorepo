import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";
import rateLimit from "express-rate-limit";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const responseCache = new Map();

const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 5 requests per windowMs
  message: { error: "Rate limit exceeded. Please try again latervvv." },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

app.post("/api/chat", chatLimiter, async (req, res) => {
  try {
    const { fieldName, formData } = req.body;

    if (!fieldName || !formData) {
      return res.status(400).json({ error: "Missing fieldName or formData" });
    }

    const { employmentStatus, monthlyIncome, dependents } = formData;

    const prompts = {
      financialSituation: `Describe my financial situation: ${employmentStatus || 'unemployed'}, income ${monthlyIncome || 0}, ${dependents || 0} dependents.`,
      employmentCircumstances: `Describe my employment situation: ${employmentStatus || 'unemployed'}.`,
      reasonForApplying: `Explain why I need financial help: income ${monthlyIncome || 0}, ${dependents || 0} dependents.`
    };
    const prompt = prompts[fieldName] || "Write a short note for a financial aid form.";

    const cacheKey = `${fieldName}_${JSON.stringify(formData)}`;
    if (responseCache.has(cacheKey)) {
      return res.json({ reply: responseCache.get(cacheKey), cached: true });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You write short, formal 2-sentence summaries for government aid applications.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 80,
      temperature: 0.6,
    });

    const reply = completion.choices[0].message.content.trim();
    responseCache.set(cacheKey, reply);

    res.json({ reply, cached: false });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
});

app.listen(8080, "0.0.0.0", () => {
  console.log("Server running on port 8080");
});