import { NextRequest, NextResponse } from "next/server";
import { dataLoader } from "../../../../helper/data-loader";
import { generateEmbeddings } from "../../../../helper/generate-embeddings";
import { storeVectorToDB } from "../../../../helper/store-embeddings-to-db";
import { storeSimpleTextToPineConeDB } from "../../../../helper/storeSimpleTextToDb";



export async function POST(request:NextRequest){
    const body = await request.json()
    const {topic} = body

    console.log("Received Data",topic)

    // WE CAN LOAD DATA HERE ALSO

    console.log("Data sent for embeddings");

    // const generateEmbeddingsOfLoadedData = await generateEmbeddings(topic)     

    // console.log(generateEmbeddingsOfLoadedData);
    
    // const storeEmbeddings = await storeVectorToDB(generateEmbeddingsOfLoadedData)

    console.log("data sent in storeSimpleTextToPineConeDB for storing");
    

    const storedDataInDB =  await storeSimpleTextToPineConeDB(topic)

    console.log(storedDataInDB);
    

    return NextResponse.json({
        success:true,
        message:"Topic received",
        storedDataInDB
    },{status:200})

}
