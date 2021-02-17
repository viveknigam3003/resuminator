import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Fragment } from "react";

const useStyles = makeStyles({
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

const TitleText = ({ title, subtitle }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="h2" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        {subtitle}
      </Typography>
    </Fragment>
  );
};

export default TitleText;
