#!/bin/bash

# helpers
bold=$(tput bold)
normal=$(tput sgr0)

# functions
function quit {
  echo "Cancelled by user."
  exit
}

# destination where to install polyclick-starter
DESTINATION=$(pwd)

# default 3d engine to use
ENGINE="threejs"




##########################################
# DEFINE DESTINATION
##########################################

# check if argument was given
if [ $# -eq 1 ]; then

  # destination was set externally
  DESTINATION=`cd "$1"; pwd`

else

  # ask where to install
  read -e -p "Enter full path where to install 'polyclick-starter' [$DESTINATION]: " INPUT
  if [ -n "$INPUT" ]; then
    DESTINATION=$INPUT
  fi
fi





##########################################
# ASK FOR 3D ENGINE
##########################################

# ask user for 3d engine to use (three.js = default, stack.gl)
read -r -p "Which 3d engine do you want to use? [t]hree.js or [s]tack.gl: " response
response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
if [[ $response =~ ^(s|stackgl|stack.gl) ]]; then
  ENGINE="stackgl"
fi





##########################################
# SURE ?
##########################################

# ask user if installing polyclick-starter in destination is ok
read -r -p "Install polyclick-starter in $DESTINATION? [y/n]: " response
response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
if [[ $response =~ ^(yes|y) ]]; then


  ##########################################
  # EXECUTE SCRIPT
  ##########################################

  # check if destination exists, if not, create
  if [ ! -d "$DESTINATION" ]; then
    read -r -p "$DESTINATION does not exists, create? [y/n]: " response
    response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
    if [[ $response =~ ^(yes|y) ]]; then

      # make directory recusively
      mkdir -p $DESTINATION

    else

      quit

    fi
  fi

  # move into the destination
  cd $DESTINATION

  # clone polyclick customized starter
  echo "Cloning ${bold}polyclick-starter${normal}..."
  git clone https://github.com/polyclick/polyclick-starter.git ./temp

  # remove git reference
  rm -rf ./temp/.git

  # move everything up one directory (normal files/folders)
  mv ./temp/* ./

  # dot (.) files starting with a letter
  mv ./temp/.[a-zA-Z0-9]* ./

  # remove temp folder
  rm -rf ./temp

  # npm install & jspm install
  echo "Running ${bold}npm install${normal} & ${bold}jspm install${normal}..."
  npm install && jspm install

  # done
  echo "Install complete. ${bold}Don't forget to cd into the project directory, then run 'gulp' to start.${normal}"
  exit 0

else

  quit

fi
