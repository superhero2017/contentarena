import React from 'react';
import { connect } from "react-redux";
import ContentListing from '../../main/components/ContentListing';
import {goTo} from "../../main/actions/utils";
import {PropTypes} from "prop-types";
import RightsLegend from "../../main/components/RightsLegend";
import Loader from "../../common/components/Loader";


class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            listings : [],
        };
    }

    componentDidMount () {
        let _this = this;
        this.setState({loading:true});
        ContentArena.ContentApi.getWatchlistListings().done((listings) => {
            if (!Array.isArray(listings)) {
                listings = Object.values(listings)
            }

            listings = listings.map( listing => ContentArena.Utils.contentParserFromServer(listing) );
            _this.setState({listings: listings, loading : false});
        });

    }

    selectListing = (id) => {
        goTo("listing/" + id);
    };

    remove = ( customId) => {
        this.setState({
            listings : this.state.listings.filter(l => l.customId !== customId)
        });
    };

    render () {
        const { loading, listings } = this.state;

        document.title = "Content Arena - Watchlist";

        return (
            <div className="watch-list-container">
                <div style={{textAlign: 'right'}}>
                    <RightsLegend />
                </div>
                <Loader loading={loading}>
                    {listings.length === 0 && (
                        <div className="manager-content-message">
                            {this.context.t("WATCHLIST_EMPTY_MESSAGE")}
                        </div>
                    )}
                    {listings.length > 0 && listings.map((listing) => {
                        return <ContentListing
                            onSelect={this.selectListing}
                            key={listing.customId}
                            {...listing}
                            checkExpired={true}
                            watchlistRemove={true}
                            onWatchlistRemove={this.remove}
                        />
                    })}
                </Loader>
            </div>
        )
    }
}

Watchlist.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Watchlist)