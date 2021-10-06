import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { NavLink, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axiosInstance from "../axios";
import SendIcon from "@mui/icons-material/Send";
import FlashMessage from "./FlashMessage";

export default function CreateComment({ postid }) {
  const classes = useStyles();
  const history = useHistory();
  console.log(postid);
  const [expanded, setExpanded] = React.useState(false);
  const InitialPostData = {
    body: "",
    post: postid,
  };

  const [postData, setPostData] = useState(InitialPostData);
  const [response, setResponse] = useState([]);

  const handleBodyChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    let URL = "user/comments/";
    axiosInstance
      .post(URL, postData)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
        setResponse(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          {response ? (
            <FlashMessage successmsg={response.Comment}></FlashMessage>
          ) : (
            ""
          )}
          <Typography variant="body2" color="textSecondary" component="p">
            <form className={classes.root} noValidate autoComplete="off">
              {/* TExtField */}
              <TextField
                id="filled-multiline-static"
                //   label="Multiline"
                fullWidth="10"
                multiline
                rows={3}
                placeholder="Comment Something"
                variant="filled"
                name="body"
                onChange={handleBodyChange}
              />
            </form>
            <div className={classes.icon}>
              <IconButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                <SendIcon />
              </IconButton>
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
    marginTop: 30,
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {},
  dialogue: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
}));
