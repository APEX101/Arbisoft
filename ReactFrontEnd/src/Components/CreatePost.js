import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axiosInstance from "../axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import FlashMessage from "./FlashMessage";
import SendIcon from "@mui/icons-material/Send";

export default function CreatePost(props) {
  const classes = useStyles();
  const history = useHistory();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [expanded, setExpanded] = React.useState(false);
  const InitialPostData = {
    body: "",
  };
  const [postData, setPostData] = useState(InitialPostData);
  const [postImage, setPostImage] = useState();
  const [postPrev, setPostPrev] = useState(null);
  const { openPopup, setOpenPopup } = props;
  const [profilestate, setProfileState] = useState({});
  const [response, setResponse] = useState([]);
  const [error, setError] = useState([]);

  // Fetching User profile data
  const getProfile = async () => {
    const response = await axiosInstance.get("profile/");
    setProfileState(response.data);
  };

  useEffect(() => {
    setError("");
    getProfile();
    // console.log(profilestate);
  }, [setProfileState]);

  const handleChange = (event) => {
    setPostImage({
      ...postData,
      picture: event.target.files,
    });
    setPostPrev({
      ...postData,
      picURL: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleBodyChange = (event) => {
    if ([event.target.name == "body"]) {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value.trim(),
      });
    }
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleSubmit = (event) => {
    setResponse("");
    setError("");
    let URL = "http://127.0.0.1:8000/user/posts/";
    let formdata = new FormData();
    formdata.append("body", postData.body);
    formdata.append("picture", postImage.picture[0]);
    axiosInstance
      .post(URL, formdata)
      .then((res) => {
        console.log(res.data);
        setResponse(res.data);
        const timer = setTimeout(() => {
          setOpenPopup(false);
          window.location.reload();
        }, 1500);
        return () => clearTimeout(timer);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };
  // manage image data
  let profile_pic = `http://127.0.0.1:8000${profilestate.profile_pic}`;
  // let profile_pic = "http://127.0.0.1:8000" + ({profilestate.profile_pic});

  return (
    <Dialog open={openPopup} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogContent>
        {error ? <FlashMessage errormsg={error}></FlashMessage> : ""}
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                src={profile_pic}
                className={classes.avatar}
                style={{ marginRight: 8, width: 55, height: 55 }}
              ></Avatar>
            }
            action={
              <IconButton aria-label="close" onClick={handleClose}>
                <CancelIcon></CancelIcon>
              </IconButton>
            }
            title={
              <Typography style={{ fontWeight: "bold" }}>
                {profilestate.name}
              </Typography>
            }
            subheader={profilestate.birth_date}
          />

          <CardContent>
            {response ? (
              <FlashMessage successmsg={response.Post}></FlashMessage>
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
                  placeholder="Whats on you mind?"
                  variant="filled"
                  name="body"
                  onChange={handleBodyChange}
                />
              </form>
              {/* image preview */}
              {postImage ? (
                <CardMedia
                  className={classes.media}
                  image={postPrev.picURL}
                  title="Paella dish"
                />
              ) : (
                ""
              )}
              {/* imageinput */}

              <input
                id="post-image"
                name="picture"
                type="file"
                onChange={handleChange}
                accept="image/*"
              />
              {/* <PhotoLibraryIcon style={{ color: "blue" }}></PhotoLibraryIcon> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                style={{
                  backgroundImage: `linear-gradient(to right, #FF512F, #DD2476`,
                }}
              >
                Post
                <SendIcon />
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
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
