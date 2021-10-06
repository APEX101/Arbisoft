import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { NavLink, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axiosInstance from "../axios";
import ImageIcon from "@mui/icons-material/Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CreatePost from "./CreatePost";
import FlashMessage from "./FlashMessage";

const CreatePostPlate = () => {
  const classes = useStyles();
  const history = useHistory();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [expanded, setExpanded] = React.useState(false);
  const InitialPostData = {
    body: "",
  };

  const [postData, setPostData] = useState(InitialPostData);
  const [profilestate, setProfileState] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [response, setResponse] = useState([]);

  // Fetching User profile data
  const getProfile = async () => {
    const res = await axiosInstance.get("profile/");
    setProfileState(res.data);
  };

  useEffect(() => {
    getProfile();
    // console.log(profilestate);
  }, [setProfileState]);

  const handleBodyChange = (event) => {
    if ([event.target.name === "body"]) {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value.trim(),
      });
    }
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      setResponse("");
      let URL = "http://127.0.0.1:8000/user/posts/";
      let formdata = new FormData();
      formdata.append("body", postData.body);
      axiosInstance.post(URL, formdata).then((res) => {
        console.log(res.data);
        setResponse(res.data);
        const timer = setTimeout(() => {
          window.location.reload();
        }, 1500);

        return () => clearTimeout(timer);
      });
    }
  };

  // manage image data
  let profile_pic = `http://127.0.0.1:8000${profilestate.profile_pic}`;

  return (
    <div>
      <CreatePost
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></CreatePost>
      {response ? <FlashMessage successmsg={response.Post}></FlashMessage> : ""}
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              src={profile_pic}
              style={{ marginRight: 8, width: 66, height: 66 }}
              className={classes.avatar}
            ></Avatar>
          }
          subheader={
            <TextField
              id="filled-multiline-static"
              //   label="Multiline"
              fullWidth="10"
              multiline
              rows={3}
              placeholder={`${profilestate.name} Whats on you mind?`}
              variant="filled"
              name="body"
              onChange={handleBodyChange}
              onKeyDown={handleSubmit}
            />
          }
        />

        <CardContent>
          <Box className={classes.icons}>
            <IconButton style={{ size: 20 }} onClick={() => setOpenPopup(true)}>
              <ImageIcon
                style={{
                  color: "blue",
                  fontSize: 35,
                }}
              />
            </IconButton>
            <IconButton onClick={() => setOpenPopup(true)}>
              <PhotoCameraIcon style={{ color: "green", fontSize: 32 }} />
            </IconButton>
            <IconButton onClick={() => setOpenPopup(true)}>
              <LocationOnIcon style={{ color: "red", fontSize: 32 }} />
            </IconButton>
          </Box>

          <Typography variant="body2" color="textSecondary" component="p">
            {/* <PhotoLibraryIcon style={{ color: "blue" }}></PhotoLibraryIcon> */}
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Post
            </Button> */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default CreatePostPlate;

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

  icons: {
    display: "flex ",
    flexDirection: "row",
    justifyContent: "space-around",
    // justifyContent: "flex-start",
  },
}));
