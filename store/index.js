export const state = () => ({
  mode: 'light',
})

export const mutations = {
  set(state, mode) {
    state.mode = mode
  },
}
