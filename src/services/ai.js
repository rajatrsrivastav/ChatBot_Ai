export const askGemini = async ({text,context}) => {
    const response=await fetch("/api/ai/askGemini/",{
        method:"POST",
        body:JSON.stringify({text,context}),
        headers:{
            "Content-Type":"application/json",
        },
    });
    if(!response.ok){
        const {err}=await response.json()
        console.log(err)
        throw new Error (err || "")
    }
    return response
}
