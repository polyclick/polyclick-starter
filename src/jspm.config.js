SystemJS.config({
  paths: {
    "github:": "lib/github/",
    "npm:": "lib/npm/"
  },
  browserConfig: {
    "paths": {
      "polyclick-starter/": "/src/"
    }
  },
  nodeConfig: {
    "paths": {
      "polyclick-starter/": "src/"
    }
  },
  devConfig: {
    "map": {
      "babel-runtime": "npm:babel-runtime@5.8.35",
      "core-js": "npm:core-js@1.2.6",
      "fs": "npm:jspm-nodelibs-fs@0.2.1",
      "path": "npm:jspm-nodelibs-path@0.2.3",
      "process": "npm:jspm-nodelibs-process@0.2.1",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.21"
    },
    "packages": {
      "npm:babel-runtime@5.8.35": {
        "map": {}
      },
      "npm:core-js@1.2.6": {
        "map": {
          "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime"
    ]
  },
  map: {
    "babel": "npm:babel-core@5.8.35"
  },
  packages: {
    "polyclick-starter": {
      "main": "js/app.js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "dat-gui": "npm:dat-gui@0.5.0",
    "gsap": "npm:gsap@1.20.3",
    "three": "github:mrdoob/three.js@master"
  },
  packages: {
    "github:mrdoob/three.js@master": {
      "map": {
        "./loaders/MTLLoader": "./examples/js/loaders/MTLLoader.js",
        "./loaders/OBJLoader": "./examples/js/loaders/OBJLoader.js",
        "./controls/OrbitControls.js": "./examples/js/controls/OrbitControls.js"
      },
      "meta": {
        "examples/js/loaders/MTLLoader.js": {
          "globals": {
            "THREE": "three"
          },
          "exports": "THREE.MTLLoader",
          "format": "global"
        },
        "examples/js/loaders/OBJLoader.js": {
          "globals": {
            "THREE": "three"
          },
          "exports": "THREE.OBJLoader",
          "format": "global"
        },
        "examples/js/controls/OrbitControls.js": {
          "globals": {
            "THREE": "three"
          },
          "exports": "THREE.OrbitControls",
          "format": "global"
        }
      }
    }
  }
});
