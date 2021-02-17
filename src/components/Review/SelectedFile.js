import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { storage } from "../../Services/Storage";
import { AuthContext } from "../Auth/AuthContext";
import ProgressBar from "../Upload/ProgressBar";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem",
    padding: "2rem",
    width: "80%",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
  },
  body1: {
    fontWeight: 500,
    fontSize: "1.2rem",
    fontFamily: "Inter",
  },
  body2: {
    display: "flex",
    placeItems: "center",
    fontSize: "1.2rem",
    fontFamily: "Inter",
  },
  icon: {
    color: "red",
    marginRight: "0.5rem",
  },
  button: {
    fontFamily: "Manrope",
    fontSize: "1rem",
    textTransform: "none",
  },
}));

const SelectedFile = ({ file }) => {
  const classes = useStyles();
  const { addToast } = useToasts();
  const auth = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const uploadRef = storage.ref(`review/${auth.uid}`);

  const handleUpload = () => {
    uploadRef
      .getMetadata()
      .then(() =>
        addToast(
          "Resume already submitted for review. You shall hear back from us on your email.",
          { appearance: "info" }
        )
      )
      .catch(() => {
        setShowProgress(true);
        const uploadTask = uploadRef.put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setProgress(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            );
          },
          (error) => {
            addToast(error.message, {
              appearance: "error",
              autoDismiss: true,
            });
          },
          () => {
            addToast("File uploaded successfully!", {
              appearance: "success",
              autoDismiss: true,
            });
          }
        );
      });
  };

  return (
    <Box className={`${classes.root} ${classes.center}`}>
      <Box
        display="flex"
        width="inherit"
        flexWrap="wrap"
        className={classes.center}
      >
        <Typography className={classes.body1}>File Selected:</Typography>
        <Typography className={classes.body2}>
          <FaFilePdf className={classes.icon} color="red" />
          {file.name}
        </Typography>
      </Box>
      <Box mt={2} className={classes.center} width="inherit">
        {showProgress ? <ProgressBar value={progress} /> : null}
        <Button
          disableElevation
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={handleUpload}
        >
          Submit for review
        </Button>
      </Box>
    </Box>
  );
};

export default SelectedFile;
