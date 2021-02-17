import { Box, Button, Link, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Fragment } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import ProgressBar from "../Upload/ProgressBar";

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
  messageTitle: {
    fontWeight: 500,
    fontSize: "2rem",
    fontFamily: "Inter",
    paddingBottom: "1rem",
    color: theme.palette.secondary.dark
  },
  messageBody: {
    fontSize: "1.2rem",
    fontFamily: "Inter",
    paddingBottom: "2rem",
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

const SelectedFile = ({ file, uploadRef }) => {
  const classes = useStyles();
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

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
            setUploadComplete(true);
          }
        );
      });
  };

  return (
    <Box className={`${classes.root} ${classes.center}`}>
      {uploadComplete ? (
        <Box
          display="flex"
          width="inherit"
          flexWrap="wrap"
          className={classes.center}
        >
          <Typography className={classes.messageTitle}>
            Congratulations! 🎉
          </Typography>
          <Typography className={classes.messageBody}>
            Your resume is now on its way to awsomeness!
            We'll get in touch with you over the email. If you have any doubts,
            you can always write to us on{" "}
            <Link href="mailto:hello@resuminator.in">hello@resuminator.in</Link>
          </Typography>
        </Box>
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </Box>
  );
};

export default SelectedFile;
