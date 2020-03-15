
export const playing = state => state.playing

export const playlist = state => state.playlist

export const sequencelist = state => state.sequencelist

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
