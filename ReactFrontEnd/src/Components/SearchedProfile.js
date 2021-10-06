import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import GradeIcon from "@material-ui/icons/Grade";
import GradeOutlinedIcon from "@material-ui/icons/GradeOutlined";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import FlashMessage from "./FlashMessage";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import cake from "../Images/cake.jpg";
import street from "../Images/street.jpg";
import avatar from "../Images/avatar.jpg";

const SearchedProfile = (props) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const [profiledata, setProfileData] = useState([]);
  const [profilePostsdata, setProfilePostsData] = useState([]);
  const InitialPostData = {
    following_user_id: "",
  };
  const [followid, setFollowId] = useState(InitialPostData);
  const location = useLocation();
  const [currentfollowings, setCurrenFollowings] = useState([""]);
  const [error, setError] = useState([]);
  const [response, setResponse] = useState([]);

  const [dense, setDense] = React.useState(false);

  // console.log(location.state.posts.userpostdata);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getProfile = () => {
    setProfileData(location.state.profile.userdata);
    setProfilePostsData(location.state.posts.userpostdata);
    setFollowId({
      ...followid,
      following_user_id: location.state.profile.userdata.user,
    });
  };

  useEffect(() => {
    setError("");
    getProfile();
  }, [location, profiledata]);

  useEffect(async () => {
    let response = await axiosInstance.get("Followers/");
    let data = await response.data;
    let newState = data.map((follow) => follow.following_user_id); // map  state here
    setCurrenFollowings(newState); // and then update the state
    console.log(newState);
  }, []);

  useEffect(async () => {
    let response = await axiosInstance.get("Followers/");
    let data = await response.data;
    let newState = data.map((follow) => follow.following_user_id); // map  state here
    setCurrenFollowings(newState); // and then update the state
    console.log(newState);
  }, [response]);

  const handleFollow = (event) => {
    const URL = "http://127.0.0.1:8000/Followers/";
    axiosInstance
      .post(URL, followid)
      .then((res) => {
        setError("");
        setResponse("");
        console.log(res.data);
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleUnFollow = (event) => {
    const URL = `http://127.0.0.1:8000/Followers/${followid.following_user_id}`;
    axiosInstance
      .delete(URL)
      .then((res) => {
        setError("");
        setResponse("");
        console.log(res.data);
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  // manage image data
  let profile_pic = `http://127.0.0.1:8000${profiledata.profile_pic}`;
  let coverpic = `http://127.0.0.1:8000${profiledata.cover_pic}`;

  // console.log(followstatus);
  return (
    <div className="rootcontainer">
      <div>
        <img src={coverpic} className="image" />
      </div>
      <div className="container">
        <img src={profile_pic} className="profileimage" />
      </div>
      <Typography
        style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}
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
        >
          Followers
        </Typography>
        <Typography
          style={{
            marginRight: 40,
            marginLeft: 40,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
          }}
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
      <div className={classes.follow}>
        {currentfollowings.includes(followid.following_user_id) ? (
          <Button
            variant="contained"
            style={{
              backgroundImage: `linear-gradient(to right, yellow, red`,
              marginRight: 10,
              width: 200,
              height: 50,
            }}
            className={classes.button}
            // onClick={() => setOpenPopup(true)}
            onClick={handleFollow}
            disabled
          >
            <CheckCircleRoundedIcon />
            <Typography style={{ fontWeight: "bold", color: "black" }}>
              {" "}
              Following
            </Typography>
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1)`,
              marginRight: 10,
              width: 200,
              height: 50,
            }}
            className={classes.button}
            // onClick={() => setOpenPopup(true)}
            onClick={handleFollow}
          >
            <GradeIcon />
            Follow
          </Button>
        )}

        {currentfollowings.includes(followid.following_user_id) ? (
          <Button
            variant="contained"
            // color="primary"
            className={classes.button}
            style={{
              backgroundImage: `linear-gradient(to right,rgba(0, 133, 255, 1) ,rgba(0, 224, 255, 1))`,
              marginLeft: 20,
              width: 200,
              height: 50,
            }}
            // onClick={() => setOpenPopup(true)}
            onClick={handleUnFollow}
          >
            <GradeOutlinedIcon />
            UnFollow
          </Button>
        ) : (
          <Button
            variant="contained"
            // color="primary"
            className={classes.button}
            style={{
              backgroundImage: `linear-gradient(to right,rgba(0, 133, 255, 1) ,rgba(0, 224, 255, 1))`,
              marginLeft: 20,
              width: 200,
              height: 50,
            }}
            // onClick={() => setOpenPopup(true)}
            onClick={handleUnFollow}
            disabled
          >
            <GradeOutlinedIcon />
            UnFollow
          </Button>
        )}

        {}
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
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
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
                              <Avatar src={comments.profile.profile_pic}>
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
          </Grid>
        ))}
      </React.Fragment>
      {error ? <FlashMessage errormsg={error}></FlashMessage> : ""}
      {response.follow ? (
        <FlashMessage successmsg={response.follow}></FlashMessage>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchedProfile;

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
