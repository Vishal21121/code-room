const fileIconsObject = [
  { icon: "react", extensions: ["jsx", "tsx"] },
  { icon: "typescript", extensions: ["ts"] },
  { icon: "html", extensions: ["html", "htm", "xhtml", "html_vm", "asp"] },
  { icon: "markdown", extensions: ["md", "markdown", "rst"] },
  { icon: "css", extensions: ["css"] },
  {
    icon: "nodejs",
    fileNames: [
      "package.json",
      "package-lock.json",
      ".nvmrc",
      ".esmrc",
      ".node-version",
    ],
  },
  {
    icon: "json",
    extensions: ["json", "jsonc", "tsbuildinfo", "json5", "jsonl", "ndjson"],
    fileNames: [
      ".jscsrc",
      ".jshintrc",
      "composer.lock",
      ".jsbeautifyrc",
      ".esformatter",
      "cdp.pid",
      ".lintstagedrc",
      ".whitesource",
    ],
  },
  { icon: "javascript", extensions: ["esx", "mjs"] },
  { icon: "react", extensions: ["jsx"] },
  { icon: "react_ts", extensions: ["tsx"] },
  {
    icon: "javascript-map",
    extensions: ["js.map", "mjs.map", "cjs.map"],
  },
  {
    icon: "git",
    extensions: ["patch"],
    fileNames: [
      ".git",
      ".gitignore",
      ".gitmessage",
      ".gitignore-global",
      ".gitignore_global",
      ".gitattributes",
      ".gitattributes-global",
      ".gitattributes_global",
      ".gitconfig",
      ".gitmodules",
      ".gitkeep",
      ".keep",
      ".gitpreserve",
      ".gitinclude",
      ".git-blame-ignore",
      ".git-blame-ignore-revs",
      ".git-for-windows-updater",
      "git-history",
    ],
  },
  {
    icon: "vite",
    fileNames: [
      "vite.config.js",
      "vite.config.mjs",
      "vite.config.cjs",
      "vite.config.ts",
      "vite.config.cts",
      "vite.config.mts",
    ],
  },
  {
    icon: "eslint",
    fileNames: [
      ".eslintrc-md.js",
      ".eslintrc-jsdoc.js",
      ".eslintignore",
      ".eslintcache",
      ".eslintrc.base.json",
      ".eslintrc.cjs",
    ],
  },
  { icon: "svg", extensions: ["svg"] },
];

const langObject = [
  { language: "javascript", extensions: ["jsx", "js"] },
  { language: "typescript", extensions: ["ts", "tsx"] },
  { language: "html", extensions: ["html", "htm", "xhtml", "html_vm", "asp"] },
  { language: "markdown", extensions: ["md", "markdown", "rst"] },
  { language: "css", extensions: ["css"] },
  {
    language: "json",
    fileNames: [
      "package.json",
      "package-lock.json",
      ".nvmrc",
      ".esmrc",
      ".node-version",
    ],
  },
  {
    language: "json",
    extensions: ["json", "jsonc", "tsbuildinfo", "json5", "jsonl", "ndjson"],
    fileNames: [
      ".jscsrc",
      ".jshintrc",
      "composer.lock",
      ".jsbeautifyrc",
      ".esformatter",
      "cdp.pid",
      ".lintstagedrc",
      ".whitesource",
      ".eslintrc.base.json",
    ],
  },
  { language: "javascript", extensions: ["esx", "mjs"] },
  {
    language: "javascript",
    extensions: ["js.map", "mjs.map", "cjs.map"],
  },
  {
    language: "json",
    extensions: ["patch"],
    fileNames: [
      ".git",
      ".gitignore",
      ".gitmessage",
      ".gitignore-global",
      ".gitignore_global",
      ".gitattributes",
      ".gitattributes-global",
      ".gitattributes_global",
      ".gitconfig",
      ".gitmodules",
      ".gitkeep",
      ".keep",
      ".gitpreserve",
      ".gitinclude",
      ".git-blame-ignore",
      ".git-blame-ignore-revs",
      ".git-for-windows-updater",
      "git-history",
    ],
  },
  {
    language: "javascript",
    fileNames: [
      "vite.config.js",
      "vite.config.mjs",
      "vite.config.cjs",
      "vite.config.ts",
      "vite.config.cts",
      "vite.config.mts",
    ],
  },
  {
    language: "javascript",
    fileNames: [
      ".eslintrc-md.js",
      ".eslintrc-jsdoc.js",
      ".eslintignore",
      ".eslintcache",
      ".eslintrc.cjs",
    ],
  },
  { language: "svg", extensions: ["svg"] },
];

const folderIconObject = [
  {
    name: "folder-robot",
    folderNames: ["bot", "robot"],
  },
  {
    name: "folder-src",
    folderNames: ["src", "srcs", "source", "sources", "code"],
  },
  {
    name: "folder-dist",
    folderNames: ["dist", "out", "build", "release", "bin"],
  },
  {
    name: "folder-css",
    folderNames: ["css", "stylesheet", "stylesheets", "style", "styles"],
  },
  {
    name: "folder-images",
    folderNames: [
      "images",
      "image",
      "imgs",
      "img",
      "icons",
      "icon",
      "icos",
      "ico",
      "figures",
      "figure",
      "figs",
      "fig",
      "screenshot",
      "screenshots",
      "screengrab",
      "screengrabs",
      "pic",
      "pics",
      "picture",
      "pictures",
      "photo",
      "photos",
      "photograph",
      "photographs",
    ],
  },
  {
    name: "folder-scripts",
    folderNames: ["script", "scripts", "scripting"],
  },
  { name: "folder-node", folderNames: ["node_modules"] },
  {
    name: "folder-javascript",
    folderNames: ["js", "javascript", "javascripts"],
  },
  { name: "folder-json", folderNames: ["json", "jsons"] },
  { name: "folder-github", folderNames: ["github"] },
  { name: "folder-gitlab", folderNames: ["gitlab"] },
  { name: "folder-vscode", folderNames: ["vscode", "vscode-test"] },
  {
    name: "folder-views",
    folderNames: [
      "view",
      "views",
      "screen",
      "screens",
      "page",
      "pages",
      "public_html",
      "html",
    ],
  },
  {
    name: "folder-components",
    folderNames: ["components", "widget", "widgets", "fragments"],
  },
  {
    name: "folder-public",
    folderNames: [
      "public",
      "www",
      "wwwroot",
      "web",
      "website",
      "site",
      "browser",
      "browsers",
    ],
  },
  {
    name: "folder-resource",
    folderNames: [
      "resource",
      "resources",
      "res",
      "asset",
      "assets",
      "static",
      "report",
      "reports",
    ],
  },
  {
    name: "folder-hook",
    folderNames: ["hook", "hooks", "trigger", "triggers"],
  },
  {
    name: "folder-utils",
    folderNames: ["util", "utils", "utility", "utilities"],
  },
  { name: "folder-app", folderNames: ["app", "apps"] },
];

export const fileIconFinder = (fileName) => {
  const fileExtension = fileName.split(".")[1];
  const iconName = fileIconsObject.find((el) => {
    if (el?.fileNames?.includes(fileName)) {
      return el;
    } else if (el?.extensions?.includes(fileExtension)) {
      return el;
    }
  });
  return iconName?.icon;
};

export const languageFind = (fileExtension) => {
  const el = langObject.find((el) => el?.extensions?.includes(fileExtension));
  let language = el?.language || "javascript";
  return language;
};

export const folderIconFinder = (folderName) => {
  const folderElement = folderIconObject.find((folder) =>
    folder.folderNames.includes(folderName)
  );
  return folderElement?.name || null;
};

// console.log(languageFind("htmx"));
// console.log(folderIconFinder("app"));
