import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";


const pinecone = new Pinecone()
const pineconeIndex = pinecone.Index("gemini-vector-index");

export async function retrieveData(useruQery:string,topk:number=3) {
    if (!useruQery) {
        throw new Error("useruQery is required for search in Pinecone.");
    }

    console.log("Data came",useruQery);
    
    // this is for embedding generation
    const embedder = new GoogleGenerativeAIEmbeddings({
        apiKey:process.env.GOOGLE_API_KEY,
        model:"text-embedding-004",
        taskType:TaskType.SEMANTIC_SIMILARITY
    })

     // Create the vector store interface
    const vectorStore = await PineconeStore.fromExistingIndex(embedder, {
        pineconeIndex,
    });

    const results = await vectorStore.similaritySearch(useruQery,topk)

    return results
}