/* eslint-disable import/no-unresolved */
/* eslint-disable default-case */
import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import image1 from '../assets/images/1.1.jpg';
import image2 from '../assets/images/1.2.jpg';
import image3 from '../assets/images/main.jpg';

const recipes = [
  {
    name: 'Cá hồi',
    info: '25min | 2 servings',
    image: image1
  },
  {
    name: 'Rau củ trộn',
    info: '5min | 2 servings',
    image: image2
  }
];
export default function FoodScreen() {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <RecipeBackground source={image3} resizeMode="cover">
        <Header>
          <MenuBar>
            <Back>
              <AntDesign name="arrowleft" size={24} color="#FFF" />
              <Text style={{ marginLeft: 10 }}> Ingredients </Text>
            </Back>
            <AntDesign name="heart" size={24} color="#FFF" />
          </MenuBar>
          <MainRecipe>
            <Text title heavy>
              {' '}
              Mỳ tôm trứng{' '}
            </Text>
            <Divider />
            <Text large bold>
              {' '}
              80 calories per 100g{' '}
            </Text>
            <Text small bold>
              {' '}
              3g fat | 10g protein | 8g carbs{' '}
            </Text>
          </MainRecipe>
          <Button>
            <Text bold small>
              LEARN MORE
            </Text>
          </Button>
        </Header>
      </RecipeBackground>
      <RecipesContainer>
        <Text dark large heavy>
          {' '}
          Recipes{' '}
        </Text>
        <Text dark small bold>
          {' '}
          18 recipes available{' '}
        </Text>
        <Recipes>
          {recipes.map((recipe, index) => (
            <Recipe key={index}>
              <RecipeImage source={recipe.image} />
              <RecipeInfo>
                <Text dark heavy large>
                  {' '}
                  {recipe.name}{' '}
                </Text>
                <Text dark small>
                  {' '}
                  {recipe.info}{' '}
                </Text>
              </RecipeInfo>
              <AntDesign name="heart" size={20} color="red" />
            </Recipe>
          ))}
        </Recipes>
      </RecipesContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const RecipeBackground = styled.ImageBackground`
  width: 100%;
`;
const Header = styled.View`
  width: 100%;
`;

const MenuBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const Back = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  color: ${props => (props.dark ? '#000' : '#FFF')};

  ${({ title, large, small }) => {
    switch (true) {
      case title:
        return `font-size: 32px`;
      case large:
        return `font-size: 20px`;
      case small:
        return `font-size: 13px`;
    }
  }}

  ${({ bold, heavy }) => {
    switch (true) {
      case bold:
        return `font-weight: 600`;
      case heavy:
        return `font-weight: 700`;
    }
  }}
`;

const MainRecipe = styled.View`
  margin: 180px 0px 32px 0px;
  padding: 0 32px;
`;

const Divider = styled.View`
  border-bottom-color: #ffffff;
  border-bottom-width: 2px;
  width: 200px;
  margin: 8px 0px;
`;
const Button = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.3);
  padding: 6px 18px;
  align-self: flex-start;
  margin: 0px 0px 48px 32px;
  border-radius: 100px;
`;

const RecipesContainer = styled.View`
  margin-top: -24px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 32px;
  background-color: #ffffff;
`;

const Recipes = styled.View`
  margin-top: 16px;
`;
const Recipe = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const RecipeImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;
const RecipeInfo = styled.View`
  flex-grow: 1;
  flex-direction: column;
  margin-left: 12px;
`;

const ScrollView = styled.ScrollView`
  margin-top: -24px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 32px;
  background-color: #ffffff;
`;
