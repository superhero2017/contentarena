export const getCurrencySymbol = code => {
    return (code === "EUR") ? "€" : "$";
};

export const goTo = (route, openNew) => {

    if (openNew) {
        window.open(envhosturl + route, "_blank");
    } else {
        window.location.href = envhosturl + route
    }
};

export const historyGoTo = (route) => {
    window.history.pushState(null, null, envhosturl+route);
};

export const goToListing = (id, openNew) => {
    goTo("listing/"+ id, openNew)
};

export const viewLicense = id => {
    goTo("license/preview/"+ id)
};

export const viewLicenseBid = id => {
    goTo("license/bid/"+ id)
};

export const viewLicenseBundle = (id, listingId) => {
    goTo("license/bundle/"+ id + "/" + listingId)
};

export const viewLicenseCustom = (listingId, bundle) => {

    const serialize = function(obj, prefix) {
        var str = [],
            p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    };

    //let queryString = Object.keys(bundle).map(key => key + '=' + bundle[key]).join('&');
    goTo("license/custom/" + listingId + "?" + serialize(bundle) )
};

export const goToMarketplace = () => {
    goTo("marketplace")
};

export const goToClosedDeals = () => {
    goTo("closeddeals")
};

export const getFee = (salesPackage) => {
    const feeNumber = parseFloat(salesPackage.fee);
    return feeNumber.toLocaleString() +" " + getCurrencySymbol(salesPackage.currency.code);
};

export const getFullName = (user) => {
    return user.firstName + " " + user.lastName;
};

export const limitText = (txt, limit = 25) => {
    return (txt.length > limit) ? txt.substring(0,limit) + "..." : txt
};

export const editedProgramSelected = (rights) => {
    return rights.filter(r=>r.shortLabel === 'PR').length === 1
};

export const parseSeasons = (content) => {
    if (content.seasons === undefined) return content;
    content.seasons.forEach((season)=>{
        season.selectedSchedules = {};

        if (season.schedules === undefined ) return;

        Object.entries( season.schedules).filter((round) =>{
            if ( !round || round.length <= 1 ) return false;
            return round[1].selected
        }).map((round)=>{
            if (!season.selectedSchedules[round[0]]) season.selectedSchedules[round[0]] = {matches:[]};
            if(round[1].selected){
                Array.from(round[1].matches.values()).filter(match => match.selected).forEach((match)=>{
                    season.selectedSchedules[round[0]].matches.push(match)
                })
            }
        })
    });

    return content;
};