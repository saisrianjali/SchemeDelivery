const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: "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" });

async function getChatResponse(message) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": "Please provide your question in any language, and I will respond in the same language, don't you transliteration and only answer to the questions that are related to government applications,schemes and its enquiry,accept greeting messages, else answer them politely that I dont know the answer"
                },
                {
                    "role": "user",
                    "content": message
                }
            ],
            "model": "llama-3.3-70b-versatile",
            "temperature": 1,
            "max_tokens": 6000,
            "top_p": 1,
            "stream": true,
            "stop": null
        });

        let response = '';
        for await (const chunk of chatCompletion) {
            response += chunk.choices[0]?.delta?.content || '';
        }

        return response;
    } catch (error) {
        console.error('Groq API error:', error);
        throw new Error('Unable to fetch response from Groq API');
    }
}

router.post('/', async (req, res) => {
    try {
        const message = req.body.message;
        if (!message) {
            return res.status(400).send({ error: "Message is required." });
        }

        const botResponse = await getChatResponse(message);
        res.send({ message: botResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Something went wrong.' });
    }
});

module.exports = router;
