/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    var data = {}, regions, countryCodes= [], rounds = {}, current_date = new Date(), eventData = {},
        yearArray = Array(2022 - 1950 + 1).fill().map(function(item, index) { return {value : 1950 + index, label : 1950 + index }});

    yearArray .push({label: "To be announced", value : 0 });
    yearArray.reverse();

    var selectorCounter = 0,
        mainPackage = null;

    function checkSelectedPackages() {
        $(".select-box-item-container").hide();

        $.each($(".package-selector"), function (i, pack) {

            var id = $(pack).attr("id").split("-")[1];

            if (pack.checked) {
                $(".has-package-" + id).show();
                $("#sell-box-package-" + id).show();
            }
        });

        $.each($(".seller-box-content"), function () {
            if ($(this).children().length == 0) {
                $(this).parent().hide()
            } else {
                if ($(this).children().first().css("display") == 'none') {
                    $(this).parent().hide()
                }
            }
        });

        $("#main-sell-box").show();
        $("#price-sell-box").show();
        $(".package-ready-button").show();
        $("#price-sell-box .select-box-item-container").show();
    }

    function loadRegions(){
        $.ajax({
            url: hosturl + "v1/feed/test",
            type: "GET",
            success: function (response) {
                regions = response
            }
        });
    }

    function addLanguageBehaviour(){

        $.each($(".has-language-trigger"),function(k,el){
            $(el).uls({
                onSelect: function (language) {
                    var languageName = $.uls.data.getAutonym(language);
                    var el = this.$element;
                    el.before("<div title='language' class='selected-language'>"+languageName+", </div>");
                },
                quickList: ['en','fr', 'es']
            });
        });

    }

    function fillTournaments(){
        var options = {
                getSource : function(response){
                    var categoryId = $("#event-country-selector").attr('externalId'),
                        territoryId= $("#event-territory-selector").attr('externalId'),
                        list;

                    if ( response.tournaments === undefined || response.tournaments.tournament === undefined ) return false;

                    list =  $.map(response.tournaments.tournament, function (item) {
                        if ( categoryId && item.category['@attributes'].id != categoryId) return null;
                        if ( !categoryId && territoryId && $.inArray(item.category['@attributes'].country_code, countryCodes) == -1) return null;

                        return {label: item['@attributes'].name, value: item['@attributes'].id}
                    });

                    list.push({
                        label : "Add new",
                        value : "new"
                    });

                    return list;
                },
                addCustom : function(){
                    addCustomFn("#event-tournament-selector", "Enter Tournament");
                    addCustomFn("#event-season-selector", "Enter Season");
                    $("#event-schedule-subitems").html("");
                    $("#event-custom-subitems").children().show();
                }
            },
            el = $("#event-tournament-selector"),
            spinner = el.parent().find("i");

        spinner.show();

        el.attr("disabled", "disabled");
        if ( el.data('autocomplete') ) el.autocomplete('destroy').off();

        $.ajax({
            url: hosturl + "v1/feed/tournaments",
            type: "POST",
            data : { id : $("#event-sport-selector").attr('externalId') },
            success: function (response) {

                var source = options.getSource(response);
                el.attr("disabled", null);

                if ( source.length === 0 ){
                    options.addCustom();
                    spinner.hide();
                    return;
                }

                el.autocomplete({
                    source: source,
                    minLength : 0,
                    select: function( event, ui ) {
                        event.preventDefault();

                        if ( ui.item.value === "new" ){
                            options.addCustom();
                            return;
                        }

                        $(event.target).val(ui.item.label).attr("externalId", ui.item.value).blur();
                        fillSeasons();
                        $("#event-season-selector").val("").removeClass("custom-input");;
                        $("#event-schedule-subitems").html("");
                        $("#event-custom-subitems").children().hide();
                    }
                }).focus(function(){
                    $(this).autocomplete("search", "");
                });

                spinner.hide();
            }
        });
    }

    function fillSeasons(){
        var options = {
            selector : "#event-season-selector",
            parentSelection : "#event-tournament-selector",
            endpoint : "v1/feed/seasons",
            requestType : "POST",
            getSource : function(response){

                var list;

                if ( response.seasons === undefined || response.seasons.season === undefined ) return false;

                if ( $.isArray(response.seasons.season) ){
                    list = $.map(response.seasons.season, function (item) {
                        return {label: item['@attributes'].name, value: item['@attributes'].id}
                    }).reverse();
                } else {
                    list = [{label: response.seasons.season['@attributes'].name, value: response.seasons.season['@attributes'].id}]
                }

                list.push({
                    label : "Add new",
                    value : "new"
                });

                return list;

            }
        };

        var el = $(options.selector),
            spinner = el.parent().find("i"),
            source;

        spinner.show();

        el.attr("disabled", "disabled");
        if ( el.data('autocomplete') ) el.autocomplete('destroy').off();

        $.ajax({
            url: hosturl + options.endpoint,
            type: options.requestType || "GET",
            data : { id : $(options.parentSelection).attr('externalId') },
            success: function (response) {

                source = options.getSource(response);
                el.attr("disabled", null);
                el.autocomplete({
                    source: source,
                    minLength : 0,
                    select: function( event, ui ) {

                        // Prevent autocomplete plugin default action
                        event.preventDefault();

                        var id,
                            selected = ui.item.value;

                        // Add new functionality
                        if ( selected === "new" ){
                            addCustomFn(event.target, "Enter season name");
                            $("#event-custom-subitems").children().show();

                            return;
                        }

                        $("#event-custom-subitems").children().hide();

                        id = selected.replace(/\:/g, '-');
                        source = $.grep(source, function (el, i) {
                            if (el.value == ui.item.value ) {
                                return false;
                            }
                            return true;
                        });


                        $('#event-schedule-subitems')
                            .append('<div class="step1-event-subitem-title standard-button-active"  mainref="'+ id +'">'+ui.item.label+'</div><div class="step1-event-subitems-container"><div class="step1-event-subitem-title" ref="'+ id +'" >Fixture</div><div class="step1-event-subitems-container is-hidden" id="'+ id +'" ><i class="fa fa-cog fa-spin pos-rel"></i></div></div>');

                        $("[ref="+id+"]").click(function(){
                            $(this).toggleClass("standard-button-active");
                            $("#"+id).toggle();
                            $("#"+id).find("i").show();
                        });

                        $("[mainref="+id+"]").click(function(){
                            $(this).next().remove();
                            $(this).remove();
                            source.unshift({
                                label : ui.item.label,
                                value : ui.item.value
                            });
                        });

                        $( event.target ).autocomplete( "option", "source", source);

                        fillSchedule(id);
                    }
                }).focus(function(){
                    $(this).autocomplete("search", "");
                });

                spinner.hide();
            }
        });
    }

    function fillCategories(){
        var options = {
                getSource : function(response){

                    var list;

                    if ( response.categories === undefined || response.categories.category === undefined ) return [];

                    list = $.map(response.categories.category, function (item) {
                        if ( $.inArray(item['@attributes'].country_code, countryCodes) == -1 && $( "#event-territory-selector" ).attr("externalid") != 0 ) return null;
                        return {label: item['@attributes'].name, value: item['@attributes'].id}
                    });

                    list.push({
                        label : "Add new",
                        value : "new"
                    });

                    return list;

                },
                addCustom : function(){
                    addCustomFn("#event-country-selector", "Enter Country/Category");
                    addCustomFn("#event-tournament-selector", "Enter Tournament");
                    addCustomFn("#event-season-selector", "Enter Season");
                    $("#event-schedule-subitems").html("");
                    $("#event-custom-subitems").children().show();
                }
            },
            el = $("#event-country-selector"),
            spinner = el.parent().find("i");

        spinner.show();

        el.attr("disabled", "disabled");
        if ( el.data('autocomplete') ) el.autocomplete('destroy').off();

        $.ajax({
            url: hosturl +"v1/feed/categories",
            type: "POST",
            data : { id : $("#event-sport-selector").attr('externalId') },
            success: function (response) {

                var source = options.getSource(response);
                el.attr("disabled", null);

                if ( source.length === 0 ){
                    options.addCustom();
                    spinner.hide();
                    return;
                }

                el.autocomplete({
                    source: source,
                    minLength : 0,
                    select: function( event, ui ) {
                        event.preventDefault();

                        if ( ui.item.value === "new" ){
                            options.addCustom();
                            return;
                        }

                        $(event.target).val(ui.item.label).attr("externalId", ui.item.value).blur();
                        fillTournaments();
                        $.each(["#event-tournament-selector", "#event-season-selector"], function(k, id){
                            $(id).val("").removeClass("custom-input");
                        });
                        $("#event-schedule-subitems").html("");
                        $("#event-custom-subitems").children().hide;
                    }
                }).focus(function(){
                    $(this).autocomplete("search", "");
                });

                spinner.hide();
            }
        });
    }

    function fillSchedule( id ){
        $.ajax({
            url: hosturl + "v1/feed/schedules",
            type: "POST",
            data : { id : id.replace(/\-/g, ':') },
            success: function (response) {

                var source = [];

                if ( response.sport_events && response.sport_events.sport_event ){
                    $.each(response.sport_events.sport_event, function (k, item) {

                        var season_id = id,
                            round = item.tournament_round['@attributes'].number || item.tournament_round['@attributes'].type;

                        if ( rounds[season_id] == undefined) rounds[season_id] = {};
                        if ( rounds[season_id][round] == undefined ) rounds[season_id][round] = [];
                        rounds[season_id][round].push(item);

                    });

                    source = $.map(rounds[id], function (item, k) {

                        if ( k === 'undefined' ) k = "";
                        return {label: "Matchday " + k, value: "matchday-"+k}
                    });
                }

                $.each( source, function(k, item){
                    var roundNumber = item.value.replace("matchday-", "");
                    $('#' + id)
                        .append('<div class="step1-event-subitem-title matchday-subitem" ref="'+id + '-' +  item.value +'" >'+item.label+'</div><div class="step1-event-subitems-container is-hidden" id="'+ id + '-' +item.value +'" ></div>');

                    $.each( rounds[id][roundNumber], function(k, match){

                        var label = "",
                            selId,
                            attrs = match['@attributes'],
                            competitors = match.competitors.competitor;

                        label += new Date(attrs.scheduled).toISOString().split('T')[0];
                        label += " - ";

                        $.each(competitors, function(k, v){
                            label += v['@attributes'].name + " "
                        });

                        selId = "match-" + match['@attributes'].id.split(":")[2];

                        $('#'+ id + '-' + item.value)
                            .append('<div class="step1-event-subitem-title" ref="'+ id + '-' + item.value +'" id="'+  match['@attributes'].id +'" selId="'+selId+'" >'+label+'</div>');

                        $("[selId="+  selId + "]").data(match);
                    });

                });

                $('#' + id)
                    .append('<div class="step1-event-subitem-title matchday-subitem-showall" >Show All</div>');


                $("#"+id).find("i").remove();

                $(".matchday-subitem:nth-child(n+18)", "#"+ id).hide();

                $(".matchday-subitem-showall", "#"+ id).click(function () {
                    $(".matchday-subitem:nth-child(n+18)", "#"+ id).show();
                    $(this).remove();
                });

                $("#"+id + " .step1-event-subitem-title").click(function(){

                    var subItemId = $(this).attr("ref");

                    $(this).toggleClass("standard-button-active");

                    if ( $(this).attr("id") !== undefined ) return false;

                    if( $(this).hasClass("standard-button-active") ){
                        $('#'+ subItemId).show()
                    } else {
                        $('#'+ subItemId).hide()
                    }
                });

            }
        });
    }

    function validateStepOne(){

        var eventTypeSelector = $(".event-origin-selector.standard-button-active").attr("ref"),
            eventType = eventTypeSelector.split("-")[0],
            hasErrors = false;

        if ( $("#series-events-selector").hasClass("standard-button-active") ) {
            eventTypeSelector += ", .custom-series-event-item";
        }

        eventData = {};
        eventData.eventType = eventType;

        $("." + eventTypeSelector).each(function(k, item){

            var itemInput = $(item).find(".step1-event-input-content"),
                required = itemInput.attr("required"),
                name = (itemInput.attr("id")) ? itemInput.attr("id").split("-")[1] : false,
                value,
                externalId;

            if ( itemInput.length > 0){
                externalId = itemInput.attr("externalId");
                value = itemInput.val();

                if ( value && eventData[name] == undefined ) eventData[name] = {};
                if ( value && externalId ) eventData[name].externalId = externalId;
                if ( value ) eventData[name].value = value;

            }

            if ( !value && required ){
                $(itemInput).addClass("invalid");
                hasErrors = true;
            }

        });

        if (eventType == 'database' ){

            eventData.matches = {};

            $(".step1-event-subitem-title.standard-button-active").each(function(k,v){
                var matchday = $(v).attr("ref"),
                    matchId = $(v).attr("id");

                if ( matchId == undefined ){
                    if ( eventData.matches[matchday] == undefined ) eventData.matches[matchday] = [];
                } else {
                    eventData.matches[matchday].push($(v).data());
                }
            });
        }

        console.log(eventData);

        return !hasErrors;
    }

    function validateStepTwo(){


        var rights = {},
            rightItems = [];

        $("input[type=checkbox]:checked", ".seller-box-content-rights").each(function(k, el){

            var rightId = $(el).attr("right-id"),
                rightItemId = $(el).attr("right-item-id"),
                values = [];

            $(el).parent().next().find("input").each(function(k,v){
                values.push( $(v).val() );
            });

            if ( rights[rightId] == undefined ) rights[rightId] = [];
            rights[rightId].push({
                id : rightItemId,
                values : values
            });

            rightItems.push({
                id : rightItemId,
                values : values,
                right : rightId
            })

        });

        eventData.rights = rights;
        eventData.rightItems = rightItems;
        eventData.packages = [];
        $(".package-selector:checked").each(function(k,v){
            eventData.packages.push($(v).attr("id").split("-")[1] );
        });
        eventData.salesMethod = $("input:checked", "#sales-method-selector").val();
        eventData.fee = {
            amount : $( "#fee-selector").val(),
            currency : $("input:checked", "#fee-currency-selector").val()
        };
        eventData.territories = $("input:checked", "#territories-selector").val();

        console.log(eventData);
    }

    function submitform() {
        var url = envhosturl + 'sell/published',
            form = $('#myform');

        form.attr('action', url);

        var data = JSON.stringify(eventData);

        $('<input type="hidden" name="json"/>').val(data).appendTo('#myform');
        form.submit();
    }

    function addCustomFn( el, placeholder ){
        $(el)
            .off()
            .val("")
            .addClass("custom-input")
            .attr("placeholder", placeholder);

        if ( $(el).data('ui-autocomplete') != undefined ) $(el).autocomplete('destroy');
    }

    $(".package-selector").change(function () {

        var id = $(this).attr("id").split("-")[1],
            name = $(this).attr("name").split("-")[1];

        checkSelectedPackages();

        /*if ( selectorCounter == 0 ){
            $(".main-specify").html(name);
        } else {
            $(".main-specify").html("collectively");
        }*/

        if (!this.checked || selectorCounter >= 1) return;

        $.each($(".package-selector"), function (i, pack) {

            var packages = $(pack).data("packages"),
                pack_id = $(pack).attr("id").split("-")[1],
                el = $(this),
                flag = false;

            $.each(packages.parent, function (i, p) {
                if (p.id == id) flag = true;
            });

            if (!flag){
                el.attr("disabled", "disabled");
                if (pack_id != id) el.parent().next().addClass("disabled");
            }

        });

        $("#sell-box").removeClass("is-hidden");

        mainPackage = name;
        selectorCounter++;

    });

    $("#reset-packages").click(function () {
        $.each($(".package-selector"), function (i, pack) {

            pack.checked = false;
            $(pack).attr("disabled", null);
            $(pack).parent().next().removeClass("disabled");
            $("#main-sell-box").hide();
            $(".select-box-item-container").hide();
            $(".sell-items-box").hide();
            $("#price-sell-box").hide();
            $(".package-ready-button").hide();
            selectorCounter = 0;


        });
    });

    $(".event-origin-selector").click(function(){

        var ref = $(this).attr("ref");

        $.each($(".event-origin-selector"), function(k, v){
            $(v).toggleClass("standard-button-active");
        });

        $(".step1-event-item").hide();
        $("." + ref).show();

    });

    $("#single-events-selector").click(function(){
        $(this).addClass("standard-button-active");
        $("#series-events-selector").removeClass("standard-button-active");
        $(".custom-series-event-item").hide();
    });

    $("#series-events-selector").click(function(){
        $(this).addClass("standard-button-active");
        $("#single-events-selector").removeClass("standard-button-active");
        $(".custom-series-event-item").show();
    });

    $(".go-to-rights").click(function(){

        if ( !validateStepOne() ) return;

        $("#step2").show();
        $("#step1").hide();
    });

    $("#submit-listing").click(function(){

        validateStepTwo();
        submitform();
    });

    $(".has-datepicker").datepicker();

    $(".unselect-others").change(function(){

        var _this = this;

        $.each($(this).parent().parent().siblings(), function (k, item) {
            if ( _this != item ) $(item).find("input").attr("checked", false);
        });
    });

    $(".unselect-all").change(function(){

        $.each($(this).parent().parent().siblings(), function (k, item) {
            if ( $(item).hasClass('all-type') ) $(item).find("input").attr("checked", false);
        });
    });

    /**
     * Renders all the tooltips
     */
    $( document ).tooltip();

    /**
     * Fills the sport selector
     */
    $.ajax({
        url: hosturl + "v1/feed/sports",
        type: "GET",
        success: function (response) {
            data.sports = $.map(response.sport, function (item) {
                return {label: item['@attributes'].name, value: item['@attributes'].id}
            });

            data.sports.sort(function(a,b) {return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);} );
            data.sports.push({
                label : "Add new",
                value : "new"
            })
        }
    });

    $( "#event-sport-selector" ).autocomplete({
        source: [
            { label : "Soccer", value: "sr:sport:1"},
            { label : "Basketball", value: "sr:sport:2"},
            { label : "Baseball", value: "sr:sport:3"},
            { label : "Tennis", value: "sr:sport:5"},
            { label : "Cricket", value: "sr:sport:21"},
            { label : "Field Hockey", value: "sr:sport:24"},
            { label : "Volleyball", value: "sr:sport:23"},
            { label : "Table Tennis", value: "sr:sport:20"},
            { label : "Golf", value: "sr:sport:9"},
            { label : "American Football", value: "sr:sport:16"},
            { label : "Handball", value: "sr:sport:6"},
            { label : "Show All", value: "all"}
        ],
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();

            if (ui.item.value === "all"){
                $( "#event-sport-selector" ).autocomplete( "option", "source", data.sports );
                setTimeout(function(){
                    $( "#event-sport-selector" ).autocomplete("search", "");
                }, 500);
                return;
            }

            if (ui.item.value === "new"){
                addCustomFn(event.target, "Enter sport name");
                return;
            }

            $(event.target)
                .val(ui.item.label)
                .attr("externalId", ui.item.value)
                .blur();

            $( "#event-territory-selector").val("");
            $("#event-country-selector").val("");
            $("#event-tournament-selector") .val("");
            $("#event-season-selector") .val("");
            $("#event-schedule-subitems").html("");
            fillTournaments();

        }
    }).focus(function(){
       $(this).autocomplete("search", "");
    });

    $.ajax({
        url: envhosturl + "v1/feed/company",
        type: "GET",
        success: function (response) {
            var source = $.map(response, function (item) {
                return {label: item.email, value: item.id}
            });

            function split( val ) {
                return val.split( /,\s*/ );
            }
            function extractLast( term ) {
                return split( term ).pop();
            }

            $(  "#tag-members" ).autocomplete({
                source: function( request, response ) {
                    // delegate back to autocomplete, but extract the last term
                    response( $.ui.autocomplete.filter(
                        source, extractLast( request.term ) ) );
                },
                minLength: 0,
                select: function( event, ui ) {
                    var terms = split( this.value );
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.label );
                    // add placeholder to get the comma-and-space at the end
                    terms.push( "" );
                    this.value = terms.join( ", " );

                    $(event.target).blur();
                    return false;
                }
            }).focus(function(){
                $(this).autocomplete("search", "");
            });
        }
    });

    /**
     * Fills the territory selector.
     * The value tries to match the country code with the region code.
     * The region code comes from a static JSON file and the country code is used in the Sportradar API
     */
    $( "#event-territory-selector" ).autocomplete({
        source : [
            { label: "Africa", value : 2},
            { label: "Europe", value : 150},
            { label: "America", value : 19},
            { label: "Asia", value : 142},
            { label: "Oceania", value : 9 },
            { label: "World", value : 0 }
        ],
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();
            $(event.target).val(ui.item.label).attr("externalId", ui.item.value).blur();

            countryCodes = $.map(regions, function(i){
                if ( i["region_code"]== ui.item.value) return i["country_code"]
            });

            if ( ui.item.value == 0 ) {
                $("#event-country-selector").attr("placeholder", "Country/Category").val("");
            } else {
                $("#event-country-selector").attr("placeholder", "Country").val("");
            }


            $("#event-tournament-selector") .val("");
            $("#event-season-selector") .val("");
            $("#event-schedule-subitems").html("");

            fillCategories();
            fillTournaments();
        }
    }).focus(function(){
       $(this).autocomplete("search", "");
    });

    /**
     * Fills the program type selector
     */
    $( "#event-programType-selector" ).autocomplete({
        source : [
            { label: "Magazine", value : 0},
            { label: "Highlight show", value : 1},
            { label: "Preview", value : 2},
            { label: "Talk-show", value : 3},
            { label: "Documentary", value : 4 },
            { label: "Other", value : 5 }
        ],
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();
            $(event.target).val(ui.item.label).attr("externald", ui.item.value).blur();
        }
    }).focus(function(){
        $(this).autocomplete("search", "");
    });

    $( "#event-year-selector" ).autocomplete({
        source : yearArray,
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();
            $(event.target).val(ui.item.label).blur();
        }
    }).focus(function(){
       $(this).autocomplete("search", "");
    });

    $( "#event-customAmount-selector" ).autocomplete({
        source : Array.from(Array(50).keys()).map(function(item, index) { return {value : index +1, label : index+1 }}),
        minLength: 0,
    }).focus(function(){
        $(this).autocomplete("search", "");
    });

    $( "#event-customType-selector" ).autocomplete({
        source : [
            { label: "League", value : 1},
            { label: "Tournament", value : 2},
        ],
        minLength: 0,
        select: function( event, ui ) {
            event.preventDefault();
            $(event.target).val(ui.item.label).attr("externalId", ui.item.value).blur();
        }
    }).focus(function(){
        $(this).autocomplete("search", "");
    });

    $( "#event-duration-selector" ).mask('00:00');

    $("#event-availability-selector").datepicker({
        //onSelect : function(date){
        //    $("#event-availability-selection").attr("selected-id", "-");
        //}
    });

    $("#event-customStart-selector").datepicker();

    $("#event-customEnd-selector").datepicker();

    $('#event-file-selector').off().focus(function(e){
        $(this).blur();
        $('#event-file-selector-hidden').trigger("click");
        e.preventDefault();
    });

    $('#event-file-selector-hidden').change(function(){
        $('#event-file-selector').val($(this).val());
    });

    $("input").focus(function(){
        $(this).removeClass("invalid");
    });

    $('#event-website-selector').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
    });

    $("#view-agreement").click(function () {

        validateStepTwo();
        $("#view-agreement").attr("disabled", "disabled").append('<i class="fa fa-cog fa-spin">');
        $.ajax({
            url : envhosturl + 'v1/contract/previews',
            type: 'POST',
            data : {
                content : JSON.stringify(eventData)
            },
            success : function( response ){
                console.log(response);
                eventData.id = response.id;
                window.location.href = envhosturl + 'contract/preview?id='+ response.id;
                $("#view-agreement").attr("disabled", null).find('i').remove();
            }
        })

    });

    /**
     * Initialization
     */
    addLanguageBehaviour();
    loadRegions();

    $(".step1-event-item").hide();
    $(".step1-container").show();
    $(".database-event-item").show();

});
