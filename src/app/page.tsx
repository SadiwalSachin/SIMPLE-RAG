"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Brain } from "lucide-react"
import axios from "axios"
import {BeatLoader} from "react-spinners"

export default function Page() {
  const [topic, setTopic] = useState<string>("")
  const [currentTopic, setCurrentTopic] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [userQuery,setUserQuery] = useState<string>("")
  const [messages,setMessages] = useState([{
    "role":"",
    "content":""
  }])
  const [chatLoading,setChatLoading] = useState<boolean>(false)
  const [topicLoading,setTopicLoading] = useState<boolean>(false)

  //  SEND TOPIC TO BACKEND FOR EMBEDDINGS
  const handleTopicSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (topic.trim()) {
      setCurrentTopic(topic)
    }
    setTopicLoading(true)
    console.log(topic);
    try {

      const response = await axios.post("/api/set-topic",{topic})
      console.log("Server Response",response)

      if(response?.status == 200){
        console.log("Data send at backend successfully");
        setTopicLoading(false)
      }

    } catch (error) {
      console.error(error)
      setTopicLoading(false)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent<HTMLButtonElement>) =>{
    e.preventDefault()
    console.log("Chat submit running",userQuery);
    setMessages((prevMessages)=>([...prevMessages,{
      "role":"user",
      "content":userQuery
    }]))
    setUserQuery("")
    setChatLoading(true)
    
    try {
      const response = await axios.post("/api/chat",{userQuery})

      console.log("Server Response",response)

      if(response?.status == 200){
        setMessages((prev)=>([...prev,response?.data?.finalResult]))
        setChatLoading(false)
      }

      setChatLoading(false)

    } catch (error) {
      console.error(error)
      setChatLoading(false)
    }
  }

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] p-4 gap-4 bg-[#282F32]">
      {/* Left side - Topic input */}
      <Card className="w-full md:w-1/3 flex flex-col bg-[#616161]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain color="#FEFEFE" className="h-5 w-5" />
            <p className="text-[#FEFEFE]">Set Discussion Topic</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <form onSubmit={handleTopicSubmit} className="space-y-4">
            <Textarea
              placeholder="Enter a topic or question you'd like to discuss..."
              className="min-h-[200px] resize-none bg-[#F4F4F5]"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <Button type="submit" className="w-full bg-[#161616]" disabled={!topic.trim()}>
              Set Topic
            </Button>
          </form>

          {currentTopic && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Topic:</h3>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">{currentTopic.length > 0 ? currentTopic.slice(0,10) : ""}</p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 text-zinc-900">Topics:</h3>
          </div>
        </CardContent>
      </Card>

      {/* Right side - Chat interface */}
      <Card className="w-full md:w-2/3 flex flex-col bg-[#616161]">
        <CardHeader className="border-b">
          <CardTitle className="text-[#FEFEFE]">{currentTopic ? `Discussing: The provided topic` : "Select a topic to begin chat"}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow h-[70vh] overflow-y-scroll p-10">
          <div className="space-y-4 ">
            {!currentTopic ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-center text-white">
                  Please set a topic on the left to start the conversation
                </p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-center">Start the conversation by sending a message</p>
              </div>
            ) : (
              messages.length > 0 && messages
                .map((message,index) => (
                  <div key={index} className={`flex ${message?.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message?.content}</p>
                    </div>
                  </div>
                ))
            )}
            {chatLoading && 
             <div className={`flex justify-start`}>
             <div
               className={`max-w-[80%] rounded-lg px-4 py-2 bg-muted`}
             >
               <p className="text-sm"><BeatLoader color="black" loading={chatLoading}/></p>
             </div>
           </div>
            }
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form className="flex w-full gap-2">
            <Input
              placeholder={currentTopic ? "Type your message..." : "Set a topic first..."}
              value={userQuery}
              onChange={(e)=>{
                setUserQuery(e.target.value)
              }}
              disabled={chatLoading}
              className="flex-grow border-black bg-[#F4F4F5] border-2 text-black" 
            />
            <Button
            onClick={handleChatSubmit}
            type="submit" size="icon"
            //  disabled={!currentTopic || !input.trim() || isLoading}
             >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
