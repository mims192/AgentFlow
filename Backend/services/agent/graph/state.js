import { Annotation } from "@langchain/langgraph";

export const agentSate=Annotation.Root(
    { 
        prompt:Annotation(),  //prompt is key annotation helps in intiating the key
        aiResponse:Annotation(),
        agent:Annotation(),
        conversationId:Annotation(),
        searchResults:Annotation(),
        images:Annotation()
    }
)