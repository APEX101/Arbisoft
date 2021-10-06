import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../axios";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import CreateComment from "./CreateComment";
import "../Css/UserProfile.css";
import FollowDisplay from "./FollowDisplay";
import FollowingDisplay from "./FollowingDisplay";
import CreatePostPlate from "./CreatePostPlate";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import FlashMessage from "./FlashMessage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditPost from "./EditPost";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import cake from "../Images/cake.jpg";
import street from "../Images/street.jpg";
import avatar from "../Images/avatar.jpg";

const UserProfile = (props) => {
  const classes = useStyles();
  const [response, setResponse] = useState([""]);
  const [response1, setResponse1] = useState([""]);
  const [dense, setDense] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [openpopup1, setOpenPopup1] = useState(false);
  const [openpopup2, setOpenPopup2] = useState(false);
  const [openpopup3, setOpenPopup3] = useState(false);
  const [defaulteditval, setDefaultEditVal] = useState("");
  const [defaulteditImage, setDefaultEditImage] = useState("");
  const [defaulteditId, setDefaultEditId] = useState("");
  const [profiledata, setProfileData] = useState([]);
  const [profilePostsdata, setProfilePostsData] = useState([]);
  const [postcreated, setPostCreated] = useState(false);

  const scrollend = useRef();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (post) => {
    const URL = `user/userpost/${post}`;
    axiosInstance
      .delete(URL)
      .then((res) => {
        // console.log(res.data);
        // setResponse(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setResponse1("PostDeletedSuccessfully!");
        const timer = setTimeout(() => {
          window.location.reload();
        }, 1500);
        return () => clearTimeout(timer);
      });
  };

  const handleEdit = (postid, postbody, postimage) => {
    setDefaultEditVal(null);
    setDefaultEditImage(null);
    setDefaultEditId(null);
    setOpenPopup3(true);
    setDefaultEditVal(postbody);
    setDefaultEditImage(postimage);
    setDefaultEditId(postid);
  };

  const handleCoverUpload = (event) => {
    setResponse(null);
    if ([event.target.name] == "cover_pic") {
      let formdata = new FormData();
      formdata.append("cover_pic", event.target.files[0]);
      axiosInstance
        .patch(`profile/${profiledata.name}/`, formdata)
        .then((res) => {
          console.log(res.data);
          setResponse(res.data);
          const timer = setTimeout(() => {
            window.location.reload();
          }, 1500);
          return () => clearTimeout(timer);
        });
    } else {
      let formdata = new FormData();
      formdata.append("profile_pic", event.target.files[0]);
      axiosInstance
        .patch(`profile/${profiledata.name}/`, formdata)
        .then((res) => {
          console.log(res.data);
          setResponse(res.data);
          const timer = setTimeout(() => {
            window.location.reload();
          }, 1500);
          return () => clearTimeout(timer);
        });
    }
  };

  const getUserProfile = async () => {
    const response = await axiosInstance.get("profile/");
    setProfileData(response.data);
    console.log(response.data);
  };

  const getUserProfilePosts = async () => {
    const response = await axiosInstance.get("/user/userpost/");
    setProfilePostsData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    console.log("Iam Trigered");
    setPostCreated(false);
    setResponse(null);
    setResponse1(null);
    getUserProfile();
    getUserProfilePosts();
  }, [setProfileData, setProfilePostsData]);

  // manage image data
  let profile_pic = `http://127.0.0.1:8000${profiledata.profile_pic}`;
  let coverpic = `http://127.0.0.1:8000${profiledata.cover_pic}`;

  return (
    <div className="rootcontainer">
      <FollowDisplay
        openpopup1={openpopup1}
        setOpenPopup1={setOpenPopup1}
      ></FollowDisplay>
      <div>
        <div>
          <FollowingDisplay
            openpopup2={openpopup2}
            setOpenPopup2={setOpenPopup2}
          ></FollowingDisplay>
        </div>
        <img src={coverpic} className="image" />
        <input
          accept="image/*"
          className={classes.input1}
          id="icon-button-photo1"
          onChange={handleCoverUpload}
          type="file"
          style={{ display: "none" }}
          name="cover_pic"
        />
        <label htmlFor="icon-button-photo1">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
            startIcon={<PhotoCamera />}
          >
            Upload New
          </Button>
        </label>
      </div>
      <div className="container" style={{ marginLeft: 50 }}>
        <img src={profile_pic} className="profileimage" />

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-photo2"
          onChange={handleCoverUpload}
          name="profile_pic"
          type="file"
          className={classes.input}
        />
        <label htmlFor="icon-button-photo2">
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </div>

      <Typography
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 30,
          // marginRight: 30,
        }}
      >
        {profiledata.name}
      </Typography>
      <Typography
        style={{
          textAlign: "center",
          fontWeight: "italic",
          fontSize: 15,
          // marginRight: 30,
        }}
      >
        {profiledata.bio}
      </Typography>

      <div className={classes.follow}>
        <Typography
          style={{
            marginRight: 50,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
          }}
          onClick={() => setOpenPopup1(true)}
        >
          Followers
        </Typography>

        <Typography
          style={{
            marginLeft: 40,
            marginRight: 40,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
          }}
          onClick={() => setOpenPopup2(true)}
        >
          Followings
        </Typography>
        <Typography
          style={{
            marginLeft: 50,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Posts
        </Typography>
      </div>
      <div className={classes.follow}>
        {profiledata.followerss ? (
          <Typography
            style={{
              marginRight: 10,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 50,
              color: "black",
            }}
          >
            {profiledata.followerss.length}
          </Typography>
        ) : (
          ""
        )}
        {profiledata.followingss ? (
          <Typography
            style={{
              marginLeft: 200,
              marginRight: 200,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 50,
              color: "black",
            }}
          >
            {profiledata.followingss.length}
          </Typography>
        ) : (
          ""
        )}
        {profilePostsdata ? (
          <Typography
            style={{
              marginLeft: 10,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 50,
              color: "black",
            }}
          >
            {profilePostsdata.length}
          </Typography>
        ) : (
          ""
        )}
      </div>

      <React.Fragment>
        <Card style={{ maxWidth: 300, position: "absolute" }}>
          <CardContent>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              About Info
            </Typography>

            <List dense={dense}>
              {/* profiledata */}
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Bio"
                  secondary={profiledata.bio ? profiledata.bio : null}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={cake}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Birthday"
                  secondary={
                    profiledata.birth_date ? profiledata.birth_date : null
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={street}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Location"
                  secondary={profiledata.location ? profiledata.location : null}
                />
              </ListItem>
              {/* imagegrid */}
              <ListItem>
                <ImageList
                  sx={{ width: 300, height: 400 }}
                  cols={3}
                  rowHeight={164}
                >
                  {profilePostsdata.map((item) => (
                    <ImageListItem key={item.picture}>
                      <img
                        src={`http://127.0.0.1:8000${item.picture}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`http://127.0.0.1:8000${item.picture}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt="Gallery"
                        loading="lazyu"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </ListItem>
              ,
            </List>
          </CardContent>
        </Card>
        <CreatePostPlate></CreatePostPlate>

        {response ? (
          <FlashMessage successmsg={response.Update}></FlashMessage>
        ) : (
          ""
        )}
        {response1 ? <FlashMessage successmsg={response1}></FlashMessage> : ""}

        {profilePostsdata.map((post) => (
          <Grid item key={post.id} xs={12}>
            <Card className={classes.root}>
              {/* Avatar */}
              <CardHeader
                avatar={
                  <Avatar
                    style={{ marginRight: 8, width: 55, height: 55 }}
                    aria-label="recipe"
                    src={`http://127.0.0.1:8000${post.profile.profile_pic}`}
                  ></Avatar>
                }
                action={
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleDelete(post.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        handleEdit(post.id, post.body, post.picture);
                      }}
                    >
                      <EditIcon></EditIcon>
                    </IconButton>
                  </div>
                }
                // Name
                title={
                  <Typography style={{ fontWeight: "bold" }}>
                    {post.profile.name}
                  </Typography>
                }
                subheader={post.created_at}
              />
              {/* Title  rendering postbody*/}
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.body}
                </Typography>
              </CardContent>
              <EditPost
                openPopup={openpopup3}
                setOpenPopup={setOpenPopup3}
                defaultpostid={defaulteditId}
                defaultvalues={defaulteditval}
                defaultimage={defaulteditImage}
                setDefaultEditImage={setDefaultEditImage}
              />
              {post.picture ? (
                <CardMedia
                  className={classes.media}
                  image={`http://127.0.0.1:8000${post.picture}`}
                  title="Paella dish"
                />
              ) : (
                ""
              )}

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  {/*Addin Comments Here */}

                  {/* Start */}
                  <React.Fragment>
                    {/* creating comment */}
                    <CreateComment postid={post.id}></CreateComment>
                    {post.comment.map((comments) => (
                      <Grid item key={comments.id} xs={12}>
                        <Card
                          className={classes.commentroot}
                          style={{
                            backgroundImage: `linear-gradient(to right, #FF512F, #DD2476`,
                          }}
                        >
                          {/* Avatar */}
                          <CardHeader
                            avatar={
                              <Avatar
                                src={`http://127.0.0.1:8000${comments.profile.profile_pic}`}
                              >
                                R
                              </Avatar>
                            }
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }
                            // Name
                            title={
                              <Typography style={{ fontWeight: "bold" }}>
                                {comments.profile.name}
                              </Typography>
                            }
                            subheader={comments.created_at}
                          />
                          {/* Title  rendering postbody*/}
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              style={{
                                marginLeft: 55,
                                fontStyle: "italic",
                                color: "white",
                              }}
                            >
                              {comments.body}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                              <FavoriteIcon />
                            </IconButton>
                            {/* <IconButton aria-label="share">
                            <ShareIcon />
                          </IconButton> */}
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </React.Fragment>

                  {/* End */}
                </CardContent>
              </Collapse>
            </Card>

            <div ref={scrollend}></div>
          </Grid>
        ))}
      </React.Fragment>
    </div>
  );
};

export default UserProfile;

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
  avatar: {
    backgroundColor: red[500],
  },

  commentroot: {
    maxHeight: 180,
    maxWidth: 800,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    backgroundColor: "rgba(57,100,255,1)",
    borderRadius: 50,
  },

  commentavatar: {
    backgroundColor: red[500],
  },
  follow: {
    display: "flex",
    color: "red",
    flexDirection: "row",
    justifyContent: "center",
  },
}));
