# RAG System

A Retrieval Augmented Generation (RAG) implementation using LangChain.js, Pinecone vector database, and Google's Generative AI.

## Overview

This system enhances AI responses by retrieving relevant information from your own document collection before generating answers. The RAG approach provides more accurate, contextual, and up-to-date responses compared to standard LLM interactions.

### How It Works

1. **Document Processing**: Text documents are loaded and chunked into smaller segments
2. **Embedding Generation**: Google's Generative AI creates vector embeddings for each text chunk
3. **Vector Storage**: Embeddings are stored in Pinecone vector database
4. **Query Processing**: User queries are converted to embeddings
5. **Semantic Search**: The system finds semantically similar content in the database
6. **Response Generation**: Relevant context is passed to an AI model to generate the final response

## Features

- Semantic search using vector embeddings
- Integration with Pinecone for scalable vector storage
- NextJS frontend for easy interaction
- Powered by Google's Generative AI models through LangChain.js

## Prerequisites

- Node.js and npm installed
- Pinecone account and API key
- Google API key with access to Generative AI services

## Environment Variables

Create a `.env` file with the following variables:

```
GOOGLE_API_KEY=your_google_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_pinecone_index_name
GEMINI_API_KEY=your_gemini_api_key
```

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/sachinsadiwal/rag-system.git
   cd rag-system
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up your environment variables (as described above)

## Usage

### Adding Documents

The system uses TextLoader from LangChain to process documents:

```javascript
import { TextLoader } from "langchain/document_loaders/fs/text";

// Load your text documents
const loader = new TextLoader("path/to/your/document.txt");
const docs = await loader.load();
```

### Creating and Storing Embeddings

```javascript
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

// Initialize the embeddings model
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  modelName: "embedding-001",
  taskType: TaskType.RETRIEVAL_DOCUMENT,
});

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// Get your index
const index = pinecone.Index(process.env.PINECONE_INDEX);

// Create vector store
const vectorStore = await PineconeStore.fromDocuments(docs, embeddings, {
  pineconeIndex: index,
  namespace: "your-namespace", // Optional
});
```

### Querying the System

```javascript
// Create embeddings for the query
const queryEmbedding = await embeddings.embedQuery("Your query here");

// Search for similar documents
const results = await vectorStore.similaritySearch("Your query here", 5); // Return top 5 matches

// Use the results to generate a response with your AI model
// Code for sending to AI model...
```

## Example Application

This RAG system can be used for various applications:

- Customer support systems with access to product documentation
- Research assistants that can reference specific papers or reports
- Knowledge bases that provide accurate information from company documents

## Extending the System

You can extend this RAG system by:

- Adding different document loaders (PDF, CSV, HTML, etc.)
- Implementing more sophisticated chunking strategies
- Fine-tuning the embedding model for your specific domain
- Adding a caching layer for frequently asked questions

## Troubleshooting

- **Vector Dimension Mismatch**: Ensure the embedding dimensions match those expected by your Pinecone index
- **API Rate Limits**: Be mindful of rate limits for both Google AI and Pinecone APIs
- **Memory Issues**: When processing large documents, consider streaming approaches to manage memory usage

## License

[MIT License](LICENSE)

## Author

Sachin Sadiwal