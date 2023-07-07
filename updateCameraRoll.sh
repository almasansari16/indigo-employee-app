#!/bin/bash

# Assign the filename
filename="node_modules/@react-native-community/cameraroll/android/src/main/java/com/reactnativecommunity/cameraroll/CameraRollModule.java"


search="retriever.release();"
replace="try {retriever.release();} catch (IOException e) { e.printStackTrace(); }"

if [[ $search != "" && $replace != "" ]]; then
# sed -i '' 's/retriever.release();/  s/try {retriever.release();} catch (IOException ex) { e.printStackTrace(); }/' $filename

sed -i '' "s|${search}|${replace}|g" $filename

fi