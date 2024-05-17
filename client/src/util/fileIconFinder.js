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

console.log(languageFind("htmx"));
