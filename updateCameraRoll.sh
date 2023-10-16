# #!/bin/bash

# # Assign the filename
# filename="node_modules/@react-native-community/cameraroll/android/src/main/java/com/reactnativecommunity/cameraroll/CameraRollModule.java"


# search="retriever.release();"
# replace="try {retriever.release();} catch (IOException e) { e.printStackTrace(); }"

# if [[ $search != "" && $replace != "" ]]; then
# # sed -i '' 's/retriever.release();/  s/try {retriever.release();} catch (IOException ex) { e.printStackTrace(); }/' $filename

# sed -i '' "s|${search}|${replace}|g" $filename

# fi


#!/bin/bash

# Assign the filename
filename="node_modules/@react-native-community/cameraroll/android/src/main/java/com/reactnativecommunity/cameraroll/CameraRollModule.java"

search="retriever.release();"
replace="try { retriever.release(); } catch (IOException e) { e.printStackTrace(); }"

if [[ ! -z $search && ! -z $replace ]]; then
  echo "Searching for: $search"
  echo "Replacing with: $replace"
  
  # Use sed command to perform the replacement, and use -i.bak to create a backup file
  sed -i.bak "s|${search}|${replace}|g" "$filename"

  if [ $? -eq 0 ]; then
    echo "File updated successfully."
  else
    echo "Error updating file."
  fi
else
  echo "Search or replace string is empty."
fi

fi

