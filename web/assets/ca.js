webpackJsonp([3],{1:function(e,a,t){t("nrTV"),t("F52u"),t("PDWT"),e.exports=t("popR")},F52u:function(e,a,t){(function(e,a){window.ContentArena=window.ContentArena||{},ContentArena.ContentApi=ContentArena.ContentApi||{},ContentArena.ContentApi={saveContentAsDraft:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"content/draft/save",type:"POST",data:JSON.stringify(t),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},saveContentAsInactive:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/listing/save",type:"POST",data:JSON.stringify(t),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},saveContentAsActive:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/listing/publish",type:"POST",data:JSON.stringify(t),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},sendMessage:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/messages/send",type:"POST",data:JSON.stringify(t),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getUserInfo:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/user/info",type:"POST",contentType:"application/json",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getCompanyUsers:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/company/users",type:"POST",contentType:"application/json",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},updateCompany:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/company/update",type:"POST",data:JSON.stringify({company:t}),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},updatePassword:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/user/password",type:"POST",data:JSON.stringify(t),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},updateUser:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/user/update",type:"POST",data:JSON.stringify({user:t}),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getThread:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/messages/thread",type:"POST",data:JSON.stringify({customId:t}),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getThreads:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/messages/threads",type:"POST",contentType:"application/json",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},placeBid:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/bid/place",type:"POST",data:JSON.stringify(t),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},acceptBid:function(t,r){var n=e.Deferred();return t.signature=r,a.ajax({url:envhosturl+"api/bid/accept",type:"POST",data:JSON.stringify(t),contentType:"application/json",success:function(e){n.resolve(e)},error:function(e,a){n.reject({data:e,status:a})}}),n.promise()},rejectBid:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/bid/reject",type:"POST",data:JSON.stringify(t),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},removeBid:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/bid/remove",type:"POST",data:JSON.stringify(t),contentType:"application/json",success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},saveTmpFile:function(t){var r=e.Deferred(),n=new FormData;return n.append("file",t[0]),a.ajax({url:envhosturl+"content/save/file",type:"POST",data:n,processData:!1,contentType:!1,success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getByCustomId:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"listing/details",type:"POST",data:{customId:t},success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getDraftListings:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/listings/draft",type:"POST",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getInactiveListings:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/listings/inactive",type:"POST",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getActiveListings:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/listings/active",type:"POST",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getExpiredListings:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/listings/expired",type:"POST",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},removeListing:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/listings/remove",type:"POST",data:{customId:t},success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},duplicateListing:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/listings/duplicate",type:"POST",data:{customId:t},success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},deactivateListing:function(t){var r=e.Deferred();return a.ajax({url:envhosturl+"api/listings/deactivate",type:"POST",data:{customId:t},success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getClosedDeals:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/bid/closed",type:"POST",data:{},success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getAllDeals:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/bid/all",type:"POST",data:{},success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getPendingDeals:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/bid/pending",type:"POST",data:{},success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getRejectedDeals:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/bid/rejected",type:"POST",data:{},success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getWatchlistListings:function(){var t=e.Deferred();return a.ajax({url:envhosturl+"api/listings/watchlist",type:"POST",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()}}}).call(a,t("7t+N"),t("7t+N"))},PDWT:function(e,a){window.ContentArena=window.ContentArena||{},ContentArena.Data=ContentArena.Data||{},ContentArena.Languages=ContentArena.Languages||{},ContentArena.Data.TopSports=[{name:"Soccer",externalId:"sr:sport:1"},{name:"Basketball",externalId:"sr:sport:2"},{name:"Baseball",externalId:"sr:sport:3"},{name:"Tennis",externalId:"sr:sport:5"},{name:"Cricket",externalId:"sr:sport:21"},{name:"Field Hockey",externalId:"sr:sport:24"},{name:"Volleyball",externalId:"sr:sport:23"},{name:"Table Tennis",externalId:"sr:sport:20"},{name:"Golf",externalId:"sr:sport:9"},{name:"American Football",externalId:"sr:sport:16"},{name:"Handball",externalId:"sr:sport:6"}],ContentArena.Data.FullSports=[],ContentArena.Data.Countries=[],ContentArena.Languages.Short={mdr:"Mandarin",es:"Spanish",en:"English",hi:"Hindi",ar:"Arabic",pt:"Portuguese",bn:"Bengali",ru:"Russian",ja:"Japanese",jv:"Javanese",de:"German",all:"Show All"},ContentArena.Languages.Long={aa:"Afar",af:"Afrikaans",ain:"Ainu",akz:"Alabama",sq:"Albanian",ale:"Aleut",arq:"Algerian Arabic",en_US:"American English",ase:"American Sign Language",am:"Amharic",egy:"Ancient Egyptian",grc:"Ancient Greek",ar:"Arabic",arc:"Aramaic",arp:"Arapaho",arw:"Arawak",hy:"Armenian",as:"Assamese",asa:"Asu",en_AU:"Australian English",de_AT:"Austrian German",ay:"Aymara",az:"Azerbaijani",ban:"Balinese",eu:"Basque",bar:"Bavarian",be:"Belarusian",bn:"Bengali",bik:"Bikol",bin:"Bini",bs:"Bosnian",brh:"Brahui",bra:"Braj",pt_BR:"Brazilian Portuguese",br:"Breton",en_GB:"British English",bg:"Bulgarian",my:"Burmese",frc:"Cajun French",en_CA:"Canadian English",fr_CA:"Canadian French",yue:"Cantonese",car:"Carib",ca:"Catalan",cay:"Cayuga",ceb:"Cebuano",shu:"Chadian Arabic",ce:"Chechen",chr:"Cherokee",qug:"Chimborazo Highland Quichua",zh:"Chinese",chn:"Chinook Jargon",chp:"Chipewyan",cho:"Choctaw",cu:"Church Slavic",cv:"Chuvash",nwc:"Classical Newari",syc:"Classical Syriac",swc:"Congo Swahili",cop:"Coptic",kw:"Cornish",co:"Corsican",cr:"Cree",mus:"Creek",crh:"Crimean Turkish",hr:"Croatian",cs:"Czech",dak:"Dakota",da:"Danish",del:"Delaware",nl:"Dutch",frs:"Eastern Frisian",arz:"Egyptian Arabic",en:"English",eo:"Esperanto",et:"Estonian",pt_PT:"European Portuguese",es_ES:"European Spanish",ee:"Ewe",fan:"Fang",hif:"Fiji Hindi",fj:"Fijian",fil:"Filipino",fi:"Finnish",nl_BE:"Flemish",fon:"Fon",fr:"French",gaa:"Ga",gan:"Gan Chinese",ka:"Georgian",de:"German",got:"Gothic",grb:"Grebo",el:"Greek",gn:"Guarani",gu:"Gujarati",guz:"Gusii",hai:"Haida",ht:"Haitian",hak:"Hakka Chinese",ha:"Hausa",haw:"Hawaiian",he:"Hebrew",hz:"Herero",hi:"Hindi",hit:"Hittite",hmn:"Hmong",hu:"Hungarian",is:"Icelandic",io:"Ido",ig:"Igbo",iu:"Inuktitut",ik:"Inupiaq",ga:"Irish",it:"Italian",jam:"Jamaican Creole English",ja:"Japanese",jv:"Javanese",kaj:"Jju",dyo:"Jola-Fonyi",xal:"Kalmyk",kam:"Kamba",kbl:"Kanembu",kn:"Kannada",kr:"Kanuri",kaa:"Kara-Kalpak",krc:"Karachay-Balkar",krl:"Karelian",ks:"Kashmiri",csb:"Kashubian",kaw:"Kawi",kk:"Kazakh",ken:"Kenyang",kha:"Khasi",km:"Khmer",kho:"Khotanese",khw:"Khowar",ki:"Kikuyu",kmb:"Kimbundu",krj:"Kinaray-a",rw:"Kinyarwanda",kiu:"Kirmanjki",tlh:"Klingon",bkm:"Kom",kv:"Komi",koi:"Komi-Permyak",kg:"Kongo",kok:"Konkani",ko:"Korean",kfo:"Koro",kos:"Kosraean",avk:"Kotava",khq:"Koyra Chiini",ses:"Koyraboro Senni",kpe:"Kpelle",kri:"Krio",kj:"Kuanyama",kum:"Kumyk",ku:"Kurdish",kru:"Kurukh",kut:"Kutenai",nmg:"Kwasio",ky:"Kyrgyz",quc:"Kʼicheʼ",lad:"Ladino",lah:"Lahnda",lkt:"Lakota",lam:"Lamba",lag:"Langi",lo:"Lao",ltg:"Latgalian",la:"Latin",es_419:"Latin American Spanish",lv:"Latvian",lzz:"Laz",lez:"Lezghian",lij:"Ligurian",li:"Limburgish",ln:"Lingala",lfn:"Lingua Franca Nova",lzh:"Literary Chinese",lt:"Lithuanian",liv:"Livonian",jbo:"Lojban",lmo:"Lombard",nds:"Low German",sli:"Lower Silesian",dsb:"Lower Sorbian",loz:"Lozi",lu:"Luba-Katanga",lua:"Luba-Lulua",lui:"Luiseno",smj:"Lule Sami",lun:"Lunda",luo:"Luo",lb:"Luxembourgish",luy:"Luyia",mde:"Maba",mk:"Macedonian",jmc:"Machame",mad:"Madurese",maf:"Mafa",mag:"Magahi",vmf:"Main-Franconian",mai:"Maithili",mak:"Makasar",mgh:"Makhuwa-Meetto",kde:"Makonde",mg:"Malagasy",ms:"Malay",ml:"Malayalam",mt:"Maltese",mnc:"Manchu",mdr:"Mandarin",man:"Mandingo",mni:"Manipuri",gv:"Manx",mi:"Maori",arn:"Mapuche",mr:"Marathi",chm:"Mari",mh:"Marshallese",mwr:"Marwari",mas:"Masai",mzn:"Mazanderani",byv:"Medumba",men:"Mende",mwv:"Mentawai",mer:"Meru",mgo:"Metaʼ",es_MX:"Mexican Spanish",mic:"Micmac",dum:"Middle Dutch",enm:"Middle English",frm:"Middle French",gmh:"Middle High German",mga:"Middle Irish",nan:"Min Nan Chinese",min:"Minangkabau",xmf:"Mingrelian",mwl:"Mirandese",lus:"Mizo",ar_001:"Modern Standard Arabic",moh:"Mohawk",mdf:"Moksha",ro_MD:"Moldavian",lol:"Mongo",mn:"Mongolian",mfe:"Morisyen",ary:"Moroccan Arabic",mos:"Mossi",mul:"Multiple Languages",mua:"Mundang",ttt:"Muslim Tat",mye:"Myene",naq:"Nama",na:"Nauru",nv:"Navajo",ng:"Ndonga",nap:"Neapolitan",ne:"Nepali",new:"Newari",sba:"Ngambay",nnh:"Ngiemboon",jgo:"Ngomba",yrl:"Nheengatu",nia:"Nias",niu:"Niuean",zxx:"No linguistic content",nog:"Nogai",nd:"North Ndebele",frr:"Northern Frisian",se:"Northern Sami",nso:"Northern Sotho",no:"Norwegian",nb:"Norwegian Bokmål",nn:"Norwegian Nynorsk",nov:"Novial",nus:"Nuer",nym:"Nyamwezi",ny:"Nyanja",nyn:"Nyankole",tog:"Nyasa Tonga",nyo:"Nyoro",nzi:"Nzima",nqo:"NʼKo",oc:"Occitan",oj:"Ojibwa",ang:"Old English",fro:"Old French",goh:"Old High German",sga:"Old Irish",non:"Old Norse",peo:"Old Persian",pro:"Old Provençal",or:"Oriya",om:"Oromo",osa:"Osage",os:"Ossetic",ota:"Ottoman Turkish",pal:"Pahlavi",pfl:"Palatine German",pau:"Palauan",pi:"Pali",pdc:"Pennsylvania German",fa:"Persian",phn:"Phoenician",pcd:"Picard",pms:"Piedmontese",pdt:"Plautdietsch",pon:"Pohnpeian",pl:"Polish",pnt:"Pontic",pt:"Portuguese",prg:"Prussian",pa:"Punjabi",qu:"Quechua",ro:"Romanian",rm:"Romansh",rom:"Romany",root:"Root",ru:"Russian",rwk:"Rwa",sah:"Sakha",sam:"Samaritan Aramaic",sm:"Samoan",sco:"Scots",gd:"Scottish Gaelic",sly:"Selayar",sel:"Selkup",seh:"Sena",see:"Seneca",sr:"Serbian",sh:"Serbo-Croatian",srr:"Serer",sei:"Seri",ksb:"Shambala",shn:"Shan",sn:"Shona",ii:"Sichuan Yi",scn:"Sicilian",sid:"Sidamo",bla:"Siksika",szl:"Silesian",zh_Hans:"Simplified Chinese",sd:"Sindhi",si:"Sinhala",sms:"Skolt Sami",den:"Slave",sk:"Slovak",sl:"Slovenian",xog:"Soga",sog:"Sogdien",so:"Somali",snk:"Soninke",ckb:"Sorani Kurdish",azb:"South Azerbaijani",nr:"South Ndebele",alt:"Southern Altai",sma:"Southern Sami",st:"Southern Sotho",es:"Spanish",srn:"Sranan Tongo",zgh:"Standard Moroccan Tamazight",suk:"Sukuma",sux:"Sumerian",su:"Sundanese",sus:"Susu",sw:"Swahili",ss:"Swati",sv:"Swedish",fr_CH:"Swiss French",gsw:"Swiss German",de_CH:"Swiss High German",syr:"Syriac",shi:"Tachelhit",tl:"Tagalog",ty:"Tahitian",dav:"Taita",tg:"Tajik",tly:"Talysh",tmh:"Tamashek",ta:"Tamil",trv:"Taroko",twq:"Tasawaq",tt:"Tatar",te:"Telugu",ter:"Tereno",teo:"Teso",tet:"Tetum",th:"Thai",bo:"Tibetan",tig:"Tigre",ti:"Tigrinya",tem:"Timne",tiv:"Tiv",tli:"Tlingit",tpi:"Tok Pisin",tkl:"Tokelau",to:"Tongan",fit:"Tornedalen Finnish",zh_Hant:"Traditional Chinese",tkr:"Tsakhur",tsd:"Tsakonian",tsi:"Tsimshian",ts:"Tsonga",tn:"Tswana",tcy:"Tulu",tum:"Tumbuka",aeb:"Tunisian Arabic",tr:"Turkish",tk:"Turkmen",tru:"Turoyo",tvl:"Tuvalu",tyv:"Tuvinian",tw:"Twi",kcg:"Tyap",udm:"Udmurt",uga:"Ugaritic",uk:"Ukrainian",umb:"Umbundu",und:"Unknown Language",hsb:"Upper Sorbian",ur:"Urdu",ug:"Uyghur",uz:"Uzbek",vai:"Vai",ve:"Venda",vec:"Venetian",vep:"Veps",vi:"Vietnamese",vo:"Volapük",vro:"Võro",vot:"Votic",vun:"Vunjo",wa:"Walloon",wae:"Walser",war:"Waray",was:"Washo",guc:"Wayuu",cy:"Welsh",vls:"West Flemish",fy:"Western Frisian",mrj:"Western Mari",wal:"Wolaytta",wo:"Wolof",wuu:"Wu Chinese",xh:"Xhosa",hsn:"Xiang Chinese",yav:"Yangben",yao:"Yao",yap:"Yapese",ybb:"Yemba",yi:"Yiddish",yo:"Yoruba",zap:"Zapotec",dje:"Zarma",zza:"Zaza",zea:"Zeelandic",zen:"Zenaga",za:"Zhuang",gbz:"Zoroastrian Dari",zu:"Zulu",zun:"Zuni"}},nrTV:function(e,a,t){(function(e,a){var t={tournaments:{}};window.ContentArena=window.ContentArena||{},ContentArena.Api={sortByLabel:function(e,a){return e.name>a.name?1:a.name>e.name?-1:0},sortBySport:function(e,a){return e.sport.name>a.sport.name?1:e.sport.name<a.sport.name?-1:e.sportCategory.name>a.sportCategory.name?1:e.sportCategory.name<a.sportCategory.name?-1:e.name>a.name?1:e.name<a.name?-1:0},prepareList:function(a,t){var r=this;return a=e.map(a,function(e){return t&&e.category["@attributes"].id!=t?null:{name:e["@attributes"].name,externalId:e["@attributes"].id}}),a.sort(r.sortByLabel),a},getContent:function(t){var r=a.Deferred();return e.ajax({url:envhosturl+"buy/search",type:"POST",data:t,success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getJsonContent:function(t){var r=a.Deferred();return e.ajax({url:envhosturl+"listings/marketplace",type:"POST",data:t,success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},saveFilter:function(t){var r=a.Deferred();return e.ajax({url:envhosturl+"buy/filter/save",type:"POST",data:t,success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getCountries:function(){var t=a.Deferred(),r=this;return e.ajax({url:envhosturl+"api/search/countries/all",type:"POST",success:function(e){e.sort(r.sortByLabel),t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getActiveSports:function(){var t=a.Deferred();return e.ajax({url:envhosturl+"api/search/sports/active",type:"POST",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getCountriesFull:function(){var t=a.Deferred(),r=this;return e.ajax({url:envhosturl+"api/search/countries/full",type:"POST",success:function(e){e.sort(r.sortByLabel),t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getTerritories:function(){var t=a.Deferred(),r=this;return e.ajax({url:envhosturl+"api/search/territories",type:"POST",success:function(e){e.sort(r.sortByLabel),t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getRights:function(t,r){var n=a.Deferred();return e.ajax({url:envhosturl+"api/search/rights",type:"POST",data:{rightsPackage:t,group:r},success:function(e){n.resolve(e)},error:function(e,a){n.reject({data:e,status:a})}}),n.promise()},getRightsPackage:function(t,r){var n=a.Deferred();return e.ajax({url:envhosturl+"api/search/rights-package",type:"POST",data:{rightsPackage:t,group:r},success:function(e){n.resolve(e)},error:function(e,a){n.reject({data:e,status:a})}}),n.promise()},getSports:function(){var t=a.Deferred(),r=this;return e.ajax({url:externalApiUrl+"v1/feed/sports",type:"GET",success:function(e){var a=r.prepareList(e.sport);t.resolve(a)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getContentDetails:function(t){var r=a.Deferred();return e.ajax({url:envhosturl+"content/details/",type:"POST",data:{id:t},success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getPendingListings:function(t){var r=a.Deferred();return e.ajax({url:envhosturl+"content/pending-listings/",type:"POST",data:{id:t},success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getCategories:function(r){var n=a.Deferred(),s=this,i=[],o=[];return s.getTournaments(r).done(function(){if(!t.tournaments[r])return void n.resolve([]);i=e.map(t.tournaments[r].tournament,function(e){var a=e.category["@attributes"].id;return-1!==o.indexOf(a)?null:(o.push(a),e.category)}),n.resolve(s.prepareList(i))}),n.promise()},getTournaments:function(r,n){var s=a.Deferred(),i=this;return void 0!==t.tournaments[r]?(s.resolve(i.prepareList(t.tournaments[r].tournament,n)),s.promise()):(e.ajax({url:externalApiUrl+"v1/feed/tournaments",type:"POST",data:{id:r},success:function(e){if(void 0===e.tournaments||void 0===e.tournaments.tournament)return void s.resolve([]);t.tournaments[r]=e.tournaments,s.resolve(i.prepareList(e.tournaments.tournament,n))},error:function(e,a){s.reject({data:e,status:a})}}),s.promise())},getSeasons:function(t){var r=a.Deferred();return e.ajax({url:externalApiUrl+"v1/feed/seasons",type:"POST",data:{id:t},success:function(a){var t;if(void 0===a.seasons||void 0===a.seasons.season)return!1;t=e.isArray(a.seasons.season)?e.map(a.seasons.season,function(e){return{name:e["@attributes"].name,externalId:e["@attributes"].id,endDate:e["@attributes"].end_date,startDate:e["@attributes"].start_date,tournamentId:e["@attributes"].tournament_id,year:e["@attributes"].year}}).reverse():[{name:a.seasons.season["@attributes"].name,externalId:a.seasons.season["@attributes"].id,endDate:a.seasons.season["@attributes"].end_date,startDate:a.seasons.season["@attributes"].start_date,tournamentId:a.seasons.season["@attributes"].tournament_id,year:a.seasons.season["@attributes"].year}],r.resolve(t)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getSchedule:function(t){var r=a.Deferred();return e.ajax({url:externalApiUrl+"v1/feed/schedules",type:"POST",data:{id:t},success:function(e){var a={};if(void 0===e.sport_events||void 0===e.sport_events.sport_event)return!1;e.sport_events.sport_event.forEach(function(e){var t=e.tournament_round?e.tournament_round["@attributes"]:null;if(t){var r=t.number?"round_"+t.number:t.name;a[r]||(a[r]={}),a[r].matches||(a[r].matches=new Map),a[r].matches.set(e["@attributes"].id,{scheduled:e["@attributes"].scheduled,externalId:e["@attributes"].id,status:e["@attributes"].status,tournamentRound:t,competitors:e.competitors?e.competitors.competitor.map(function(e){return e["@attributes"]}):null})}}),r.resolve(a)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},searchCompetition:function(t){var r=a.Deferred(),n=this;return e.ajax({url:envhosturl+"api/search/tournament",data:{content:t},traditional:!0,type:"POST",dataType:"json",success:function(e){e.sort(n.sortBySport),r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},watchlist:function(t){var r=a.Deferred();return e.ajax({url:envhosturl+"api/watchlist/add",type:"POST",data:{id:t},success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()}}}).call(a,t("7t+N"),t("7t+N"))},popR:function(e,a){var t=function(){function e(e,a){var t=[],r=!0,n=!1,s=void 0;try{for(var i,o=e[Symbol.iterator]();!(r=(i=o.next()).done)&&(t.push(i.value),!a||t.length!==a);r=!0);}catch(e){n=!0,s=e}finally{try{!r&&o.return&&o.return()}finally{if(n)throw s}}return t}return function(a,t){if(Array.isArray(a))return a;if(Symbol.iterator in Object(a))return e(a,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();window.ContentArena=window.ContentArena||{},ContentArena.Utils={contentParserFromServer:function(e){if(e.parsed)return e;var a=!0;return e.extraData&&Object.entries(e.extraData).forEach(function(a){var r=t(a,2),n=r[0],s=r[1];return e[n]=s}),e.tournament=e.tournament?Array.isArray(e.tournament)?e.tournament:[e.tournament]:[],e.sportCategory=e.sportCategory?Array.isArray(e.sportCategory)?e.sportCategory:[e.sportCategory]:[],e.selectedRightsBySuperRight&&e.rightsPackage.forEach(function(a){a.selectedRights=e.selectedRightsBySuperRight[a.id].items,a.exclusive=e.selectedRightsBySuperRight[a.id].exclusive}),e.fixturesBySeason&&e.seasons.forEach(function(a,t){a.fixtures=e.fixturesBySeason[t]}),e.salesPackages&&(e.salesPackages.forEach(function(e){e.salesMethod&&(e.salesMethod=e.salesMethod.name),e.excludedCountries&&(e.excludedTerritories=e.excludedCountries.map(function(e){return{label:e.name,value:e.name}})),e.territories&&(e.territories=e.territories.map(function(e){return{label:e.name,value:e.name}})),e.territories||(a=!1)}),a&&e.salesPackages.sort(this.sortSalesPackages).reverse()),e.step=Number(e.step),e.parsed=!0,e},sortSalesPackages:function(e,a){var t=function(e,a){return e>a?1:a>e?-1:0};return t(e.territories.length,a.territories.length)||t(a.name,e.name)},isAPIAvailable:function(){return!!(window.File&&window.FileReader&&window.FileList&&window.Blob)||(document.writeln("The HTML5 APIs used in this form are only available in the following browsers:<br />"),document.writeln(" - Google Chrome: 13.0 or later<br />"),document.writeln(" - Mozilla Firefox: 6.0 or later<br />"),document.writeln(" - Internet Explorer: Not supported (partial support expected in 10.0)<br />"),document.writeln(" - Safari: Not supported<br />"),document.writeln(" - Opera: Not supported"),!1)},addOrdinal:function(e){var a=e.toString().slice(-1),t="";switch(a){case"1":t="st";break;case"2":t="nd";break;case"3":t="rd";break;case"4":case"5":case"6":case"7":case"8":case"9":case"0":t="th"}return e+t},getIndex:function(e,a,t){for(var r=0;r<a.length;r++)if(a[r][t]===e)return r;return-1}}}},[1]);