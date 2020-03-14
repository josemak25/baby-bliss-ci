import React from 'react';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import { NavigationInterface } from '../../constants';
import { Container } from './styles';
import { ActivityIndicator } from 'react-native';
import { useThemeContext } from '../../theme';
import UserPost from '../../components/userPost';
import { PostInterface } from '../../store/posts/types';

interface RouteContainerProp extends NavigationInterface {
  testID?: string;
  categoryId: string;
  handleLikePost(
    id: string,
    postIndex: number,
    categoryId: string,
    oldLikeState: boolean
  ): void;
  navigateToPost(item: PostInterface): void;
}

const RouteContainer = (props: RouteContainerProp) => {
  const [{ grid, categoryState }] = useStoreContext();
  const { colors } = useThemeContext();
  const posts = categoryState.communityPosts[props.categoryId];

  const onEndReached = () => {};

  return (
    <Container>
      {posts ? (
        <OptimizedFlatList
          data={posts}
          renderItem={({ item, index }) => (
            <UserPost
              {...item}
              postIndex={index}
              width={grid.cardSize}
              navigation={() => props.navigateToPost(item)}
              handleLikePost={props.handleLikePost}
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

export default React.memo(RouteContainer);
