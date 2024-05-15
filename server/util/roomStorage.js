import fsPromises from "fs/promises";
import fsextra from "fs-extra";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createFolderWithRoomName = async (roomName) => {
  const oldPath = path.join(__dirname, "../.././", "templates/react-vite");
  const newPath = path.join(__dirname, "../.././", "rooms", `${roomName}`);
  try {
    if (!fs.existsSync(newPath)) {
      await fsPromises.mkdir(newPath);
      //   copy the template in that
      await fsextra.copy(oldPath, newPath);
      console.log("created folder");
    }
  } catch (error) {
    throw error;
  }
};

const readFolder = async (folderPath) => {
  try {
    const treeELement = {
      id: "1",
      name: "root",
      isFolder: true,
      inputStat: {
        visible: false,
        isFolder: null,
      },
      isExpanded: false,
      isSelected: false,
      items: [],
    };
    const items = [];
    // if reading content of a sub-folder
    if (folderPath) {
      const data = await fsPromises.readdir(path.join(__dirname, folderPath));
      const promises = data.map(async (element) => {
        const stats = await fsPromises.stat(
          path.join(__dirname, folderPath, element)
        );
        if (stats.isFile()) {
          items.push({
            id: uuidv4(),
            name: element,
            isFolder: false,
            inputStat: {
              visible: null,
              isFolder: null,
            },
            isExpanded: null,
            isSelected: false,
            items: [],
          });
        } else {
          items.push({
            id: uuidv4(),
            name: element,
            isFolder: true,
            inputStat: {
              visible: false,
              isFolder: null,
            },
            isExpanded: false,
            isSelected: false,
            items: [],
          });
        }
      });
      await Promise.all(promises);
      treeELement.items = items;
      return treeELement;
    }
    // if reading content of a root-folder
    const data = await fsPromises.readdir(path.join(__dirname));
    const promises = data.map(async (element) => {
      const stats = await fsPromises.stat(path.join(__dirname, element));
      if (stats.isFile()) {
        treeELement.items.push({
          id: uuidv4(),
          name: element,
          isFolder: false,
          inputStat: {
            visible: null,
            isFolder: null,
          },
          isExpanded: null,
          isSelected: false,
          items: [],
        });
      } else {
        treeELement.items.push({
          id: uuidv4(),
          name: element,
          isFolder: true,
          inputStat: {
            visible: false,
            isFolder: null,
          },
          isExpanded: false,
          isSelected: false,
          items: [],
        });
      }
    });
    await Promise.all(promises);
    return treeELement;
  } catch (error) {
    throw error;
  }
};

export { createFolderWithRoomName, readFolder };
