export const DATE_FORMAT = "DD.MM.YYYY";
export const SERVER_DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";
export const SERVER_DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "HH:mm";
export const YEAR_FORMAT = "YYYY";
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
export const TIME_ZONE = "UTC";
export const CONTENT_LISTING_VIEW = {
	LIST: "list",
	TABLE: "table",
};

export const LISTING_STATUS = {
	DRAFT: "DRAFT",
	INACTIVE: "INACTIVE",
	AUTO_INACTIVE: "AUTO_INACTIVE",
	PENDING: "PENDING",
	APPROVED: "APPROVED",
	REJECTED: "REJECTED",
	EDITED: "EDITED",
	SOLD_OUT: "SOLD_OUT",
	EXPIRED: "EXPIRED",
	ARCHIVED: "ARCHIVED",
	SOLD_COPY: "SOLD_COPY",
};

export const RIGHT_STATUS = {
	AVAILABLE_RIGHTS: "AVAILABLE_RIGHTS",
	OFFERED_RIGHTS: "OFFERED_RIGHTS",
	CLOSED_DEALS: "CLOSED_DEALS",
};

export const RIGHTS_STATUS_FILTERS = [
	{
		key: "RIGHTS_STATUS_FILTER_UNSOLD",
		id: "UNSOLD_TERRITORIES",
	},
	{
		key: "RIGHTS_STATUS_FILTER_ACTIVE",
		id: "ACTIVE_LISTINGS",
	},
	{
		key: "RIGHTS_STATUS_FILTER_CLOSED",
		id: "CLOSED_DEALS",
	},

];


export const EDITED_PROGRAM_TYPES = [
	{
		id: "HIGHLIGHT_SHOW",
		name: "Highlight show",
	},
	{
		id: "DOCUMENTARY",
		name: "Documentary",
	},
	{
		id: "PREVIEW",
		name: "Preview",
	},
	{
		id: "TALK_SHOW",
		name: "Talk show",
	},
	{
		id: "OTHER",
		name: "Other",
	},

];

export const CMS_PROPERTY_TABS = {
	RIGHTS: "rightsoverview",
	// EDITED_PROGRAM: "editedprogram",
	// FIXTURES: "fixtures",
	COMMERCIAL: "commercialoverview",
	LISTING: "listingoverview",
	DETAILS: "propertydetails",
};

export const CMS_PROPERTY_DETAILS_TABS = {
	EVENT_DETAILS: "eventdetails",
	LICENSE_DETAILS: "licensedetails",
	EDIT_PROGRAM: "editprogram",
	RIGHTS_DETAILS: "rightsdetails",
	PRODUCTION_DETAILS: "productiondetails",
};

export const PROPERTY_MAIN_TABS = {
	EDIT: "edit",
	CREATE_LISTING: "listing",
	ADD_DEALS: "deals",
};

export const USER_PROFILES = {
	SELLER: "SELLER",
	BUYER: "BUYER",
	BOTH: "BOTH",
};

export const USER_STATUS = {
	ABORTED: "Aborted",
};

export const ROUTE_PATHS = {
	ADMIN: "/admin",
	LANDING: "/landing",
	RESET_PASSWORD: "/reset-password",
	LOGIN: "/login",
	REGISTRATION: "/registration",
	REGISTER: "/register",
	MARKETPLACE: "/marketplace",
	CONTENT_LISTING: "/contentlisting",
	CREATE_LISTING: "/contentlisting/new",
	COMMERCIAL_OVERVIEW: "/commercialoverview",
	WATCHLIST: "/watchlist",
	CLOSED_DEALS: "/closeddeals",
	SETTINGS: "/settings",
	PREFERENCES: "/preferences",
	TERMS: "/terms",
	MESSAGES: "/messages",
	BIDS: "/bids",
	LISTING: "/listing",
	LISTING_PREVIEW: "/public/listing",
	COMMERCIAL_OVERVIEW_WITH_ACTIVITY: "/commercialoverview/filter/withactivity",
	COMMERCIAL_OVERVIEW_OPEN_BIDS: "/commercialoverview/filter/openbids",
	COMMERCIAL_OVERVIEW_CLOSED_DEALS: "/commercialoverview/filter/closeddeals",
	MANAGE_LISTINGS: "/managelistings",
	CREATE_PROPERTY: "/createproperty",
	CREATE_PROPERTY_STEP_1: "/createproperty/1",
	CREATE_PROPERTY_STEP_2: "/createproperty/2",
	PROPERTIES: "/properties",
};

export const BUNDLE_TERRITORIES_METHOD = {
	WORLDWIDE_EXCLUDING: "WORLDWIDE_EXCLUDING",
	SELECTED_TERRITORIES: "SELECTED_TERRITORIES",
	WORLDWIDE: "WORLDWIDE",
};

export const BUNDLE_SALES_METHOD = {
	BIDDING: "BIDDING",
	FIXED: "FIXED",
	MULTIPLE: "MULTIPLE",
};

export const LISTING_SORT_OPTIONS = {
	RELEVANCE: "relevance",
	PUBLISH_DATE: "publishing",
	/* UPCOMING_EVENT: "upcoming", */
	EXPIRY_DATE: "expiry",
};

export const LOGIN_VIEW_TYPE = {
	LANDING: "landing",
	LOGIN: "login",
	RECOVER: "recover",
	REVIEW: "review",
	REGISTRATION: "registration",
	REGISTERED: "registered",
	RESET_PASSWORD: "reset_password",
	LISTING_PREVIEW: "listing_preview",
};

export const VALIDATION_KEYS = {
	NO_EMPTY_STRING: "noemptystring",
	NO_ZERO: "nozero",
	NO_EMPTY_ARR: "noemptyarr",
};

export const SIGN_UP_FIELDS = {
	NAME: "name",
	LAST_NAME: "lastName",
	EMAIL: "email",
	COMPANY: "company",
};

export const LANDING_LINKS = {
	PRIVACY: "https://landing.contentarena.com/web/privacy-policy/",
	TERMS: "https://landing.contentarena.com/web/terms-of-use/",
	FAQ: "https://landing.contentarena.com/web/faq/",
	COOKIE: "https://landing.contentarena.com/web/cookie-policy/",
	HOME: "https://contentarena.com/",
};

export const SPORT_KEYS = {
	CREATE: "create",
	TOP: "top",
};

export const SITE_URLS = {
	HOME_URL: "https://www.contentarena.com",
	LOGIN_URL: "https://www.contentarena.com/login",
};

export const SITE_EMAILS = {
	SUPPORT: "support@contentarena.com",
};

export const SERVER_ERROR_CODES = {
	USER_ALREADY_EXISTS: 1001,
	PROPERTY_DOES_NOT_EXISTS: 2000,
};

export const RIGHTS = [
	{
		code: "LT",
		name: "Live Transmission",
		translationKey: "RIGHT_LIVE_TRANSMISSION_NAME",
		exclusive: null,
	},
	{
		code: "DT",
		name: "Delayed & Archive",
		translationKey: "RIGHT_DELAYED_ARCHIVE_NAME",
		exclusive: null,
	},
	{
		code: "LB",
		name: "Live Betting",
		translationKey: "RIGHT_LIVE_BETTING_NAME",
		exclusive: null,
	},
	{
		code: "NA",
		name: "News Access",
		translationKey: "RIGHT_NEWS_NAME",
		exclusive: null,
	},
	{
		code: "HL",
		name: "Highlight & Clip",
		translationKey: "RIGHT_HIGHLIGHTS_NAME",
		exclusive: null,
	},
	{
		code: "PR",
		name: "Edited Program",
		translationKey: "RIGHT_PROGRAM_NAME",
		exclusive: null,
	},

];

export const RIGHT_TYPE = {
	all: "all",
	sale: "sale",
	exclusive: "exclusive",
};

export const SALE_TYPE = [
	{
		className: "green-background",
		translationKey: "RIGHT_AVAILABLE_SALE_NAME",
		type: RIGHT_TYPE.sale,
	},
	{
		className: "green-light-background",
		translationKey: "RIGHT_AVAILABLE_RESALE_NAME",
		type: RIGHT_TYPE.sale,
	},
	{
		className: "red-light-background",
		translationKey: "RIGHT_SOLD_NAME",
		type: RIGHT_TYPE.sale,
	},
	{
		className: "yellow-circle",
		translationKey: "RIGHT_EXCLUSIVE_NAME",
		type: RIGHT_TYPE.exclusive,
	},
	{
		className: "blue-circle",
		translationKey: "RIGHT_NON_EXCLUSIVE_NAME",
		type: RIGHT_TYPE.exclusive,
	},
	{
		className: "purple-triangle",
		translationKey: "RIGHT_ACTIVE_LISTING_NAME",
		type: RIGHT_TYPE.sale,
	},
];

export const EDIT_TYPE = {
	create: "CREATE",
	edit: "EDIT",
};

export const PROGRESS_STATUS = {
	COMPLETED: "completed",
	ACTIVE: "active",
	DISABLED: "disabled",
};

export const REGIONS_ENUMS = {
	Algeria: "DZA",
	Angola: "AGO",
	Benin: "BEN",
	Botswana: "BWA",
	"Burkina Faso": "BFA",
	Burundi: "BDI",
	Cameroon: "CMR",
	"Cabo Verde": "CPV",
	"Central African Republic": "CAF",
	Chad: "TCD",
	Comoros: "COM",
	Congo: "COG",
	"Congo (Democratic Republic of the)": "COD",
	"Côte d'Ivoire": "CIV",
	Djibouti: "DJI",
	Egypt: "EGY",
	"Equatorial Guinea": "GNQ",
	Eritrea: "ERI",
	Ethiopia: "ETH",
	Gabon: "GAB",
	Gambia: "GMB",
	Ghana: "GHA",
	Guinea: "GIN",
	"Guinea-Bissau": "GNB",
	Kenya: "KEN",
	Lesotho: "LSO",
	Liberia: "LBR",
	Libya: "LBY",
	Madagascar: "MDG",
	Malawi: "MWI",
	Mali: "MLI",
	Mauritania: "MRT",
	Mauritius: "MUS",
	Mayotte: "MYT",
	Morocco: "MAR",
	Mozambique: "MOZ",
	Namibia: "NAM",
	Niger: "NER",
	Nigeria: "NGA",
	Réunion: "REU",
	Rwanda: "RWA",
	"Saint Helena, Ascension and Tristan da Cunha": "SHN",
	"Sao Tome and Principe": "STP",
	Senegal: "SEN",
	Seychelles: "SYC",
	"Sierra Leone": "SLE",
	Somalia: "SOM",
	"South Africa": "ZAF",
	"South Sudan": "SSD",
	Sudan: "SDN",
	Swaziland: "SWZ",
	"Tanzania, United Republic of": "TZA",
	Togo: "TGO",
	Tunisia: "TUN",
	Uganda: "UGA",
	"Western Sahara": "ESH",
	Zambia: "ZMB",
	Zimbabwe: "ZWE",
	"American Samoa": "ASM",
	Australia: "AUS",
	"Cook Islands": "COK",
	Fiji: "FJI",
	"French Polynesia": "PYF",
	Guam: "GUM",
	Kiribati: "KIR",
	"Marshall Islands": "MHL",
	"Micronesia (Federated States of)": "FSM",
	Nauru: "NRU",
	"New Caledonia": "NCL",
	"New Zealand": "NZL",
	Niue: "NIU",
	"Norfolk Island": "NFK",
	"Northern Mariana Islands": "MNP",
	Palau: "PLW",
	"Papua New Guinea": "PNG",
	Pitcairn: "PCN",
	Samoa: "WSM",
	"Solomon Islands": "SLB",
	Tokelau: "TKL",
	Tonga: "TON",
	Tuvalu: "TUV",
	Vanuatu: "VUT",
	"Wallis and Futuna": "WLF",
	Anguilla: "AIA",
	"Antigua and Barbuda": "ATG",
	Argentina: "ARG",
	Aruba: "ABW",
	Bahamas: "BHS",
	Barbados: "BRB",
	Belize: "BLZ",
	Bermuda: "BMU",
	"Bolivia (Plurinational State of)": "BOL",
	"Bonaire, Sint Eustatius and Saba": "BES",
	Brazil: "BRA",
	Canada: "CAN",
	"Cayman Islands": "CYM",
	Chile: "CHL",
	Colombia: "COL",
	"Costa Rica": "CRI",
	Cuba: "CUB",
	Curaçao: "CUW",
	Dominica: "DMA",
	"Dominican Republic": "DOM",
	Ecuador: "ECU",
	"El Salvador": "SLV",
	"Falkland Islands (Malvinas)": "FLK",
	"French Guiana": "GUF",
	Greenland: "GRL",
	Grenada: "GRD",
	Guadeloupe: "GLP",
	Guatemala: "GTM",
	Guyana: "GUY",
	Haiti: "HTI",
	Honduras: "HND",
	Jamaica: "JAM",
	Martinique: "MTQ",
	Mexico: "MEX",
	Montserrat: "MSR",
	Nicaragua: "NIC",
	Panama: "PAN",
	Paraguay: "PRY",
	Peru: "PER",
	"Puerto Rico": "PRI",
	"Saint Barthélemy": "BLM",
	"Saint Kitts and Nevis": "KNA",
	"Saint Lucia": "LCA",
	"Saint Martin (French part)": "MAF",
	"Saint Pierre and Miquelon": "SPM",
	"Saint Vincent and the Grenadines": "VCT",
	"Sint Maarten (Dutch part)": "SXM",
	Suriname: "SUR",
	"Trinidad and Tobago": "TTO",
	"Turks and Caicos Islands": "TCA",
	USA: "USA",
	Uruguay: "URY",
	"Venezuela (Bolivarian Republic of)": "VEN",
	"Virgin Islands (British)": "VGB",
	"Virgin Islands (U.S.)": "VIR",
	Afghanistan: "AFG",
	Armenia: "ARM",
	Azerbaijan: "AZE",
	Bahrain: "BHR",
	Bangladesh: "BGD",
	Bhutan: "BTN",
	"Brunei Darussalam": "BRN",
	Cambodia: "KHM",
	China: "CHN",
	Cyprus: "CYP",
	Georgia: "GEO",
	"Hong Kong": "HKG",
	India: "IND",
	Indonesia: "IDN",
	"Iran (Islamic Republic of)": "IRN",
	Iraq: "IRQ",
	Israel: "ISR",
	Japan: "JPN",
	Jordan: "JOR",
	Kazakhstan: "KAZ",
	"Korea (Democratic People's Republic of)": "PRK",
	"Korea (Republic of)": "KOR",
	Kuwait: "KWT",
	Kyrgyzstan: "KGZ",
	"Lao People's Democratic Republic": "LAO",
	Lebanon: "LBN",
	Macao: "MAC",
	Malaysia: "MYS",
	Maldives: "MDV",
	Mongolia: "MNG",
	Myanmar: "MMR",
	Nepal: "NPL",
	Oman: "OMN",
	Pakistan: "PAK",
	"Palestine, State of": "PSE",
	Philippines: "PHL",
	Qatar: "QAT",
	"Saudi Arabia": "SAU",
	Singapore: "SGP",
	"Sri Lanka": "LKA",
	"Syrian Arab Republic": "SYR",
	"Taiwan, Province of China": "TWN",
	Tajikistan: "TJK",
	Thailand: "THA",
	"Timor-Leste": "TLS",
	Turkey: "TUR",
	Turkmenistan: "TKM",
	"United Arab Emirates": "ARE",
	Uzbekistan: "UZB",
	"Viet Nam": "VNM",
	Yemen: "YEM",
	"Åland Islands": "ALA",
	Albania: "ALB",
	Andorra: "AND",
	Austria: "AUT",
	Belarus: "BLR",
	Belgium: "BEL",
	"Bosnia and Herzegovina": "BIH",
	Bulgaria: "BGR",
	Croatia: "HRV",
	"Czech Republic": "CZE",
	Denmark: "DNK",
	Estonia: "EST",
	"Faroe Islands": "FRO",
	Finland: "FIN",
	France: "FRA",
	Germany: "DEU",
	Gibraltar: "GIB",
	Greece: "GRC",
	Guernsey: "GGY",
	"Holy See": "VAT",
	Hungary: "HUN",
	Iceland: "ISL",
	Ireland: "IRL",
	"Isle of Man": "IMN",
	Italy: "ITA",
	Jersey: "JEY",
	Latvia: "LVA",
	Liechtenstein: "LIE",
	Lithuania: "LTU",
	Luxembourg: "LUX",
	"Macedonia (the former Yugoslav Republic of)": "MKD",
	Malta: "MLT",
	"Moldova (Republic of)": "MDA",
	Monaco: "MCO",
	Montenegro: "MNE",
	Netherlands: "NLD",
	Norway: "NOR",
	Poland: "POL",
	Portugal: "PRT",
	Romania: "ROU",
	"Russian Federation": "RUS",
	"San Marino": "SMR",
	Serbia: "SRB",
	Slovakia: "SVK",
	Slovenia: "SVN",
	Spain: "ESP",
	"Svalbard and Jan Mayen": "SJM",
	Sweden: "SWE",
	Switzerland: "CHE",
	Ukraine: "UKR",
	"United Kingdom of Great Britain and Northern Ireland": "GBR",
	England: "ENG",
	Antarctica: "ATA",
	"Bouvet Island": "BVT",
	"British Indian Ocean Territory": "IOT",
	"Christmas Island": "CXR",
	"Cocos (Keeling) Islands": "CCK",
	"French Southern Territories": "ATF",
	"Heard Island and McDonald Islands": "HMD",
	"South Georgia and the South Sandwich Islands": "SGS",
	"United States Minor Outlying Islands": "UMI",
};

export const LICENSE_TAB = {
	DEFINITIONS: "Definitions",
	TERMS: "Terms",
};

export const PRODUCTION_TAB = {
	CONTENT_DELIVERY: "CONTENT_DELIVERY",
	TECHNICAL_DELIVERY: "TECHNICAL_DELIVERY",
	GRAPHICS: "GRAPHICS",
	ASPECT_RATIO: "ASPECT_RATIO",
	COMMENTARY: "COMMENTARY",
	CAMERA: "CAMERA",
};

export const RIGHTS_TAB = {
	SUBLICENSE: "SUBLICENSE",
	BROADCASTING: "BROADCASTING",
	EXPLOITATION_FORM: "EXPLOITATION_FORM",
	TRANSMISSION_MEANS: "TRANSMISSION_MEANS",
	LICENSED_LANGUAGES: "LICENSED_LANGUAGES",
	RESERVED_RIGHTS: "RESERVED_RIGHTS",
};
