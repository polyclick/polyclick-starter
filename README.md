A very opnionated boilerplate template for WebGL based projects.

# How to use

Works best via the scaffolding script in `script/scaffold-project.sh`  
In fact, you only need that script to scaffold the whole project.  
The script will clone the repo, switch branches and put everything into place for you.

## scaffolding script

- download `script/scaffold-project.sh`
- run the script: `sh scaffold-project.sh`
- follow the on-screen instructions

## manually

- pull repo
- `cd` into project dir
- choose which branch you want to use, so switch to `threejs` or `stackgl`
- `npm install`
- `jspm install`
- run `gulp`
- then point your browser to `http://localhost:8080`
