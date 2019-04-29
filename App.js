import React, { Component } from "react";
import { Platform, StyleSheet, Button, View, Image, Text } from "react-native";
import { getThumbnailAsync } from "expo-video-thumbnails";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default class App extends Component {
  state = {
    video: null,
    image: null
  };

  videoFromGallery = async () => {
    this.setState({ video: null, image: null });
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos
    });
    this.setState({ video: uri });
  };

  videoFromHttp = () => {
    this.setState({
      video: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      image: null
    });
  };

  invalidLocalFile = () => {
    this.setState({ video: "file://loremipsum", image: null });
  };

  invalidHttp = () => {
    this.setState({ video: "http://loremipsum", image: null });
  };

  runMyAwesomeFunction = async () => {
    try {
      const { uri, width, height } = await getThumbnailAsync(this.state.video, {
        time: 120000
      });
      this.setState({ image: uri, width, height });
    } catch (e) {
      console.warn(e);
    }
  };

  render() {
    const { video, image, width, height } = this.state;
    return (
      <View style={styles.container}>
        <Button onPress={this.videoFromGallery} title="Video from gallery" />
        <Button onPress={this.videoFromHttp} title="Video from http" />
        <Button onPress={this.invalidLocalFile} title="Invalid local file" />
        <Button onPress={this.invalidHttp} title="Invalid http" />
        {video && (
          <Button
            onPress={this.runMyAwesomeFunction}
            title="Generate thumbnail <3"
          />
        )}
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
