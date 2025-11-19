////////////////////////////////////////////////////////////////////////////////
//
// @file          src/services/geminiService.ts
// @description   Gemini API integration for scholarly Egyptian translations and Speech
// @project       exhibitron
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.4.0
// @license       MIT
// @tags          gemini, ai, service, tts, quiz, vision
// @dependencies  @google/genai
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.4.0  (2025-11-18)  Added image analysis using gemini-3-pro-preview for assignments and translation
// 1.3.0  (2025-11-18)  Removed "Say clearly" preamble from TTS prompt for cleaner audio
// 1.2.0  (2025-11-18)  Implemented adaptive quiz generation and grading logic
// 1.1.0  (2025-11-18)  Added playPronunciation using gemini-2.5-flash-preview-tts
// 1.0.0  (2025-11-18)  Implemented generateTranslation method
//
////////////////////////////////////////////////////////////////////////////////

import { GoogleGenAI, Modality, Type } from "@google/genai";
import { TranslationResult, AiChallenge, AiGrade } from "../../types";

const API_KEY = process.env.API_KEY;

// Using 2.5 Flash for speed and decent reasoning capabilities for linguistics
const MODEL_NAME = 'gemini-2.5-flash';
const TTS_MODEL = 'gemini-2.5-flash-preview-tts';
// Using 3.0 Pro for complex image reasoning (Handwriting analysis & Deciphering)
const VISION_MODEL = 'gemini-3-pro-preview';

// --- Audio Context & Caching ---
let audioCtx: AudioContext | null = null;
const audioCache = new Map<string, AudioBuffer>();

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  return audioCtx;
}

// --- Helper Functions for PCM Decoding ---

function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      // Convert Int16 PCM to Float32 (-1.0 to 1.0)
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function playBuffer(ctx: AudioContext, buffer: AudioBuffer) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
}

// --- Exported Services ---

export const generateAdaptiveChallenge = async (weakWords: string[]): Promise<AiChallenge> => {
  if (!API_KEY) throw new Error("No API Key");
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const weakList = weakWords.length > 0 ? weakWords.join(", ") : "common Middle Egyptian words";

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `
      Create a simple Middle Egyptian phrase or short sentence suitable for a student.
      Try to incorporate one or two of these specific concepts/words if possible: ${weakList}.
      
      Return JSON format:
      {
        "hieroglyphs": "unicode string",
        "transliteration": "academic transliteration",
        "translation": "English translation",
        "context": "Brief explanation of why these words were chosen"
      }
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hieroglyphs: { type: Type.STRING },
          transliteration: { type: Type.STRING },
          translation: { type: Type.STRING },
          context: { type: Type.STRING },
        }
      }
    }
  });

  if (!response.text) throw new Error("Failed to generate challenge");
  return JSON.parse(response.text) as AiChallenge;
};

export const gradeTranslation = async (challenge: AiChallenge, userTranslation: string): Promise<AiGrade> => {
  if (!API_KEY) throw new Error("No API Key");
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `
      You are a strict Egyptology professor.
      
      Original Phrase: ${challenge.hieroglyphs} (${challenge.transliteration})
      Correct Meaning: "${challenge.translation}"
      Student's Translation: "${userTranslation}"
      
      Grade the student's translation on accuracy (0-100).
      - If they capture the core meaning, give a high score.
      - If they miss grammatical nuances (tense, plurality), deduct points.
      - Provide specific feedback.
      
      Return JSON:
      {
        "score": number,
        "feedback": "string",
        "isCorrect": boolean (true if score > 80),
        "corrections": "string"
      }
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          isCorrect: { type: Type.BOOLEAN },
          corrections: { type: Type.STRING },
        }
      }
    }
  });

  if (!response.text) throw new Error("Failed to grade");
  return JSON.parse(response.text) as AiGrade;
};

// --- Vision Services (New) ---

/**
 * Analyzes a photo of a student's handwritten assignment.
 */
export const analyzeHandwritingAssignment = async (base64Image: string, context: string): Promise<AiGrade> => {
  if (!API_KEY) throw new Error("No API Key");

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const response = await ai.models.generateContent({
    model: VISION_MODEL,
    contents: [
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image
        }
      },
      {
        text: `
          You are a master scribe instructing a student.
          The student was attempting to write: "${context}".
          
          Analyze the handwriting in this image.
          1. Is it legible?
          2. Are the proportions correct (according to the Canon of Proportion/Quadrats)?
          3. Are the signs recognizable?
          
          Be strict but encouraging. If they wrote something completely different, point it out.
          
          Return JSON:
          {
            "score": number (0-100),
            "feedback": "Detailed critique of the strokes and arrangement.",
            "isCorrect": boolean,
            "corrections": "Specific advice on how to improve (e.g., 'Make the owl's head larger')."
          }
        `
      }
    ],
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          isCorrect: { type: Type.BOOLEAN },
          corrections: { type: Type.STRING },
        }
      }
    }
  });

  if (!response.text) throw new Error("Failed to analyze image");
  return JSON.parse(response.text) as AiGrade;
};

/**
 * Deciphers a photo of Egyptian text into English.
 */
export const decipherImage = async (base64Image: string): Promise<TranslationResult> => {
  if (!API_KEY) throw new Error("No API Key");

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const response = await ai.models.generateContent({
    model: VISION_MODEL,
    contents: [
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image
        }
      },
      {
        text: `
          Analyze this image of Ancient Egyptian Hieroglyphs.
          Transcribe the glyphs to Unicode, provide the academic transliteration, and translate it to English.
          Explain the grammar and sign definitions.
          
          Return JSON:
          {
            "hieroglyphs": "unicode string",
            "transliteration": "string",
            "explanation": "markdown string with translation and notes"
          }
        `
      }
    ],
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hieroglyphs: { type: Type.STRING },
          transliteration: { type: Type.STRING },
          explanation: { type: Type.STRING },
        }
      }
    }
  });

  if (!response.text) throw new Error("Failed to decipher image");
  const json = JSON.parse(response.text);

  return {
    original: "[Image Upload]",
    hieroglyphs: json.hieroglyphs,
    transliteration: json.transliteration,
    explanation: json.explanation,
    isAiGenerated: true
  };
};

export const playPronunciation = async (text: string): Promise<void> => {
  if (!API_KEY) {
    console.error("No API Key available for TTS");
    return;
  }

  const ctx = getAudioContext();

  // check cache
  if (audioCache.has(text)) {
    playBuffer(ctx, audioCache.get(text)!);
    return;
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: TTS_MODEL,
      // Prompt updated to just send the text, avoiding "Say clearly" or "Like" preambles
      contents: {
        parts: [{ text: text }]
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio data returned from Gemini");

    const bytes = decodeBase64(base64Audio);
    const audioBuffer = await decodeAudioData(bytes, ctx, 24000, 1);
    
    audioCache.set(text, audioBuffer);
    playBuffer(ctx, audioBuffer);

  } catch (error) {
    console.error("Gemini TTS Error:", error);
  }
};

export const generateEgyptianTranslation = async (inputText: string): Promise<TranslationResult> => {
  if (!API_KEY) {
    throw new Error("API Key not found in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const prompt = `
    You are an expert Egyptologist specializing in Middle Egyptian grammar and the Gardiner Sign List.
    
    Task: Translate the following English text into Ancient Egyptian Hieroglyphs (Middle Egyptian).
    Input Text: "${inputText}"
    
    Requirements:
    1. Provide the Hieroglyphic Unicode string.
    2. Provide the academic Transliteration (using standard symbols like ꜣ, ꜥ, ḥ, etc.).
    3. Provide a detailed educational explanation. Explain the word order (VSO, etc.), why specific determinatives were chosen, and the grammatical structure used.
    
    Output Format: JSON
    {
      "hieroglyphs": "string (unicode characters)",
      "transliteration": "string",
      "explanation": "string (markdown allowed)"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const jsonResponse = JSON.parse(text);

    return {
      original: inputText,
      hieroglyphs: jsonResponse.hieroglyphs,
      transliteration: jsonResponse.transliteration,
      explanation: jsonResponse.explanation,
      isAiGenerated: true
    };
  } catch (error) {
    console.error("Gemini Translation Error:", error);
    // Fallback for error states
    return {
      original: inputText,
      hieroglyphs: "𓆓𓆑𓈖𓏌𓏲", // Generic fallback
      transliteration: "Error",
      explanation: "The scribes could not consult the oracle at this time. Please check your API key or internet connection.",
      isAiGenerated: false
    };
  }
};