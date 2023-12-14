import "./App.css";
import {
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
  Fab,
  TextField,
} from "@material-ui/core";
import ChatMessage from "./components/chatMessage";
import Typing from "./components/typing";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi, How are you today?",
      from: "gpt",
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [gptLoading, setGptLoading] = useState(false);
  const chatArea = useRef(null);

  useEffect(() => {
    chatArea.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const sendToGPT = async (message) => {
    setGptLoading(true);
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
      {
        inputs: {
          past_user_inputs: messages
            .filter((message) => message.from === "user")
            .map((message) => message.text),
          generated_responses: messages
            .filter((message) => message.from === "gpt")
            .map((message) => message.text),
          text: message,
        },
      }
    );
    setGptLoading(false);

    return response.data;
  };

  const sendMessage = async () => {
    if (!currentMessage || currentMessage.trim() === "") {
      return;
    }
    setMessages((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        text: currentMessage,
        from: "user",
      },
    ]);
    setCurrentMessage("");

    const res = await sendToGPT(currentMessage);
    console.log(res);
    setMessages((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        text: res.generated_text,
        from: "gpt",
      },
    ]);
  };

  return (
    <Container>
      <Card className="card">
        <CardContent className="chat-card-content">
          <Container>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={0}>
                <Avatar alt="Sam" src="/static/images/avatar/1.jpg" />
              </Grid>
              <Grid item xs={10}>
                <b>AI Sam</b>
              </Grid>
            </Grid>
          </Container>
          <div className="chats">
            <div ref={chatArea}>
              {messages.map((message) => (
                <ChatMessage
                  avatar={""}
                  side={message.from === "gpt" ? "left" : "right"}
                  message={message}
                  key={message.id}
                />
              ))}
              {gptLoading && <Typing />}
            </div>
          </div>

          <Grid container className="message-box">
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Message"
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                value={currentMessage}
              />
            </Grid>
            <Grid
              item
              xs={1}
              direction="row"
              alignItems="center"
              justify="flex-end"
            >
              <Fab
                color="primary"
                aria-label="add"
                size="small"
                onClick={sendMessage}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
