import React, { useEffect, useState } from "react";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import EmptyMessage from "./EmptyMessage";
import InputEmoji from "react-input-emoji";
import { useSendMessageMutation } from "../redux/features/chat/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { setChatByUser } from "../redux/features/chat/chatSlice";

const ChatMessagesInput = ({ chatId, chatRefresh, scrollToBottom }) => {
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [sendMessage, { isSuccess: sendMessageIsSuccess, error: sendMessageError }] = useSendMessageMutation();
  const { user: stateUser } = useSelector((state) => state.auth);
  const userRole = stateUser?.role;
  const dispatch = useDispatch();

  const handleSendMessage = async (e) => {
    try {
      if (message === undefined || message.trim() === "") {
        setAlert(true);
        return;
      }
      await sendMessage({
        chatId,
        content: message,
      });

      await chatRefresh();
      scrollToBottom();

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

  const isMessageNotEmpty = message !== undefined && message.trim() !== "";

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
          onChange={setMessage}
          className="w-[100%] h-[6vh] bg-white outline-none py-[6px] resize-none"
          placeholder="Enter message"
          onEnter={handleSendMessage}
          borderRadius={8}
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
