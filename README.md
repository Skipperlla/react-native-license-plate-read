# React Native License Plate Read

This license plate reader is an application that displays the license plates of the cars on the screen.

# 🚀 Demo

![](https://im3.ezgif.com/tmp/ezgif-3-0a73e013d4.gif)

# How to use

1. Clone the repo.
   First, clone the repo and install the dependencies.

```bash
git clone https://github.com/Skipperlla/react-native-license-plate-read.git
cd react-native-license-plate-read
npm install
```

2. Android for Windows

```bash
yarn android or npm run android
```

3.  Ios for MacOS

```bash
yarn ios or npm run ios
```

3. Android for MacOS

```bash
yarn android:ios or npm run android:ios
```

> **_NOTE:_** If you put the application in debugger mode, the application will not run and you cannot use it due to an error from react-native-vision-camera.

# Notes

Since **yarn android** does not work on my own computer, I wrote an external script myself. If **yarn android** does not work for you, try **yarn android:ios**

# Library Stack Importants

- react-native-vision-camera
- vision-camera-image-labeler
- vision-camera-ocr

## **[react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera)**

VisionCamera is the go-to component when creating React Native apps that require the functionality of using the device's camera. Maintained by the React Native community, this module has support for: Videos. Photographs. Face Detection and etc.

## **[vision-camera-image-labeler](https://github.com/mrousavy/vision-camera-image-labeler)**

A [VisionCamera](https://github.com/mrousavy/react-native-vision-camera) Frame Processor Plugin to label images using [**MLKit Vision** Image Labeling](https://developers.google.com/ml-kit/vision/image-labeling). Its main purpose is the auxiliary library that allows it to define what objects it sees from the camera.

## **[**vision-camera-ocr**](https://github.com/aarongrider/vision-camera-ocr)**

A [VisionCamera](https://github.com/mrousavy/react-native-vision-camera) Frame Processor Plugin to preform text detection on images using [**MLKit Vision** Text Recognition](https://developers.google.com/ml-kit/vision/text-recognition). Its main purpose is the auxiliary library that allows it to define what objects it sees from the camera.

## Examples

```bash

The Text Recognizer segments text into blocks, lines, and elements. Roughly speaking:

a Block is a contiguous set of text lines, such as a paragraph or column,

a Line is a contiguous set of words on the same axis, and

an Element is a contiguous set of alphanumeric characters ("word") on the same axis in most Latin languages, or a character in others
```

# Features

- [ ] Flash support for night use
- [ ] Zoom
- [ ] License plate recognition by selecting photos from the library
- [ ] If there is a matching license plate in the database, displaying the information of that person
- [ ] More optimized code structure

## Show your support

Give a ⭐️ if this project helped you!
