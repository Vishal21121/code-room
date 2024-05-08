const explorer = {
  id: "1",
  name: "root",
  isFolder: true,
  inputStat: {
    visible: false,
    isFolder: null,
  },
  isExpanded: false,
  isSelected: false,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      inputStat: {
        visible: false,
        isFolder: null,
      },
      isExpanded: false,
      isSelected: false,
      items: [
        {
          id: "3",
          name: "public nested 1",
          isFolder: true,
          inputStat: {
            visible: false,
            isFolder: null,
          },
          isExpanded: false,
          isSelected: false,
          items: [
            {
              id: "4",
              name: "index.html",
              isFolder: false,
              inputStat: {
                visible: null,
                isFolder: null,
              },
              isExpanded: null,
              isSelected: false,
              items: [],
            },
            {
              id: "5",
              name: "hello.html",
              isFolder: false,
              inputStat: {
                visible: null,
                isFolder: null,
              },
              isExpanded: null,
              isSelected: false,
              items: [],
            },
          ],
        },
        {
          id: "6",
          name: "public_nested_file",
          isFolder: false,
          inputStat: {
            visible: null,
            isFolder: null,
          },
          isExpanded: null,
          isSelected: false,
          items: [],
        },
      ],
    },
    {
      id: "7",
      name: "src",
      isFolder: true,
      inputStat: {
        visible: false,
        isFolder: null,
      },
      isExpanded: false,
      isSelected: false,
      items: [
        {
          id: "8",
          name: "App.js",
          isFolder: false,
          inputStat: {
            visible: null,
            isFolder: null,
          },
          isExpanded: null,
          isSelected: false,
          items: [],
        },
        {
          id: "9",
          name: "Index.js",
          isFolder: false,
          inputStat: {
            visible: null,
            isFolder: null,
          },
          isExpanded: null,
          isSelected: false,
          items: [],
        },
        {
          id: "10",
          name: "styles.css",
          isFolder: false,
          inputStat: {
            visible: null,
            isFolder: null,
          },
          isExpanded: null,
          isSelected: false,
          items: [],
        },
      ],
    },
    {
      id: "11",
      name: "package.json",
      isFolder: false,
      inputStat: {
        visible: null,
        isFolder: null,
      },
      isExpanded: null,
      isSelected: false,
      items: [],
    },
  ],
};

export default explorer;
