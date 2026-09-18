import { getModel } from "../config/llmmodel.js"

export const codingAgent=async(state)=>{
  const intentllm=await getModel("intent")
  const llm=await getModel("coding")
  const intentResponse=await intentllm.invoke(`
    YOU ARE AN INTENT CLASSIFIER.

    Return only one of these values:
     -CODE_GENERATION
     -CODE_REVIEW
     -CODE_EXPLANATION
     -DEBUGGING
     -OPTIMISATION
     -CONVERSION
     -DOCUMENTATION

    User Request:${state.prompt}

    `)

    const intent=intentResponse.content
    if(intent=="CODE_GENERATION"){
    const prompt=`You are CortexAI Coding Agent.

Generate the requested project.

Default stack:
- HTML
- CSS
- JavaScript

Use React / Next.js / Vue ONLY if explicitly requested.

Rules:
- Responsive
- Modern UI
- CSS Variables
- Flexbox/Grid
- Smooth Scroll
- Hover Effects
- Beautiful spacing
- Single page unless user asks otherwise.

IMAGES-
 -Always use real Unsplash images.
 -Never use placeholders.
 -Return ONLY valid JSON.

Schema:

{
  "files": [
    {
      "name": "index.html",
      "content": "..."
    },
    {
      "name": "style.css",
      "content": "..."
    },
    {
      "name": "script.js",
      "content": "..."
    }
  ]
}

Rules:

- Output must start with {
- Output must end with }
- No markdown
- No explanation
- No extra text
- No triple backticks
- Never mention intent

User Request:${state.prompt}`

        const res=llm.invoke(prompt)
        const data=JSON.parse((await res).content)
        return({
            ...state,
            aiResponse:"Code Generated Successfully",
            artifacts:[

               { id:Date.now(),
                 type:"project",
                 files:data.files || [],
                 title:state.prompt
               }

            ]
        })
    }
    const res=await llm.invoke(`
        ${intent}
        Return Markdown only.
        Never generate project files.
        Use headings like:
         Overview
         Explanation
         Problems
         Improvements
         Best Practices
         Optimized code (if needed)
        User Request:${state.prompt}
        `)
    const data=res.content
    return {
        ...state,
        aiResponse:data,
        artifacts:[]
    }
}