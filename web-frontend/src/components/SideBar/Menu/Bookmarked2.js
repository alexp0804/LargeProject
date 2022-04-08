import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import image from '../../../assets/images/meatballs.jpg'

function FeaturedPost2(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              Spaghetti & Meatballs 
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Country of Origin: Italy 
            </Typography>
            <Typography variant="subtitle1" paragraph>
            What could be more Italian than Spaghetti and Meatballs? It’s a true Italian classic and will easily become one of your family’s favorite meals.
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Recipe
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={image}
            alt="food"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

// FeaturedPost.propTypes = {
//   post: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageLabel: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default FeaturedPost2;