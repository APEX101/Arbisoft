import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { NavLink, useHistory } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import axiosInstance from "../axios";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import FlashMessage from "./FlashMessage";

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  const [searcheduser, setSearchedUser] = useState("");
  const [userdata, setUserData] = useState([]);
  const [userpostdata, setUserPostsData] = useState([]);
  const [currentprofile, setCurrentProfile] = useState([]);
  const [error, setError] = useState("");

  const current = () => {
    axiosInstance.get("profile/").then((res) => {
      setCurrentProfile(res.data);
    });
  };

  const handleChange = (event) => {
    setSearchedUser(event.target.value);
    console.log(searcheduser);
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      setError("");
      setExpanded(!expanded);
      console.log("Enter Pressed");
      axiosInstance
        .get(`profile/${searcheduser}`)
        .then((response) => {
          setUserData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
          setError("No Profile found with current Username!");
        });

      axiosInstance
        .get(`/user/userpost/${searcheduser}`)
        .then((response) => {
          setUserPostsData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // currentuser

  const handleSearch = (event) => {
    history.push({
      pathname: "/SearchProfile",
      state: { profile: { userdata }, posts: { userpostdata } },
    });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      current();
    }
  }, [setCurrentProfile]);

  return (
    <React.Fragment>
      <Toolbar
        className={classes.toolbar}
        style={{
          backgroundImage: `linear-gradient(to right, #833ab4 ,#fd1d1d , #833ab4  `,
        }}
      >
        <Button
          size="small"
          className={classes.text}
          component={NavLink}
          to="/Home"
        >
          Home
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Facebook
        </Typography>

        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}

        {/* serach bar */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
          />
        </div>

        <Button
          size="small"
          className={classes.text}
          component={NavLink}
          to="/UserProfile"
        >
          <Avatar
            src={`http://127.0.0.1:8000${currentprofile.profile_pic}`}
            style={{ marginRight: 10 }}
          ></Avatar>
          {currentprofile.name}
        </Button>

        <Button
          variant="outlined"
          size="small"
          className={classes.text}
          component={NavLink}
          to="/Logout"
          style={{ marginLeft: 10 }}
        >
          Logout
        </Button>
      </Toolbar>

      {/* add list here to make it out of toolbar */}
      <div className={classes.drop}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Button
                  size="small"
                  className={classes.text}
                  // component={NavLink}
                  onClick={handleSearch}
                >
                  <Avatar
                    src={`http://127.0.0.1:8000${userdata.profile_pic}`}
                  ></Avatar>
                  Home
                </Button>
              </ListItemAvatar>
              <ListItemText primary={userdata.name} secondary="Jan 9, 2014" />
            </ListItem>
            {error ? <FlashMessage errormsg={error}></FlashMessage> : ""}
          </List>
        </Collapse>
      </div>
    </React.Fragment>
  );
};

export default Header;

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    // backgroundColor: "rgba(57,100,255,1)",
  },
  toolbarTitle: {
    flex: 1,
    marginLeft: 280,
    color: "white",
    fontWeight: "bold",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    borderColor: "white",
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    bottom: 2,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  // expandOpen: {
  //   transform: "scale(0.5) translate(-100%, -100%)",
  // },
  drop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 250,
  },
}));
