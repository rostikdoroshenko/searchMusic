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
  listeners: string,
  mbid: string,
  streamable: {},
  url: string,
  image: Image[]
}

export interface Artist {
  mbid: string,
  name: string,
  url: string
}

export interface Image {
  '#text': string,
  size: string
}
