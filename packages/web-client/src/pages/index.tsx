import React, { useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import indexPageStyles from '../styles/pages/indexPage';

const useStyles = makeStyles(indexPageStyles);

const IndexPage = (): JSX.Element => {
  const [serverResponse, setServerResponse] = useState(null);
  const onButtonClick = async (): Promise<void> => {
    try {
      const apiResponse = (await axios.get('/api/v1/hello-word')).data;
      setServerResponse(apiResponse);
    } catch (error) {
      console.error(
        `[IndexPage] Unexpected error while calling the server API ${error}`
      );
    }
  };
  const technologies = ['express.jpg', 'nextjs.png', 'ts.png', 'mui.png'];
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          NextJS + Express + MaterialUI + Typescript Monorepo
        </Typography>
        <br />
        <br />
        <Grid container className={classes.root} spacing={1}>
          <Grid item xs={5}>
            <Grid container justify="center" spacing={1}>
              {technologies.map(value => (
                <Grid key={value} item>
                  <Paper className={classes.paper}>
                    <div className={classes.imagesContainer}>
                      <img
                        alt={`Icon for ${value}`}
                        src={`/images/tech/${value}`}
                        className={classes.images}
                      />
                    </div>
                  </Paper>
                </Grid>
              ))}
              <Grid item>
                <br />
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={onButtonClick}
                >
                  Call Server API
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {serverResponse !== null && (
        <Box component="span" display="inline">
          <div>{JSON.stringify(serverResponse, null, 2)}</div>
        </Box>
      )}
    </Container>
  );
};

export default IndexPage;
