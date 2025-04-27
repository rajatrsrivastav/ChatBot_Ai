export const getAllChatBots=async()=>{
    const response = await fetch("api/chatbot/getAll",{
        method:"GET",
    })
    if (!response.ok){
        const{err}=await response.json()
        console.log(err)
        throw new Error (err || "Error Creating Chatbot")
    }
  return response
}