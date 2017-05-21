import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const styles = {
  title: { fontSize: '1.2em' },
  mainCategory: typeof window !== 'undefined' && window.matchMedia('(max-width: 1000px)').matches ? { height: '50%' } : {},
};

const buttonColor = '#009e92';

const Landing = () => (
  <div>
    <div className="landing-background">
      <div className="welcome">
        <h2>开启你的时尚之旅</h2>
        <RaisedButton overlayStyle={{ backgroundColor: buttonColor }} label="设计" containerElement={<Link to="/create" />} primary />
        <span style={{ margin: '0 15px 0 15px' }}>或</span>
        <RaisedButton overlayStyle={{ backgroundColor: buttonColor }} backgroundColor={buttonColor} label="购物" containerElement={<Link to="/shop/2" />} primary />
      </div>
    </div>
    <div className="flexlist landing-category">
      <Card className="landing-category-main">
        <CardMedia
          overlayContainerStyle={styles.mainCategory} overlayContentStyle={styles.mainCategory}
          overlay={<CardTitle title="男士" />}
        >
          <img src="//image.spreadshirtmedia.com/content/t_std/f_auto/cms/startpage/tiles/men_us_1609" />
        </CardMedia>
      </Card>
      <div className="landing-sub-cat">
        <div className="flexlist">
          <Card className="category-card">
            <CardMedia
              overlay={<CardTitle titleStyle={styles.title} title="母亲节" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_bgBlack-medium,f_auto/aum/na/designs/1008125251,width=300,height=300,mother\'s day.png" />
            </CardMedia>
          </Card>
          <Card className="category-card">
            <CardMedia
              overlay={<CardTitle titleStyle={styles.title} title="生日特辑" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_bgBlack-medium,f_auto/aum/na/designs/13348114,width=300,height=300,Birthday.png" />
            </CardMedia>
          </Card>
          <Card className="category-card">
            <CardMedia
              overlay={<CardTitle style={styles.cardRoot} titleStyle={styles.title} title="热销单品" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_bgGray-medium,f_auto/aum/na/designs/13114679,width=280,height=280,Favorites.png" />
            </CardMedia>
          </Card>
          <Card className="category-card">
            <CardMedia
              overlay={<CardTitle style={styles.cardRoot} titleStyle={styles.title} title="春季特辑" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_bgBlack-medium,f_auto/v5/aum/na/designs/1010210661,width=280,height=280,Spring.png" />
            </CardMedia>
          </Card>
          <Card className="category-card2">
            <CardMedia
              overlay={<CardTitle style={styles.cardRoot} titleStyle={styles.title} title="手工艺品" />}
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
