export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export default interface Ce_track {
	description?: string,
	name: string,
	c_imageIcon?: string,
	c_primaryCTA?: C_primaryCTA,
	id: string,
}
