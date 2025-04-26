import { PineconeStore } from "@langchain/pinecone";

import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);


export async function storeVectorToDB(embeddings){

    console.log("Embeddings coming for store in DB",embeddings);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
        maxConcurrency: 5,
      });

    const vectors =  await vectorStore.addDocuments(embeddings);

    return vectors

}