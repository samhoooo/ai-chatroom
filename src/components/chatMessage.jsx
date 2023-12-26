import { Grid, Typography, Avatar } from "@material-ui/core";
import "./chatMessage.css";

const ChatMessage = (props) => {
  const { side = "left", avatar, message } = props;
  return (
    <Grid
      container
      spacing={0}
      justifyContent={side === "right" ? "flex-end" : "flex-start"}
    >
      {side === "left" && (
        <Grid item xs={0}>
          <Avatar src={avatar} />
        </Grid>
      )}
      <div key={message.id} className={`${side}Row chat`}>
        <Typography>{message.text}</Typography>
      </div>
      {side === "right" && (
        <Grid item xs={1}>
          <Avatar src={""} />
        </Grid>
      )}
    </Grid>
  );
};

export default ChatMessage;
