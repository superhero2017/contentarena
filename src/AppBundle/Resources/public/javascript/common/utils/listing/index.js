import cn from "classnames";
import React from "react";
import moment from "moment";

export const getListingImage = (props) => {
    const { imageBase64, image, sports } = props;
    let listingImageUrl = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : null;
    let isSportPlaceholder = false;
    let caLogo = false;

    if (!listingImageUrl) {
        const sportId = sports && sports.length ? (sports[0].id || sports[0].externalId): null;
        const imagesBaseDir = assetsBaseDir + "app/images/listing/default-sports/";
        let imageName = "";
        isSportPlaceholder = true;

        switch (sportId) {
            case 1:
            case "sr:sport:1":
                imageName = "soccer.svg"; // Soccer
                break;
            case 15:
            case "sr:sport:16":
                imageName = "america-futbol.svg"; // American Football
                break;
            case 7:
            case "sr:sport:3":
                imageName = "basketball.svg"; // Baseball
                break;
            case 3:
            case "sr:sport:2":
                imageName = "basketball.svg"; // Basketball
                break;
            case 10:
            case "sr:sport:21":
                imageName = "cricket.svg"; // Cricket
                break;
            case 11:
            case "sr:sport:24":
                imageName = "hockey.svg"; // Field Hockey
                break;
            case 4:
            case "sr:sport:20":
                imageName = "table-tennis.svg"; // Table Tennis
                break;
            case 5:
            case "sr:sport:5":
                imageName = "tennis.svg"; // Tennis
                break;
            case 16:
            case "sr:sport:23":
                imageName = "volleyball.svg"; // Volleyball
                break;
            case 9:
            case "sr:sport:9":
                imageName = "golf.svg"; // Golf
                break;
            default:
                imageName = "logo-content-arena.svg";
                caLogo = true;
                break;
        }

        listingImageUrl = imagesBaseDir + imageName;
    }

    return (
        <div className={cn("image", { 'sport-placeholder': isSportPlaceholder, 'ca-logo': caLogo })}>
            <img src={listingImageUrl} />
        </div>
    );
};

export const humanFileSize = (bytes, si) => {
    let thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    let units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
};

export const getAutoGeneratedListingName = ({sports, sportCategory, tournament, seasons, customCategory, customTournament}) => {
    let summary = "", rounds = [], fixtures = [], matches = [];

    if (sports.length === 0 && sportCategory.length === 0 && tournament.length === 0) return null;

    if (sports.length > 1) {
        summary += 'Multiple sports';
    } else {
        summary += (sports[0].custom) ? (sports[0].value !== undefined ) ? sports[0].value : "" : sports[0].name;
    }

    if ( sportCategory.length > 0 && !sportCategory[0].custom )  summary += " - " + sportCategory[0].name;
    if ( customCategory && customCategory != "") summary += " - " + customCategory;
    if ( tournament.length > 0 && !tournament[0].custom )  summary += " - " + tournament[0].name;
    if ( customTournament && customTournament != "") summary += " - " + customTournament;
    if ( seasons.length > 0 ){
        const seasonsStr = [];
        seasons.forEach(s => {
            const str = s.custom && s.from && s.to ? `${s.from}/${s.to}` : (s.custom && s.from) ? s.from : (s.year) ? s.year: null;
            if (str) seasonsStr.push(str);
            if ( s.fixtures ) fixtures = [...fixtures, ...s.fixtures];
        });

        if (seasonsStr.length) {
            summary += " - " + seasonsStr.join(' - ');
        }
    }

    if ( rounds.length <= 1 && fixtures.length === 1 )  summary += ` - ${fixtures[0].name} (${moment(fixtures[0].date).format('DD-MM-YYYY')})`;
    if ( rounds.length <= 1 && fixtures.length > 1 )  summary += " - " + fixtures.length + " Fixtures";
    if ( rounds.length <= 1 && matches.length === 1 )  summary += " - " + matches[0].competitors.map(function (competitor) {
        return competitor.name ;
    }).join(" vs ");
    if ( rounds.length === 1 && matches.length !== 1 )  summary += " - " + rounds[0];
    if ( rounds.length > 1) summary += " - Multiple rounds";

    return summary;
};