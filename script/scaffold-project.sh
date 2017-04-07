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

# default webgl engine to use
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
  read -e -p "Path to scaffold ${bold}polyclick-starter${normal} to? ($DESTINATION): " INPUT
  if [ -n "$INPUT" ]; then
    DESTINATION=$INPUT
  fi
fi



##########################################
# ASK FOR WEBGL ENGINE
##########################################

# ask user for WebGL engine to use (three.js = default, stack.gl, pixi.js)
read -r -p "Choose preferred ${bold}WebGL framework${normal}: [t]hree.js (3D/2D) / [s]tack.gl (3D/2D) / [p]ixi.js (2D) ? (t): " response
response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
if [[ $response =~ ^(s|stack|stackgl|stack.gl) ]]; then
  ENGINE="stackgl"
fi
if [[ $response =~ ^(p|pixi|pixijs|pixi.js) ]]; then
  ENGINE="pixijs"
fi



##########################################
# SURE ?
##########################################

# ask user if installing polyclick-starter in destination is ok
read -r -p "Install ${bold}polyclick-starter${normal} with ${bold}$ENGINE${normal} in ${bold}$DESTINATION${normal}? [y/n] (y): " response
response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
if [[ $response =~ ^(n|no|nope) ]]; then
  quit
fi



##########################################
# CHECK IF DESTINATION EXISTS
##########################################

# check if destination exists, if not, create
if [ ! -d "$DESTINATION" ]; then
  read -r -p "$DESTINATION does not exists, create? [y/n] (y): " response
  response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
  if [[ $response =~ ^(n|no|nope) ]]; then

    # can't continue, quit
    quit

  else

    # make directory recusively
    mkdir -p $DESTINATION

  fi
fi



##########################################
# EXECUTE MAIN BODY OF SCRIPT
##########################################

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



##########################################
# SPECIFIC CONFIGURATION FOR CHOSEN ENGINE
##########################################

# remove template files for engine we don't need
# install additional libraries depending on the chosen framework

echo "Configuring for ${bold}${ENGINE}${normal}..."

case "$ENGINE" in
  ("threejs")
    rm -rf ./src/js/app.pixi.js
    rm -rf ./src/js/app.stackgl.js

    jspm install three=github:mrdoob/three.js@master -o "{format: 'global'}" ;;

  ("pixijs")
    rm -rf ./src/js/app.js
    mv ./src/js/app.pixi.js ./src/js/app.js
    rm -rf ./src/js/app.stackgl.js

    jspm install pixi.js ;;

  ("stackgl")
    rm -rf ./src/js/app.js
    rm -rf ./src/js/app.pixi.js
    mv ./src/js/app.stackgl.js ./src/js/app.js

    jspm install npm:canvas-fit
    jspm install npm:gl-geometry
    jspm install npm:gl-shader ;;
esac



##########################################
# DONE
##########################################

# done
echo "${bold}Install complete${normal}."
