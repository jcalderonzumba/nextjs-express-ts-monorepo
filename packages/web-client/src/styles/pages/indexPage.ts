import { Theme } from '@material-ui/core';

// eslint-disable-next-line
const indexPageStyles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 80,
    width: 80
  },
  imagesContainer: {
    lineHeight: '80px'
  },
  images: {
    width: 80,
    verticalAlign: 'middle'
  },
  control: {
    padding: theme.spacing(2)
  }
});

export default indexPageStyles;
