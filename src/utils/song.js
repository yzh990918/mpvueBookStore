// 创建song对象
export default class Song {
  constructor ({
    id,
    singer,
    name,
    album,
    image,
    mv,
    url
  }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.image = image
    this.mv = mv
    this.url = url
  }
}

export function createSong (music) {
  return new Song({
    id: music.id,
    singer: filterSinger(music.ar),
    name: music.name,
    album: music.al.name, // 专辑名
    image: music.al.picUrl,
    mv: music.mv,
    url: `https://music.linkorg.club/song/url?id=${music.id}`
  })
}
/**
*
*
* @param {*} singer 歌手
* @returns 如果出现一首歌曲多个人演唱的情况 map方法返回一个新数组 里面是处理好的name数组 用/隔开
*/
function filterSinger (singer) {
  let name = []
  name = singer.map((item) => {
    return item.name
  })
  return name.join('/')
}
