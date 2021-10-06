import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import axiosInstance from "../axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelIcon from "@material-ui/icons/Cancel";

const FollowingDisplay = (props) => {
  const classes = useStyles();
  const [follower, setFollower] = useState([""]);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  //   const [openpopup , setOpenPopup] = useState(false);

  const { openpopup2, setOpenPopup2 } = props;

  const handleClose = () => {
    setOpenPopup2(false);
  };

  useEffect(async () => {
    let response = await axiosInstance.get("profile/");
    let data = await response.data;
    let newState = data.followingss.map((follow) => follow.following_user_id); // map  state here
    setFollower(newState); // and then update the state
    console.log(newState);
  }, [setFollower]);

  return (
    <Dialog open={openpopup2} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ alignSelf: "flex-end", position: "absolute", right: 30 }}
        >
          <CancelIcon></CancelIcon>
        </IconButton>

        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
          style={{ fontWeight: "bold", fontSize: 20, color: "red" }}
        >
          Following
        </Typography>
      </DialogTitle>

      <DialogContent>
        <React.Fragment>
          <List className={classes.root}>
            {follower.map((follow) => (
              <ListItem key={follow.user} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={`http://127.0.0.1:8000${follow.profile_pic}`}
                    style={{ marginRight: 8, width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                        style={{ fontWeight: "bold", fontSize: 20 }}
                      >
                        {follow.name}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    follow.bio ? (
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                          style={{ fontStyle: "italic" }}
                        >
                          {follow.bio}
                        </Typography>
                      </React.Fragment>
                    ) : (
                      ""
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      </DialogContent>
    </Dialog>
  );
};

export default FollowingDisplay;

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     maxWidth: 800,
  //     marginLeft: "auto",
  //     marginRight: "auto",
  //     marginBottom: 30,
  //     marginTop: 30,
  //   },
  cross: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
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
}));
