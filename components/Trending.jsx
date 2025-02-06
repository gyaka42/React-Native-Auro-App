import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1.1 },
};

const zoomOut = {
  0: { scale: 1.1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const source = { uri: item.video };

  // ✅ Always initialize the player, but don't start playing immediately
  const player = useVideoPlayer(source, (player) => {
    player.loop = false;
    player.muted = true; // Default mute
  });

  // ✅ Only play when `play` is true
  if (play) {
    player.play();
  }

  return (
    <View className="mr-5">
      {play ? (
        <VideoView
          style={{ width: 208, height: 288, borderRadius: 35, marginTop: 12 }}
          player={player}
          allowsFullscreen
          contentFit="contain"
          useNativeControls={true}
          allowsPictureInPicture
        />
      ) : (
        <Animatable.View
          animation={activeItem === item.$id ? zoomIn : zoomOut}
          duration={500}
        >
          <TouchableOpacity
            className="relative justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChange = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChange}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
