import React from 'react';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import UserPost from '../../components/userPost';
import { Container } from './styles';
import { NavigationInterface } from '../../constants';
import { ActivityIndicator } from 'react-native';
import { useThemeContext } from '../../theme';

interface GeneralRouteContainerProp extends NavigationInterface {
  testID?: string;
}

const GeneralRouteContainer = (props: GeneralRouteContainerProp) => {
  const [{ grid, postState, userState }, dispatch] = useStoreContext();
  const { colors } = useThemeContext();

  const onEndReached = () => {};

  return (
    <Container>
      {postState.posts.length ? (
        <OptimizedFlatList
          data={postState.posts}
          renderItem={({ item, index }) => (
            <UserPost
              {...item}
              postIndex={index}
              width={grid.cardSize}
              navigation={() =>
                props.navigation.navigate('UserBlogDetailsScreen', {
                  post: item
                })
              }
            />
          )}
          key={grid.numOfColumn}
          keyExtractor={(_, key: number) => `${key}`}
          numColumns={grid.numOfColumn}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0, alignItems: 'center' }}
          style={{ width: '100%' }}
          onEndReached={onEndReached}
          onRefresh={false}
        />
      ) : (
        <ActivityIndicator
          size="large"
          color={colors.POST_TIP_COLOR}
          style={{ position: 'absolute', top: 100 }}
        />
      )}
    </Container>
  );
};

export default React.memo(GeneralRouteContainer);
