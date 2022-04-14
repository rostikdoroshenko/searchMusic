export interface TopTracksList {
  tracks?: {
    track: Track[],
    //attr: {}
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

export interface SearchResults {
  results: {
    trackmatches: {
      track: Track[]
    }
  }
}

export interface Image {
  '#text': string,
  size: string
}
