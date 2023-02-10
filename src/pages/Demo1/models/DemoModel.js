/*
 * @Author: jinli
 * @Date: 2023-02-09 09:28:01
 * @LastEditTime: 2023-02-09 09:28:14
 * @LastEditors: jinli
 * @Description: 
 * @FilePath: \my-umi\src\pages\Demo1\models\DemoModel.js
 */
export default {
  namespace: 'firstDemoModel',

  state: {
      data: [
          { text: 'fighting', value: 'nine' },
      ],
  },

  effects: {},

  reducers: {
      save(state, payload) {
          return {
              ...state,
              ...payload,
          };
      },
  },
};
