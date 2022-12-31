import { SERVICE_URL } from 'config';
import api from '../api';

const keywordsAppData = [
  {
    id: 1,
    name: 'Sucre',
    location: 'Rayon 16',
    information: 'Prés du farine',
  },
  {
    id: 2,
    name: 'Farine',
    location: 'Rayon 17',
    information: 'Prés du sucre',
  },
  {
    id: 3,
    name: 'Eau',
    location: 'Rayon 18',
    information: 'Prés du farine',
  },
  {
    id: 4,
    name: 'Sucre',
    location: 'Rayon 16',
    information: 'Prés du farine',
  },
  {
    id: 5,
    name: 'Farine',
    location: 'Rayon 17',
    information: 'Prés du sucre',
  },
  {
    id: 6,
    name: 'Eau',
    location: 'Rayon 18',
    information: 'Prés du farine',
  },
  {
    id: 7,
    name: 'Sucre',
    location: 'Rayon 16',
    information: 'Prés du farine',
  },
  {
    id: 8,
    name: 'Farine',
    location: 'Rayon 17',
    information: 'Prés du sucre',
  },
  {
    id: 9,
    name: 'Eau',
    location: 'Rayon 18',
    information: 'Prés du farine',
  },
];

api.onGet(`${SERVICE_URL}/apps/keywords`).reply((config) => {
  const { term, sortBy, pageSize, pageIndex } = config.params;

  let dataList = [...keywordsAppData];

  if (term && term.length > 1) {
    dataList = keywordsAppData.filter(
      (data) =>
        data.name.toLowerCase().includes(term.toLowerCase()) ||
        data.location.toLowerCase().includes(term.toLowerCase()) ||
        data.information.toLowerCase().includes(term.toLowerCase())
    );
  }

  const data = {
    pageSize,
    pageIndex,
    pageCount: Math.ceil(dataList.length / pageSize),
    items: [],
  };

  if (Array.isArray(sortBy) && sortBy.length === 1) {
    dataList.sort((a, b) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sortBy.length; ++i) {
        if (a[sortBy[i].id] > b[sortBy[i].id]) return sortBy[i].desc ? -1 : 1;
        if (a[sortBy[i].id] < b[sortBy[i].id]) return sortBy[i].desc ? 1 : -1;
      }
      return 0;
    });
  }
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  data.items = dataList.slice(startRow, endRow);

  return [200, { ...data }];
});
api.onPost(`${SERVICE_URL}/apps/keywords`).reply((config) => {
  const requestData = JSON.parse(config.data);
  const { item, sortBy, pageSize, pageIndex } = requestData;

  const dataList = [...keywordsAppData];
  // Add item
  dataList.push({ ...item, id: dataList.length + 1 });

  const data = {
    pageSize,
    pageIndex,
    pageCount: Math.ceil(dataList.length / pageSize),
    items: [],
  };

  if (Array.isArray(sortBy) && sortBy.length === 1) {
    dataList.sort((a, b) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sortBy.length; ++i) {
        if (a[sortBy[i].id] > b[sortBy[i].id]) return sortBy[i].desc ? -1 : 1;
        if (a[sortBy[i].id] < b[sortBy[i].id]) return sortBy[i].desc ? 1 : -1;
      }
      return 0;
    });
  }
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  data.items = dataList.slice(startRow, endRow);

  return [200, { ...data }];
});

api.onPut(`${SERVICE_URL}/apps/keywords`).reply((config) => {
  const requestData = JSON.parse(config.data);
  const { item, sortBy, pageSize, pageIndex } = requestData;
  let dataList = [...keywordsAppData];
  // Update item
  dataList = dataList.map((x) => (x.id === item.id ? item : x));

  const data = {
    pageSize,
    pageIndex,
    pageCount: Math.ceil(dataList.length / pageSize),
    items: [],
  };

  if (Array.isArray(sortBy) && sortBy.length === 1) {
    dataList.sort((a, b) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sortBy.length; ++i) {
        if (a[sortBy[i].id] > b[sortBy[i].id]) return sortBy[i].desc ? -1 : 1;
        if (a[sortBy[i].id] < b[sortBy[i].id]) return sortBy[i].desc ? 1 : -1;
      }
      return 0;
    });
  }
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  data.items = dataList.slice(startRow, endRow);

  return [200, { ...data }];
});
api.onDelete(`${SERVICE_URL}/apps/keywords`).reply((config) => {
  const { ids, sortBy, pageSize, pageIndex } = config;

  let dataList = [...keywordsAppData];
  // Delete item
  dataList = dataList.filter((x) => !ids.includes(x.id));

  const data = {
    pageSize,
    pageIndex,
    pageCount: Math.ceil(dataList.length / pageSize),
    items: [],
  };

  if (Array.isArray(sortBy) && sortBy.length === 1) {
    dataList.sort((a, b) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sortBy.length; ++i) {
        if (a[sortBy[i].id] > b[sortBy[i].id]) return sortBy[i].desc ? -1 : 1;
        if (a[sortBy[i].id] < b[sortBy[i].id]) return sortBy[i].desc ? 1 : -1;
      }
      return 0;
    });
  }
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  data.items = dataList.slice(startRow, endRow);

  return [200, { ...data }];
});
