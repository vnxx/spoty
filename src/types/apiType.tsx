export interface apiMeType {
	country: string,
	display_name: string,
	explicit_content: {
		filter_enabled: boolean,
		filter_locked: boolean
	},
	external_urls: {
		spotify: string
	},
	spotify: string,
	followers: {
		href: null | string,
		total: number,
	},
	href: string,
	id: string,
	images: Array<any>,
	product: string,
	type: string,
	uri: string,
}

export interface apiPlaylistIndexType {
	href: string,
	items: Array<playlistType>,
	limit: number,
	next: string,
	offset: number,
	previous: string,
	total: number
}

export interface playlistType {
	collaborative: boolean,
	description: string,
	images: Array<{
		height: number,
		width: number,
		url: string
	}>,
	name: string,
	owner: {
		display_name: string
	},
	id: string,
	tracks: {
		href: string,
		total: number
	}
}

export interface apiPlaylistShowType {
	collaborative: boolean;
	description: string;
	external_urls: PlaylistExternalUrls;
	followers: Followers;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: Owner;
	primary_color: null;
	public: boolean;
	snapshot_id: string;
	tracks: Tracks;
	type: string;
	uri: string;
}

export interface PlaylistExternalUrls {
	spotify: string;
}

export interface Followers {
	href: null;
	total: number;
}

export interface Image {
	height: number;
	url: string;
	width: number;
}

export interface Owner {
	display_name: string;
	external_urls: OwnerExternalUrls;
	href: string;
	id: string;
	type: string;
	uri: string;
}

export interface OwnerExternalUrls {
	spotify: string;
}

export interface Tracks {
	href: string;
	items: Item[];
	limit: number;
	next: null;
	offset: number;
	previous: null;
	total: number;
}

export interface Item {
	added_at: string;
	added_by: AddedBy;
	is_local: boolean;
	primary_color: null;
	track: Track;
	video_thumbnail: VideoThumbnail;
}

export interface AddedBy {
	external_urls: OwnerExternalUrls;
	href: string;
	id: string;
	type: string;
	uri: string;
}

export interface Track {
	album: Album;
	artists: Artist[];
	available_markets: any[];
	disc_number: number;
	duration_ms: number;
	episode: boolean;
	explicit: boolean;
	external_ids: ExternalIDS;
	external_urls: PlaylistExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: null;
	track: boolean;
	track_number: number;
	type: string;
	uri: string;
}

export interface Album {
	album_type: string;
	artists: Artist[];
	available_markets: any[];
	external_urls: PlaylistExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface Artist {
	external_urls: PlaylistExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalIDS {
	isrc: string;
}

export interface VideoThumbnail {
	url: null;
}
