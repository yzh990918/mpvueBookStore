import { mapGetters, mapMutations, mapActions } from 'vuex'
export const playerMixin = {
  computed: {
    ...mapGetters([
      'playing',
      'playlist',
      'sequencelist',
      'mode',
      'currentIndex',
      'currentSong'
    ])
  },
  methods: {
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setPlaylist: 'SET_PLAYLIST',
      setSequenceList: 'SET_SEQUENCE',
      setPlayMode: 'SET_PLAY_MODE',
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    ...mapActions([
      'selectPlay',
      'randomPlay',
      'insertSong'

    ])
  }
}
