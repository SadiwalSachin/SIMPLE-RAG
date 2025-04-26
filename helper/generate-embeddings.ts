import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

export async function generateEmbeddings(loadedData:any){

    console.log("Data came for embeddings",loadedData);
    
    
    if(!loadedData){
        return "Provide query for generating embeddings"
    }

    const embedder = new GoogleGenerativeAIEmbeddings({
        apiKey:process.env.GOOGLE_API_KEY,
        model:"text-embedding-004",
        taskType:TaskType.SEMANTIC_SIMILARITY
    })

    const textEmbeddingQuery = await embedder.embedQuery(loadedData)

    return textEmbeddingQuery

}