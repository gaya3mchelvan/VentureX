/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, GenerateContentParameters } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function runAgent(systemPrompt: string, userPrompt: string, tools?: any, responseMimeType?: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing. Please configure it in your secrets.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
        topP: 0.95,
        responseMimeType,
      },
      tools,
    } as any);

    return response.text;
  } catch (error) {
    console.error("Agent Execution Error:", error);
    throw error;
  }
}
