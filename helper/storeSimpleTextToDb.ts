import { Document } from "@langchain/core/documents";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";


const pinecone = new Pinecone()
const pineconeIndex = pinecone.Index("gemini-vector-index");

export async function storeSimpleTextToPineConeDB(text:string , metaData = {}) {
    if (!text) {
        throw new Error("Text is required for storing to Pinecone.");
    }

    console.log("Data came",text);
    
    // this is for embedding generation
    const embedder = new GoogleGenerativeAIEmbeddings({
        apiKey:process.env.GOOGLE_API_KEY,
        model:"text-embedding-004",
        taskType:TaskType.SEMANTIC_SIMILARITY
    })

    const docs = new Document({
        pageContent:text,
        metadata:metaData
    })

    console.log("docs created",docs);

    const vectorsFromStore = await PineconeStore.fromDocuments([docs],embedder,{pineconeIndex})

    console.log("Text embedded and stored in Pinecone.");

    return vectorsFromStore
    
}