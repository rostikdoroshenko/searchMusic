export interface TopTracks {
  tracks: {
    track: Track[]
  }
}

export interface SearchTracks {
  results: {
    trackmatches: {
      track: Track[]
    }
  }
}

export interface Track {
  name: string,
  duration: string,
  playcount: string,
  artist: Artist | string | any,
  listeners: any,
  mbid: string,
  streamable?: any,
  url: string,
  image: any
}

export interface Artist {
  mbid: string,
  name: string,
  url: string
}

export interface Image {
  '#text': string | Image,
  size: string
}
