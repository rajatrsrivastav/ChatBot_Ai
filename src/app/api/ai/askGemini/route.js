import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set in your .env.local file' },
        { status: 500 }
    );
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(request) {
    try {
        const { message } = await request.json();

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return NextResponse.json({ error: 'Valid message is required' }, { status: 400 });
        }

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });

    } catch (error) {
        console.error('Error generating content from Gemini:', error);
        return NextResponse.json(
            { error: 'Failed to get response from AI. Please check server logs.' },
            { status: 500 }
        );
    }
}