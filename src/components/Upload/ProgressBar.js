import { Box, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
    progress: {
        margin: "2rem 1rem 2rem 0",
        width: "20rem",
    }
}))

const ProgressBar = ({value}) => {
    const classes = useStyles()
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <LinearProgress
            className={classes.progress}
            variant="determinate"
            value={value}
          />
          <Typography>{value}%</Typography>
        </Box>
    )
}

export default ProgressBar
