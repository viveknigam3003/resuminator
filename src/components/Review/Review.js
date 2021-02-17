import { Box, makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useToasts } from "react-toast-notifications";
import { storage } from "../../Services/Storage";
import { AuthContext } from "../Auth/AuthContext";
import DragView from "../Upload/DragView";
import SelectView from "../Upload/SelectView";
import SelectedFile from "./SelectedFile";
import Submitted from "./Submitted";
import TitleText from "./TitleText";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "5rem 2rem 10rem 2rem",
  },

  dropzone: {
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
    margin: "2rem",
    padding: "4rem",
    width: "40%",
    cursor: "pointer",
    border: "solid",
    borderColor: theme.palette.primary.dark,
    borderRadius: 16,
    "&:hover": {
      backgroundColor: blueGrey[50],
    },
  },
}));

const Review = () => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const auth = useContext(AuthContext);
  const { addToast } = useToasts();
  const uploadRef = storage.ref(`review/${auth.uid}`);
  const [submitted, setSubmitted] = useState(false);
  const [fileMeta, setFileMeta] = useState(null);
  const onDrop = useCallback((acceptedFile) => setFile(acceptedFile[0]), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "application/pdf",
    maxFiles: 1,
    onDrop,
  });

  React.useEffect(() => {
    let isSubscribed = true;
    uploadRef
      .getMetadata()
      .then((meta) => {
        if (isSubscribed) {
          setFileMeta(meta);
          setSubmitted(true);
        }
      })
      .catch(() =>
        isSubscribed
          ? addToast(
              "We're sorry, some error occured while fetching your review status. Please try again in sometime.",
              { appearance: "error", autoDismiss: true }
            )
          : null
      );

    return () => (isSubscribed = false);
  }, [addToast, uploadRef]);

  if (submitted) return <Submitted meta={fileMeta} />;

  return (
    <Box className={classes.root}>
      <TitleText
        title="Supercharge your resume! ⚡"
        subtitle="Submit one resume built using Resuminator for review. We'll get it
        reviewed by the experts for free!"
      />
      {!file ? (
        <Box className={classes.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? <DragView /> : <SelectView />}
        </Box>
      ) : (
        <SelectedFile file={file} uploadRef={uploadRef} fileName={auth.uid} />
      )}
    </Box>
  );
};

export default Review;
