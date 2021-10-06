import React from "react";
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
import CreateComment from "./CreateComment";
import CreatePostPlate from "./CreatePostPlate";

const Posts = ({ posts }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  console.log(posts);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!posts || posts.length === 0)
    return (
      <React.Fragment>
        <p style={{ textAlign: "center" }}>Can not find posts at the moment!</p>
        <CreatePostPlate></CreatePostPlate>
      </React.Fragment>
    );

  if (posts.detail === "Authentication credentials were not provided.")
    return <p style={{ textAlign: "center" }}>You must Authorize First!</p>;

  return (
    <React.Fragment>
      <CreatePostPlate></CreatePostPlate>
      {posts.map((post) => (
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
  );
};

export default Posts;

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

    borderRadius: 50,
  },

  commentavatar: {
    backgroundColor: red[500],
  },
}));
