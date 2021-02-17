import { Box, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "10rem 12rem 20rem 12rem",
    "@media (max-width:768px)": {
        padding: "5rem 4rem 10rem 4rem",
      },
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
});

const Submitted = ({ meta }) => {
  const submitDate = new Date(meta.timeCreated).toLocaleDateString();

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Your resume is under review! 👀
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        You submitted your resume on {submitDate}. We shall be contacting you
        soon through your email. If you have any doubts or you wish to cancel
        the review, write to us at{" "}
        <Link href="mailto:hello@resuminator.in">hello@resuminator.in</Link>
      </Typography>
    </Box>
  );
};

export default Submitted;
