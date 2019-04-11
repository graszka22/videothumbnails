import React, { Component } from "react";
import { Platform, StyleSheet, Button, View, Image, Text } from "react-native";
import { getThumbnailAsync } from "expo-video-thumbnails";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default class App extends Component {
  state = {
    buttonTitle: "Take video",
    video: null,
    image: null
  };

  runMyAwesomeFunction = async () => {
    if (!this.state.video) {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const { uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos
      });
      this.setState({ video: uri, buttonTitle: "Generate thumbnail <3" });
    } else {
      const { uri, width, height } = await getThumbnailAsync(this.state.video, {
        time: 3000
      });
      this.setState({ image: uri, width, height });
    }
  };

  render() {
    const { buttonTitle, image, width, height } = this.state;
    return (
      <View style={styles.container}>
        <Button onPress={this.runMyAwesomeFunction} title={buttonTitle} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: width / 5, height: height / 5 }}
          />
        )}
        <Text>{image}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
