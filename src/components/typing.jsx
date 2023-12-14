import { Grid, Avatar } from "@material-ui/core";
import "./typing.css";

const Typing = (props) => {
  const { avatar } = props;

  return (
    <Grid container spacing={0} justifyContent={"flex-start"}>
      <Grid item xs={0}>
        <Avatar src={avatar} />
      </Grid>
      <div className="typing">
        <div className="typing__dot"></div>
        <div className="typing__dot"></div>
        <div className="typing__dot"></div>
      </div>
    </Grid>
  );
};

export default Typing;
