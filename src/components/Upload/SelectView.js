import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { FiUpload } from "react-icons/fi";

const useStyles = makeStyles(() => ({
  root: {
    fontSize: "1rem",
    fontFamily: "Inter",
  },
  icon: {
    fontSize: "2rem",
    margin: "1rem",
  },
}));

const SelectView = () => {
  const classes = useStyles();
  return (
    <Box>
      <FiUpload color="primary" className={classes.icon} />
      <Typography className={classes.root}>
        Click to browse files or Drag and Drop them here.
      </Typography>
    </Box>
  );
};

export default SelectView;
