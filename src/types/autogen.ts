export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface Interval {
	start: any,
	end: any,
}

export interface DayHour {
	openIntervals?: Interval[],
	isClosed?: boolean,
}

export interface HolidayHours {
	date: string,
	openIntervals?: Interval[],
	isClosed?: boolean,
	isRegularHours?: boolean,
}

export interface Hours {
	monday?: DayHour,
	tuesday?: DayHour,
	wednesday?: DayHour,
	thursday?: DayHour,
	friday?: DayHour,
	saturday?: DayHour,
	sunday?: DayHour,
	holidayHours?: HolidayHours[],
	reopenDate?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export interface MyStreamIdLocation {
	id: string,
	uid: string,
	meta: any,
	name: string,
	address: Address,
	geomodifier: string,
	mainPhone: any,
	description: string,
	hours: Hours,
	slug: string,
	geocodedCoordinate: Coordinate,
}

export interface MyStreamIdProduct {
	id: string,
	uid: string,
	slug: string,
	meta: any,
	name: string,
	richTextDescription: string,
	c_cRating: string,
	c_cRatingsCount: string,
	c_cImageURLText: string,
	c_oldPrice: string,
	c_newPrice: string,
	c_cPrice: string,
	c_cPromotion: string,
	c_productDescription: string,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface SiteEntity {
	c_siteLogo: Image,
}
