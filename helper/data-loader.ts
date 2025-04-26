import { TextLoader } from "langchain/document_loaders/fs/text";

export function dataLoader(data:string){

    console.log("Data come in loader function",data);
    
    if(!(data.length > 0)){
        return "Provide a data for loading"
    }

    const loader = new TextLoader(data)

    const docs = loader.load()

    console.log("Loadede document in loader function",docs);
    
    return docs

}