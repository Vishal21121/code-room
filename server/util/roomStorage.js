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
    const items = [];
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
    // treeELement.items = items;
    return items;
  } catch (error) {
    throw error;
  }
};

const readFileContent = async (filePath) => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, filePath),
      "utf-8"
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export { createFolderWithRoomName, readFolder, readFileContent };
