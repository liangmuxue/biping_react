import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


// 模拟请求设置
const mock = new MockAdapter(axios);
// 模拟任意GET请求到 /messageList
mock.onGet('/userLogin').reply(200, {
  flag: 0,
  data: { token: '21qwerscv1e2321' },
});
// 模拟任意GET请求到 /messageList
mock.onGet('/messageList').reply(200, {
  flag: 0,
  data: [{
    mid: 111, title: 'NEO日本见面会', content: 'NEO日本见面会xxxxx', tagName: '币事件', tagId: 22141, readCnt: 1000, time: '刚刚',
  },
  {
    mid: 112, title: 'NEO日本见面会', content: 'NEO日本见面会xxxxx', tagName: '币事件', tagId: 22143, readCnt: 1000, time: '刚刚',
  }],
  pager: {
    totalElements: 11,
    totalPages: 2,
    number: 1,
  },
});
// 模拟任意GET请求到 /messageList
mock.onGet('/messageDetail').reply(200, {
  flag: 0,
  data: {
    title: 'NEO日本见面会',
    content: 'NEO日本见面会xxxxx',
    tagName: '币事件',
    tagId: 22141,
    readCnt: 1000,
    time: '刚刚',
    relateMsg: [{ id: 241, title: 'BTC开展有奖竞赛' }, { id: 242, title: 'CAPP进行空投' }],
  },
  pager: {
    totalElements: 11,
    totalPages: 2,
    number: 1,
  },
});
