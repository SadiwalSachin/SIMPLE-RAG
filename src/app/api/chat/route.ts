import { NextRequest, NextResponse } from "next/server";
import { retrieveData } from "../../../../helper/retrieve-data";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req: NextRequest) {
  try {
    const { userQuery } = await req.json();

    console.log("User query coming in backend", userQuery);

    const results = await retrieveData(userQuery);

    console.log("Results generating in backend", results);

    let context = "";

    results?.map((data) => {
      context += data?.pageContent + "\n";
    });

    const SYSTEM_PROMPT = `
    You are an AI assistant who helps the user the solve the user's query based on the user query and 
    given relevant context .
    First analyze the user query what we wanted to know.
    After get the relevant data from the context .
    now base on that context generate the output

    user query:${userQuery},
    context:${context}
  `;

    console.log(SYSTEM_PROMPT);

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: userQuery,
        },
      ],
    });

    const finalResult = response.choices[0].message

    return NextResponse.json(
      {
        success: true,
        message: "Required docs fetched",
        finalResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
