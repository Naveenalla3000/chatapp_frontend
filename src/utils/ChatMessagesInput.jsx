import React, { useEffect, useState } from "react";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import EmptyMessage from "./EmptyMessage";
import InputEmoji from "react-input-emoji";
import { useSendMessageMutation } from "../redux/features/chat/chatApi";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { useSocket } from "../context/socketContext";

const ChatMessagesInput = ({ setChatMessages, chatId, scrollToBottom, isTyping, setIsTyping }) => {
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [sendMessage, { isSuccess: sendMessageIsSuccess, error: sendMessageError, data: sendMessageData }] = useSendMessageMutation();
  const { user: stateUser } = useSelector((state) => state.auth);
  const userRole = stateUser?.role;
  const { socket } = useSocket();

  const handleSendMessage = async (e) => {
    try {
      if (message === undefined || !message.trim()) {
        setAlert(true);
        return;
      }
      socket.emit("stopTyping", chatId);
      const res = await sendMessage({
        chatId,
        content: message,
      });
      // console.log(res)
      if (res.data.message) {
        setChatMessages((prevMessages) => [...prevMessages, res.data.message]);
        scrollToBottom();
      }
      setMessage('');
      if (sendMessageError) {
        console.log(sendMessageError);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendMessageFromButtom = async (e) => {
    e.preventDefault();
    await handleSendMessage();
  };

  useEffect(() => {
    setMessage('');
  }, [chatId]);
  useEffect(() => {

    if (!isTyping) {
      socket.emit("stopTyping", chatId);
    }
  }, [isTyping, chatId]);

  const isMessageNotEmpty = message !== undefined && message.trim() !== "";
  useEffect(() => {
    if (!isMessageNotEmpty) {
      socket.emit("stopTyping", chatId);
    }
  }, [message])

  return (
    <div
      className={`${userRole === "USER" ? "w-full" : "w-3/4"
        } fixed bottom-0 h-[8vh] bg-[#f0f2f5]`}
    >
      <form
        className="flex min-h-full h-full w-full items-center justify-between py-2 px-2"
        onSubmit={handleSendMessageFromButtom}
      >
        <InputEmoji
          name="message"
          value={message}
          onChange={(text) => {
            setMessage(text);
            socket.emit("typing", chatId);
          }}
          className="w-[100%] h-[6vh] bg-white outline-none py-[6px] resize-none"
          placeholder="Enter message"
          onEnter={handleSendMessage}
          borderRadius={8}
          onBlur={() => socket.emit("stopTyping", chatId)}
        />
        <IconButton
          aria-label="Settings"
          className="p-2 font-bold cursor-pointer rounded-full outline-none px-2 flex justify-center items-center gap-2"
          type="submit"
        >
          <span>
            <HiMiniPaperAirplane
              className="text-2xl"
              color={!isMessageNotEmpty ? "#858585" : "black"}
            />
          </span>
        </IconButton>
      </form>
      {alert && <EmptyMessage alert={alert} setAlert={setAlert} />}
    </div>
  );
};

export default ChatMessagesInput;
