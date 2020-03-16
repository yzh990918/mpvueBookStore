import { mapGetters, mapMutations } from 'vuex'
export const playerMixin = {
  computed: {
    ...mapGetters([
      'playing',
      'playlist',
      'sequencelist',
      'mode',
      'currentIndex',
      'currentSong',
      'playingTime',
      'audio',
      'isplay',
      'currentSong',
      'flag'

    ])
  },
  methods: {
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setPlaylist: 'SET_PLAYLIST',
      setSequenceList: 'SET_SEQUENCE',
      setPlayMode: 'SET_PLAY_MODE',
      setCurrentIndex: 'SET_CURRENTINDEX',
      setIsplay: 'SET_ISPLAY',
      setCurrentSong: 'SET_CURRENTSONG',
      setTime: 'SET_PLAYINGTIME',
      setAduio: 'STE_AUDIO',
      setflag: 'SET_FLAG'

    })
  }
}
