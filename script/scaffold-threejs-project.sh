#!/bin/bash

# Destination where to install polyclick-threejs-starter
DESTINATION=$(pwd)

# check if argument was given
if [ $# -eq 1 ]; then

  # destination was set externally
  DESTINATION=`cd "$1"; pwd`

else

  # ask where to install
  read -e -p "Enter full path where to install 'polyclick-threejs-starter' [$DESTINATION]: " INPUT
  if [ -n "$INPUT" ]; then
    DESTINATION=$INPUT
  fi
fi

# ask user if installing polyclick-threejs-starter in destination is ok
read -r -p "Install polyclick-threejs-starter in $DESTINATION? [y/n]: " response
response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
if [[ $response =~ ^(yes|y) ]]; then

  #
  # user answered yes
  # execute script
  #

  # check if destination exists, if not, create
  if [ ! -d "$DESTINATION" ]; then
    read -r -p "$DESTINATION does not exists, create? [y/n]: " response
    response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
    if [[ $response =~ ^(yes|y) ]]; then

      # make directory recusively
      mkdir -p $DESTINATION

    else

      # user answered no
      # cleanup & exit
      echo "Cancelled by user."
      exit 1

    fi
  fi

  # move into the destination
  cd $DESTINATION

  # clone polyclick customized starter
  echo "Cloning polyclick-threejs-starter..."
  git clone https://github.com/polyclick/es6-jspm-gulp-boilerplate.git ./temp

  # remove git reference
  rm -rf ./temp/.git

  # move everything up one directory (normal files/folders)
  mv ./temp/* ./

  # dot (.) files starting with a letter
  mv ./temp/.[a-zA-Z0-9]* ./

  # remove temp folder
  rm -rf ./temp

  # npm install & jspm install
  echo "Running npm install & jspm install..."
  npm install && jspm install

  # done
  echo "Install complete. Don't forget to cd into the project directory, then run 'gulp' to start."
  exit 0

else

  # user answered no
  # cleanup & exit
  echo "Cancelled by user."
  exit 1
fi
