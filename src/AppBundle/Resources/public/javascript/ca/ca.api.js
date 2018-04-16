/**
 * Created by JuanCruz on 4/1/2018.
 */

let __apiStore = {
    tournaments : {}
};

window.ContentArena = window.ContentArena || {};

ContentArena.Api= {
    sortByLabel (a, b) {
        return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)
    },

    prepareList ( list, categoryId ) {

        let _this = this;

        list = $.map(list, function (item) {

            // Filter by category
            if ( categoryId && item.category['@attributes'].id != categoryId) return null;

            return {name: item['@attributes'].name, external_id: item['@attributes'].id}
        });

        list.sort(_this.sortByLabel);

        return list;
    },

    getContent ( filter) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "buy/search",
            type: "POST",
            data : filter,
            success: function (response) {
                deferred.resolve(response);
            },
            error : function (data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },

    saveFilter ( filter) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "buy/filter/save",
            type: "POST",
            data : filter,
            success: function (response) {
                deferred.resolve(response);
            },
            error : function (data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },

    getSports () {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: hosturl + "v1/feed/sports",
            type: "GET",
            /**
             * @param {{sport:object}} response
             */
            success: function (response) {

                var sports = _this.prepareList( response.sport);
                deferred.resolve(sports);
            },
            error : function (data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },

    getContentDetails( id ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "content/details/",
            type: "POST",
            data: {id : id},
            success: function (response) {
                deferred.resolve(response);
            },
            error : function (data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },

    getPendingListings( id ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "content/pending-listings/",
            type: "POST",
            data: {id : id},
            success: function (response) {
                deferred.resolve(response);
            },
            error : function (data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },

    getCategories ( sportId ) {
        var deferred = jQuery.Deferred(),
            _this = this,
            list = [],
            cats = [];

        _this.getTournaments(sportId).done(function () {

            if ( ! __apiStore.tournaments[sportId] ) {
                deferred.resolve( [] );
                return;
            }

            list = $.map( __apiStore.tournaments[sportId].tournament , function (item) {

                let id = item.category['@attributes'].id;

                if ( cats.indexOf(id) !== -1 ) {
                    return null;
                } else {
                    cats.push( id );
                    return item.category;
                }
            });

            deferred.resolve(_this.prepareList(list) );
        });


        return deferred.promise();
    },

    getTournaments ( sportId, categoryId ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        if ( __apiStore.tournaments[sportId] !== undefined ){
            deferred.resolve(_this.prepareList(__apiStore.tournaments[sportId].tournament, categoryId));
            return deferred.promise();
        }

        $.ajax({
            url: hosturl + "v1/feed/tournaments",
            type: "POST",
            data : { id : sportId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function (response) {

                // A comment
                if ( response.tournaments === undefined || response.tournaments.tournament === undefined ) {
                    deferred.resolve([]);
                    return;
                }

                __apiStore.tournaments[sportId] = response.tournaments;
                deferred.resolve(_this.prepareList(response.tournaments.tournament, categoryId));
            },
            error : function (data, status ) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });
        return deferred.promise();
    },

    getSeasons ( tournamentId ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: hosturl + "v1/feed/seasons",
            type: "POST",
            data : { id : tournamentId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function (response) {

                var list;

                if ( response.seasons === undefined || response.seasons.season === undefined ) return false;

                if ( $.isArray(response.seasons.season) ){
                    list = $.map(response.seasons.season, function (item) {
                        return {
                            name: item['@attributes'].name,
                            external_id: item['@attributes'].id,
                            end_date: item['@attributes'].end_date,
                            start_date: item['@attributes'].start_date,
                            tournament_id: item['@attributes'].tournament_id,
                            year: item['@attributes'].year,
                        }
                    }).reverse();
                } else {
                    list = [{
                        name: response.seasons.season['@attributes'].name,
                        external_id: response.seasons.season['@attributes'].id,
                        end_date: response.seasons.season['@attributes'].end_date,
                        start_date: response.seasons.season['@attributes'].start_date,
                        tournament_id: response.seasons.season['@attributes'].tournament_id,
                        year: response.seasons.season['@attributes'].year,
                    }]
                }

               /* list.push({
                    name : "Add new",
                    external_id : 0
                });*/

                deferred.resolve(list);
            },
            error : function (data, status ) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });
        return deferred.promise();
    },

    getSchedule ( seasonId ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: hosturl + "v1/feed/schedules",
            type: "POST",
            data : { id : seasonId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function (response) {

                console.log(response);

                let list = {};

                if ( response.sport_events === undefined || response.sport_events.sport_event === undefined ) return false;

                response.sport_events.sport_event.forEach( (item) => {

                    let round  = (item.tournament_round) ? item.tournament_round['@attributes'] : null;

                    if (!round) return;

                    let name = round.number || round.name;

                    if ( !list[name] ) list[name] = [];

                    list[name].push({
                        scheduled: item['@attributes'].scheduled,
                        external_id: item['@attributes'].id,
                        status: item['@attributes'].status,
                        tournament_round : round,
                        competitors : (item.competitors) ? item.competitors.competitor.map(( competitor)=>{ return competitor['@attributes']  })  : null
                    });

                });

                /*list.push({
                    name : "Add new",
                    external_id : 0
                });*/

                deferred.resolve(list);
            },
            error : function (data, status ) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });
        return deferred.promise();
    },

    searchCompetition(request) {

        let deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + 'search/tournament',
            data: {
                "content": request
            },
            traditional: true,
            type: "POST",
            dataType: "json",
            success: function (data) {
                deferred.resolve(data);
            },
            error : function (data, status ) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });
        return deferred.promise();
    },

    watchlist( id ) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "mycontent/watchlist/",
            type: "POST",
            data: {id : id},
            success: function (response) {
                deferred.resolve(response);
            },
            error : function (data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    }
};


