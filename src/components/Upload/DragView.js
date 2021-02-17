import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { FiUpload } from 'react-icons/fi'

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

const DragView = () => {
    const classes = useStyles();
    return (
        <Box>
        <FiUpload color="primary" className={classes.icon} />
        <Typography className={classes.root}>
          Drop files here! Only PDF files supported.
        </Typography>
      </Box>
    )
}

export default DragView
