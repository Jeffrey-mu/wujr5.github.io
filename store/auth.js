export const state = () => ({
  writeKey: '',
});

export const mutations = {
  setWriteKey(state, key) {
    state.writeKey = key;
  },
};
