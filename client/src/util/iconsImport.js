import react from "../assets/icons/react.svg";
import javascript from "../assets/icons/javascript.svg";
import typescript from "../assets/icons/typescript.svg";
import html from "../assets/icons/html.svg";
import markdown from "../assets/icons/markdown.svg";
import css from "../assets/icons/css.svg";
import react_ts from "../assets/icons/react_ts.svg";
import git from "../assets/icons/git.svg";
import nodejs from "../assets/icons/nodejs.svg";
import vite from "../assets/icons/vite.svg";
import jsMap from "../assets/icons/javascript-map.svg";
import eslint from "../assets/icons/eslint.svg";
import svg from "../assets/icons/svg.svg";

// Folder icons
import folderRobot from "../assets/icons/folder-robot.svg";
import folderSrc from "../assets/icons/folder-src.svg";
import folderDist from "../assets/icons/folder-dist.svg";
import folderCss from "../assets/icons/folder-css.svg";
import folderImages from "../assets/icons/folder-images.svg";
import folderScripts from "../assets/icons/folder-scripts.svg";
import folderNode from "../assets/icons/folder-node.svg";
import folderJson from "../assets/icons/folder-json.svg";
import folderGitHub from "../assets/icons/folder-github.svg";
import folderGitLab from "../assets/icons/folder-gitlab.svg";
import folderVscode from "../assets/icons/folder-vscode.svg";
import folderViews from "../assets/icons/folder-views.svg";
import folderComponents from "../assets/icons/folder-components.svg";
import folderPublic from "../assets/icons/folder-public.svg";
import folderResource from "../assets/icons/folder-resource.svg";
import folderHook from "../assets/icons/folder-hook.svg";
import folderUtils from "../assets/icons/folder-utils.svg";
import folderApp from "../assets/icons/folder-app.svg";

const fileMap = {
  react: react,
  javascript: javascript,
  typescript: typescript,
  html: html,
  markdown: markdown,
  css: css,
  react_ts: react_ts,
  git: git,
  nodejs: nodejs,
  vite: vite,
  "javascript-map": jsMap,
  eslint: eslint,
  svg: svg,
};

const folderMap = {
  "folder-Robot": folderRobot,
  "folder-src": folderSrc,
  "folder-dist": folderDist,
  "folder-css": folderCss,
  "folder-images": folderImages,
  "folder-scripts": folderScripts,
  "folder-node": folderNode,
  "folder-json": folderJson,
  "folder-github": folderGitHub,
  "folder-gitlab": folderGitLab,
  "folder-vscode": folderVscode,
  "folder-views": folderViews,
  "folder-components": folderComponents,
  "folder-public": folderPublic,
  "folder-resource": folderResource,
  "folder-hook": folderHook,
  "folder-utils": folderUtils,
  "folder-app": folderApp,
};

export const returnIconFromName = (iconName) => {
  return fileMap[iconName];
};

export const rerturnFolderIconFromName = (iconName) => {
  return folderMap[iconName];
};
