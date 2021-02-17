import { Box, makeStyles, Typography } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import DragView from "../Upload/DragView";
import SelectView from "../Upload/SelectView";
import SelectedFile from "./SelectedFile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "5rem 2rem 10rem 2rem",
  },
  title: {
    fontFamily: "Manrope",
    fontWeight: 600,
    paddingBottom: "2rem",
  },
  subtitle: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "1.2rem",
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
  const onDrop = useCallback((acceptedFile) => setFile(acceptedFile[0]), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "application/pdf",
    maxFiles: 1,
    onDrop,
  });

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Supercharge your resume! ⚡
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        Submit one resume built using Resuminator for review. We'll get it
        reviewed by the experts for free!
      </Typography>
      {!file ? (
        <Box className={classes.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? <DragView /> : <SelectView />}
        </Box>
      ) : (
        <SelectedFile file={file} />
      )}
    </Box>
  );
};

export default Review;
