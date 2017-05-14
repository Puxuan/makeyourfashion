import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <div className="landing-background">
      <div className="welcome">
        <h2>开启你的时尚之旅</h2>
        <RaisedButton label="设计" containerElement={<Link to="/create" />} primary />
      </div>
    </div>
    <div className="flexlist landing-category">
      <Card>
        <CardMedia
          overlay={<CardTitle title="男士" />}
        >
          <img width={200} height={480} src="//image.spreadshirtmedia.com/content/t_std/f_auto/cms/startpage/tiles/men_us_1609" />
        </CardMedia>
      </Card>
      <div style={{maxWidth: '750px'}}>
        <div className="flexlist">
          <Card
            className="category-card"
          >
            <CardMedia
              overlay={<CardTitle title="母亲节特辑" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_bgBlack-medium,f_auto/aum/na/designs/1008125251,width=300,height=300,mother\'s day.png" />
            </CardMedia>
          </Card>
          <Card
            className="category-card"
          >
            <CardMedia
              overlay={<CardTitle title="生日特辑" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_bgBlack-medium,f_auto/aum/na/designs/13348114,width=300,height=300,Birthday.png" />
            </CardMedia>
          </Card>
          <Card
            className="category-card"
          >
            <CardMedia
              overlay={<CardTitle title="热销单品" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_bgGray-medium,f_auto/aum/na/designs/13114679,width=280,height=280,Favorites.png" />
            </CardMedia>
          </Card>
          <Card
            className="category-card"
          >
            <CardMedia
              overlay={<CardTitle title="春季特辑" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_bgBlack-medium,f_auto/v5/aum/na/designs/1010210661,width=280,height=280,Spring.png" />
            </CardMedia>
          </Card>
          <Card
            className="category-card2"
          >
            <CardMedia
              overlay={<CardTitle title="手工艺品" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_std/f_auto/cms/startpage/tiles/accessories_us_1701" />
            </CardMedia>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
