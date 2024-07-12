import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessage = () =>{
    const {socket} = useSocketContext()
    const {messages, setMessages} = useConversation()

    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            newMessage.shouldShake = true
            const sound = new Audio(notificationSound)
            // sound.play()
            sound.play().catch(error => {
                console.error("Error playing sound:", error)
            })
            setMessages([...messages, newMessage])
        })
        return () => {socket?.off("newMessage")}
    }, [socket, messages, setMessages])
    
}
export default useListenMessage;