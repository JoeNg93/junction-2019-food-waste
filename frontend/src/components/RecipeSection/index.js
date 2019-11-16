import React from 'react';
import { Card, Rate, Icon } from 'antd';
import { css, StyleSheet } from 'aphrodite';
import style from '../../constants/styleVariables';

const { Meta } = Card;

const data = [
  {
    name: 'Gluteeniton perunalaatikko',
    rating: 4,
    time: 60,
    imageName: 'recipe_1.jpeg'
  },
  {
    name: 'Joulukakku',
    rating: 5,
    time: 60,
    imageName: 'recipe_2.jpeg'
  },
  {
    name: 'Serranonkinkkusipsit',
    rating: 5,
    time: 15,
    imageName: 'recipe_3.jpeg'
  },
  {
    name: 'Peltirosolli',
    rating: 5,
    time: 30,
    imageName: 'recipe_4.jpeg'
  }
]
const RecipeSection = () => {
  return (
    <div className={css(styles.container)}>
      <h1 className={css(styles.title)}>Recommened Recipes</h1>
      {data.map(ele => (
        <div key={ele.name}>
          <Card
            hoverable
            style={{ width: '100%', marginBottom: 20 }}
            cover={<img alt="product-img" src={require(`../../assets/${ele.imageName}`)} />}
          >
            <Meta title={<p style={{color: style.primaryColor}}>{ele.name}</p>} description={
            <>
              <div>
                <Rate allowHalf defaultValue={ele.rating} />
              </div>
              <div>
                <Icon type="clock-circle" /> {ele.time} mins
              </div>
            </>} />
          </Card>
        </div>
      ))}
    </div>
  )
}

const styles = StyleSheet.create({
  container : {
    paddingBottom: 70,
    paddingTop: 50
  },
  title: {
    marginBottom: 32,
    color: style.primaryTextColor,
    fontWeight: 600,
    paddingLeft: 10
  }
})

export default RecipeSection;