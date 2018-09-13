import React from 'react';
import { connect } from "react-redux";
import FileSelector from '../../main/components/FileSelector'
import SearchCompetition from '../../main/components/SearchCompetition'
import SeasonSelector from '../../main/components/SeasonSelector'
import TagsInput from 'react-tagsinput'
import {stepChangeReset} from "../actions/contentActions";

import {
    Description,
    NewTournament,
    NewCategory,
    SportSelector,
} from "../components/SellFormItems";
import {PropTypes} from "prop-types";

class SellFormStep1 extends React.Component {

    constructor(props) {
        super(props);
        if ( props.step !== 1) return;
        this.state = {
            lastSportId : null,
            lastCategoryId : null,
            lastTournamentId : null,
            loadingCategories : false,
            loadingTournaments : false,
            loadingSeasons: false,
            loadingSchedule: false,
            seasonSelectors : [1],
            sportSelectors : [1],
            seasons: [],
            schedules: {},
            showSearch : props.showSearch,
            websites: [],
            website: '',
            tournaments: [],
            sportCategories: [],
            sportCategoryExtended : false,
        };
    }

    componentDidMount () {

        if (this.props.step !== 1) return;

        ContentArena.Api.getSports().done( (sports ) => {
            ContentArena.Data.FullSports = sports;
        });

        ContentArena.Api.getCountries().done( (countries ) => {
        });

        this.props.updateContentValue("lastUpdate",new Date().getTime());
    }

    loadCategories (sport) {

        let sportId = sport.externalId;

        if ( sportId === this.state.lastSportId ) return;

        this.setState({ loadingCategories : true });
        ContentArena.Api.getCategories(sportId).done( (categories ) => {
            ContentArena.Data.Categories = categories;
            this.setState({ lastSportId : sportId, loadingCategories : false });
        });
    }

    loadTournaments (sport, category) {

        if( sport.custom ) return;

        let sportId = sport.externalId;
        let categoryId = ( category ) ? category.externalId : null;

        if ( sportId === this.state.lastSportId && categoryId === this.state.lastCategoryId ) return;

        this.setState({ loadingTournaments : true });
        ContentArena.Api.getTournaments(sportId,categoryId).done( (tournaments ) => {
            ContentArena.Data.Tournaments = tournaments;

            if (tournaments.length === 0 ) {
                if (!this.state.customSeasonsParsed){
                    this.props.addNewCategory();
                    this.props.addNewTournament();

                    if (this.props.customSeasons.length > 0 ){

                        this.props.customSeasons.forEach((s,i)=>{
                            this.props.addNewSeason(i);
                            this.props.updateFromMultiple("seasons", i, "from", s.from);
                            this.props.updateFromMultiple("seasons",i, "to", s.to);
                            if (s.fixtures) this.props.updateFromMultiple("seasons",i, "fixtures", s.fixtures);
                        });
                    } else {
                        this.props.addNewSeason(0);
                    }
                }

                this.setState({
                    loadingTournaments : false,
                    customSeasonsParsed : true
                });

                return;
            }

            this.setState({
                lastSportId : sportId,
                loadingTournaments : false,
                lastCategoryId : categoryId
            });
        });
    }

    loadSeasons (tournaments) {
        let tournamentId = ( tournaments.length > 0 ) ? tournaments[0].externalId : null;

        if ( tournamentId === this.state.lastTournamentId ) return;

        this.setState({ loadingSeasons : true });
        ContentArena.Api.getSeasons(tournamentId).done( (seasons ) => {
            ContentArena.Data.Seasons = seasons;

            if (seasons.length === 0 ) {
                this.props.addNewSeason(0);
                this.setState({
                    loadingSeasons : false,
                });
                return;
            }

            this.setState({
                lastTournamentId : tournamentId,
                loadingSeasons : false,
                seasons : seasons
            });
        })
            .always(()=>{
            });
    }

    loadSchedule (nextProps) {

        let _this = this;
        const { updateFromMultiple } = this.props;
        const { seasons, schedulesBySeason } = nextProps;

        seasons.forEach(( season, index ) =>{
            if ( !season.schedules && !season.custom ){
                _this.setState({ loadingSchedule : true });
                ContentArena.Api.getSchedule(season.externalId).done( (schedules ) => {
                    _this.setState({ loadingSchedule : false });
                    let keys = [];
                    if (schedulesBySeason && schedulesBySeason[index]){
                        keys = Object.keys(schedulesBySeason[index]);
                        keys.forEach((k)=>{
                            schedulesBySeason[index][k].matches.forEach((m)=>{
                                if (m.selected) {
                                    schedules[k].matches.get(m.externalId).selected = true;

                                }
                            });
                            schedules[k].selected = true;
                        });
                    }

                    updateFromMultiple("seasons", index, "schedules", schedules);
                    if( keys.length> 0) updateFromMultiple("seasons", index, "showSchedule", true);

                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.step !== 1) return;

        const { loadingCategories, loadingTournaments, loadingSeasons } = this.state;
        let tournaments, seasons, sportCategories, websites, name = nextProps.name;

        tournaments = ( Array.isArray(nextProps.tournament) ) ? nextProps.tournament : [nextProps.tournament];
        seasons = ( Array.isArray(nextProps.seasons) ) ? nextProps.seasons : [nextProps.seasons];
        sportCategories =( Array.isArray(nextProps.sportCategory) ) ? nextProps.sportCategory : [nextProps.sportCategory];
        websites =( Array.isArray(nextProps.website) ) ? nextProps.website : (nextProps.website) ? [nextProps.website]: [];

        if (nextProps.sports.length === 1 && !loadingCategories) {
            this.loadCategories(nextProps.sports[0]);
            this.setState(() => ({
                showSearch: false
            }));
        }

        if (nextProps.sports.length === 0) {
            this.setState(() => ({
                seasons: [],
                schedules: []
            }));
            sportCategories = [];
            tournaments= [];

            this.props.updateContentValue("name","");
        }

        if (nextProps.sports.length === 1 && !loadingTournaments) {
            this.loadTournaments(nextProps.sports[0], sportCategories[0]);
        }

        if (tournaments.length === 1 && !loadingSeasons) {
            if (!tournaments[0].custom) {
                this.loadSeasons(tournaments);
            }
        }

        if (tournaments.length === 0) {
            this.setState({seasons : []});
        }

        this.setState({
            sportCategories: sportCategories,
            tournaments : tournaments,
        });

        if (sportCategories.length === 1 ) {
            this.setState({sportCategoryExtended : sportCategories[0].extended});

            if (sportCategories[0].extended){
                this.props.updateContentValue("customCategory",sportCategories[0].name);
            }
        }

        if (seasons.length > 0) {
            this.setState(() => ({
                seasonSelectors: [...Array(seasons.length).keys()]
            }));
        }

        if (nextProps.sports.length > 0) {
            this.setState(() => ({
                sportSelectors: [...Array(nextProps.sports.length).keys()]
            }));
        }

        if (websites && websites.length > 0) {
            this.setState({ websites: websites});
        }

    }

    /**
     *
     * @param event
     * @param key
     */
    updateContentValue = ( event, key ) =>{
        this.props.updateContentValue(key,event.target.value);
    };

    forceCustomTournament = () => {
        return this.hasCustomSport() || this.hasCustomCategory() || this.state.sportCategoryExtended
    };

    forceCustomCategory = () => {
        return this.hasCustomSport()
    };

    forceCustomSeason = () => {
        let response = this.hasCustomSport() || this.hasCustomTournament();
        return response;
    };

    hasCustomSport = () => {

        let hasCustomSport = false;
        let response;

        this.props.sports.forEach( ( sport ) => {
            if ( sport.custom ) hasCustomSport = true;
        });

        response = hasCustomSport && this.props.sports.length === 1;

        return response;

    };

    hasCustomCategory = () => {

        let hasCustomCategory = false;
        let response;

        this.state.sportCategories.forEach( ( sportCategory ) => {
            if ( sportCategory.custom ) hasCustomCategory = true;
        });

        response =  this.forceCustomCategory() || hasCustomCategory ;
        return response
    };

    hasCustomTournament = () => {
        let hasCustomTournament = false;
        let response;
        this.state.tournaments.forEach( ( tournament ) => {
            if ( tournament.custom ) hasCustomTournament = true;
        });

        response =   this.forceCustomTournament() || hasCustomTournament || this.state.sportCategoryExtended;
        return response
    };

    hasCustomSeason = () => {

        let hasCustomSeason = false;
        let response;
        this.props.seasons.forEach( ( season ) => {
            if ( season.custom ) hasCustomSeason = true;
        });

        response =  this.forceCustomSeason() || hasCustomSeason;
        return response
    };

    addSeason = () => {
        console.log("ADDSEASON");
        const {seasons} = this.props;

        this.setState((prevState)=> ({
            seasonSelectors : [...Array(seasons.length +1).keys()]
        }));

        if ( this.hasCustomTournament() ){
            this.props.addNewSeason(this.props.seasons.length);
        }


    };

    addSportSelector = () => {
        this.setState((prevState)=> ({
            sportSelectors : [...prevState.sportSelectors, 1]
        }))
    };

    removeSport = (i) => {

        if ( i === 0 ) {
            this.props.removeNewSport(i);
            return;
        }

        this.setState((prevState)=> {
            prevState.sportSelectors.splice(i,1);
            return {
                sportSelectors : prevState.sportSelectors
            }
        });

        this.props.removeFromMultiple(i, "sports");
    };

    removeSeason = (i) => {

        if ( i === 0 ) {
            this.props.removeNewSeason(i);
            return;
        }

        this.setState((prevState)=> {
            prevState.seasonSelectors.splice(i,1);
            return {
                seasonSelectors : prevState.seasonSelectors
            }
        });

        this.props.removeFromMultiple(i, "seasons");
    };

    toggleSearch = ( tournament) => {
        const {history} = this.props;
        let _this = this;
        history.push("/contentlisting/1");
        if (tournament){
            setTimeout(()=>{
                _this.props.selectTournament(tournament);
            },1000);
        }
    };

    websitesUpdated = (websites) => {
        this.setState({websites});
        this.props.updateContentValue("website",websites);
    };

    handleWebsiteChange = website => {
        this.setState({website});
    };

    selectTournament = ( tournament ) =>{

        this.toggleSearch(tournament);
    };

    clear = () => {
        this.props.reset();
        const {history} = this.props;
        history.push("/contentlisting/new");
    };

    scroll = () => {

        const {stepChange, stepChangeReset } = this.props;

        if ( stepChange ) {
            window.scrollTo(0, 0);
            stepChangeReset();
        }

    };

    addFile = (response) => {
        const {attachments} = this.props;
        let index = attachments.length ;
        this.props.updateAttachments("save", index, {file: response.file, name : response.name } );
    };

    removeFile = ( index ) => {
        this.props.updateAttachments("remove", index, null);
    };

    showSeasonSelector = () => {
        let show = this.state.sportSelectors.length === 1 &&
            ( this.state.seasons.length > 0 || this.forceCustomSeason() ) &&
            this.state.seasonSelectors.length > 0;
        return show;

    };

    render() {

        if ( this.props.step !== 1 ) return (null);

        const {websites, website} = this.state;
        const websitePlaceholder = websites.length > 0 ? '' : this.context.t("CL_STEP1_PLACEHOLDER_WEBSITE");

        this.scroll();

        const inputProps = {
            sports: [{ value : "", custom : false }],
            sportCategory : { value : "", custom : false },
            tournament : { value : "", custom : false },
            seasons : [{ value : "", custom : false }]
        };

        if ( this.props.sports.length > 0 ) {
            inputProps.sports = [];
            this.props.sports.forEach(( sport )=>{
                inputProps.sports.push({
                    value: sport.name,
                    isCustom : sport.custom
                })
            });
        }
        if ( this.props.seasons.length > 0 ) {
            inputProps.seasons = [];
            this.props.seasons.forEach(( season )=>{
                inputProps.seasons.push({
                    value: season.name,
                    from: season.from,
                    to: season.to,
                    isCustom : season.custom})
            });
        }
        if ( this.state.sportCategories.length > 0 && this.props.sportCategory.length === 0) {
            inputProps.sportCategory = {
                value: this.state.sportCategories[0].name,
                isCustom: this.state.sportCategories[0].isCustom
            }
        }
        if ( this.state.tournaments.length > 0 && this.props.tournament.length === 0 ) {
            inputProps.tournament = {
                value: this.state.tournaments[0].name,
                isCustom: this.state.tournaments[0].isCustom
            }
        }
        if (  this.props.tournament.length > 0 ) {
            inputProps.tournament = {
                value: this.props.tournament[0].name,
                isCustom: this.props.tournament[0].isCustom
            }
        }
        if (  this.props.sportCategory.length > 0 ) {
            inputProps.sportCategory = {
                value: this.props.sportCategory[0].name,
                isCustom: this.props.sportCategory[0].isCustom
            }
        }


        return (
            <div className="step-content">
                <div className="step-title">{this.state.title}</div>

                {this.state.showSearch && <SearchCompetition close={()=>{this.toggleSearch(false)}} select={this.selectTournament} />}
                {!this.state.showSearch &&
                <div className="buttons">
                    <div className={"buttons-container"} style={{ justifyContent: 'flex-start'}}>
                        <button className="light-blue-button" onClick={this.clear}>
                            {this.context.t("CL_STEP1_BUTTON_START_OVER")}
                        </button>
                    </div>
                </div>}

                {!this.state.showSearch && <div className="step-content-container">

                    <div className="step-item-description" >
                        {this.context.t("CL_STEP1_DESCRIPTION_1")}
                    </div>

                    {
                        this.state.sportSelectors.map((item, i, list)=>{
                            return <SportSelector
                                key={i}
                                index={i}
                                sports={this.props.sports}
                                remove={() => this.removeSport(i) }
                                showAddNew={list.length > 1 && list.length === i + 1}
                                onUpdateNew={(name) => { this.props.updateFromMultiple("sports", i, "value", name) }}
                                showClose={ i > 0 }
                                isCustom={(inputProps.sports[i]) ? inputProps.sports[i].isCustom : false}
                                addSportSelector={this.addSportSelector}
                                onClick={() => { this.props.openSportSelector(i, this.props.sports) } }
                                value={( inputProps.sports[i]) ?inputProps.sports[i].value : ""}  />
                        })
                    }

                    {this.state.sportSelectors.length === 1 && <div className="step-item-description" style={{marginTop: "-15px"}}>
                        {this.context.t("CL_STEP1_DESCRIPTION_MULTIPLE_SPORTS")}
                        <button className={"link-button"} onClick={this.addSportSelector}>
                            {this.context.t("CL_STEP1_BUTTON_MULTIPLE_SPORTS")}
                        </button>
                    </div>}

                    {this.state.sportSelectors.length === 1 && !this.hasCustomCategory() &&
                    <div className="base-input">
                        <label>
                            {this.context.t("CL_STEP1_LABEL_COUNTRY")}
                        </label>
                        <input
                            type="text"
                            value={inputProps.sportCategory.value || ""}
                            readOnly={true}
                            disabled={this.props.sports.length === 0 || this.state.loadingCategories}
                            onClick={() => {
                                this.props.openCategorySelector(this.state.sportCategories)
                            }}
                            placeholder={this.context.t("CL_STEP1_PLACEHOLDER_COUNTRY")}  />
                        { this.state.loadingCategories && <i className="fa fa-cog fa-spin"/>}
                    </div>}
                    {this.state.sportSelectors.length === 1 && this.hasCustomCategory() && <NewCategory
                        showClose={!this.forceCustomCategory()}
                        value={this.props.customCategory}
                        onBlur={ (e) => this.updateContentValue(e, "customCategory")}
                        onClick={this.props.removeNewCategory}
                    />}
                    {this.state.sportSelectors.length === 1 && !this.hasCustomTournament() &&
                    <div className="base-input">
                        <label>
                            {this.context.t("CL_STEP1_LABEL_COMPETITION")}
                        </label>
                        <input type="text"
                               value ={inputProps.tournament.value || ""}
                               readOnly={true}
                               disabled={this.props.sports.length === 0 || this.state.loadingTournaments}
                               onClick={() => {
                                   this.props.openTournamentSelector( this.state.tournaments );
                               }}
                               placeholder={this.context.t("CL_STEP1_PLACEHOLDER_COMPETITION")}  />
                        { this.state.loadingTournaments && <i className="fa fa-cog fa-spin"/>}
                    </div>}

                    { this.state.sportSelectors.length === 1 && this.hasCustomTournament() &&
                    <NewTournament showClose={!this.forceCustomTournament()}
                                   value={this.props.customTournament}
                                   onBlur={ (e) => this.updateContentValue(e, "customTournament")}
                                   onClick={this.props.removeNewTournament} />
                    }

                    { this.showSeasonSelector() &&
                        this.state.seasonSelectors.map( (season, i) => {
                            return <SeasonSelector
                                key={i}
                                season={i}
                                index={i}
                                addSeason={this.addSeason}
                                removeSeason={()=>this.removeSeason(i)}
                                value={ (inputProps.seasons[i] ) ? inputProps.seasons[i].value : ""}
                                loading={this.state.loadingSeasons}
                                showClose={ i > 0 || ( !this.forceCustomSeason() && this.hasCustomSeason() ) }
                                onBlur={ (e) => this.updateContentValue(e, "customSeason")}
                                isCustom={(inputProps.seasons[i]) ? inputProps.seasons[i].isCustom || this.forceCustomSeason() : this.forceCustomSeason()}
                                showAddNew={this.state.seasonSelectors.length === i + 1}
                                openSelector={()=>this.props.openSeasonSelector(i, this.props.seasons)}/>
                        })
                    }

                    { ( this.state.loadingSeasons || this.state.loadingSchedule ) && <div><i className="fa fa-cog fa-spin"/></div>}

                    <Description value={this.props.description} onChange={ (e) => this.updateContentValue(e, "description")} />

                    <div className="step-item-description" style={{}}>
                        {this.context.t("CL_STEP1_LABEL_ADDITIONAL_INFO")}
                        <i className="fa fa-info-circle tooltip-icon" title={'The website link and the attached files will be made available to buyers in the listing details, when clicking on a listing in the marketplace.'}/>
                    </div>

                    <div className="base-input">
                        <label>
                            {this.context.t("CL_STEP1_LABEL_WEBSITE")}
                        </label>
                        <TagsInput
                            inputProps={{placeholder: websitePlaceholder}}
                            value={websites}
                            ref='tagsinput'
                            onChange={this.websitesUpdated}
                            inputValue={website}
                            onChangeInput={this.handleWebsiteChange}
                        />
                    </div>

                    <FileSelector
                        target={"attachments"}
                        selected={this.props.attachments}
                        onSelect={this.addFile}
                        onRemove={this.removeFile}
                        accept={["image/png", "image/jpg", ".pdf", ".doc", ".docx", ".cvs", ".ppt", ".xls", ".xlsx"] }
                        acceptType={[
                            "image/jpeg",
                            "image/png",
                            "application/pdf"
                        ]}
                        tmp={true}/>
                </div>}
            </div>
        );
    }
}

SellFormStep1.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        updateFromMultiple : (type, index, key, value) => dispatch({
            type: 'UPDATE_FROM_MULTIPLE',
            selectorType: type,
            index: index,
            key: key,
            value: value
        }),
        updateAttachments : (name, index, value) => dispatch({
            type: 'UPDATE_ATTACHMENTS',
            name: name,
            index: index,
            value: value
        }),
        openSportSelector : (index, selectedItems) => dispatch({
            type : 'OPEN_SELECTOR',
            selectorItems : ContentArena.Data.FullSports,
            popularItems : ContentArena.Data.TopSports,
            selectorType : "sports",
            activeFilter : "popular",
            clean: ["tournament", "seasons", "sportCategory"],
            selectedItems : selectedItems,
            showNewSport : true,
            index : index
        }),
        openCategorySelector : (selectedItems) => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Categories,
            selectorType: "sportCategory",
            activeFilter : "ag",
            showAllCountries : true,
            showNewCategory : true,
            selectedItems: selectedItems,
            index: 0,
            clean: ["tournament", "seasons", "customCategory", "customTournament"]
        }),
        openTournamentSelector : (selectedItems) => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Tournaments,
            selectorType: "tournament",
            activeFilter : "ag",
            index: 0,
            selectedItems: selectedItems,
            showNewTournament : true,
            clean: ["seasons"]
        }),
        openSeasonSelector : (index, selectedItems) => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Seasons,
            selectorType: "seasons",
            multiple: true,
            index: index,
            showNewSeason : true,
            clean : [],
            selectedItems : selectedItems
        }),
        removeFromMultiple : (index, selectorType) => dispatch({
            type: 'REMOVE_FROM_MULTIPLE',
            selectorType: selectorType,
            index: index
        }),
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        }),
        removeNewSport : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "sports",
        }),
        removeNewTournament : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "tournament",
        }),
        removeNewCategory : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "sportCategory",
        }),
        removeNewSeason : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "seasons",
        }),
        addNewSeason : (index) => dispatch({
            type: 'ADD_NEW',
            index : index,
            selectorType: "seasons",
            clean : []
        }),
        addNewCategory : () => dispatch({
            type : 'ADD_NEW',
            index : 0,
            selectorType: "sportCategory",
            clean : ["tournament", "seasons"]
        }),
        addNewTournament : () => dispatch({
            type : 'ADD_NEW',
            index : 0,
            selectorType: "tournament",
            clean : ["seasons"]
        }),
        reset : () => dispatch({
            type : 'RESET'
        }),
        selectTournament : (tournament) => dispatch({ type: 'SELECT_TOURNAMENT', tournament: tournament }),
        stepChangeReset : () => dispatch(stepChangeReset())

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep1)