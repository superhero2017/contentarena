import React from 'react';
import {goTo} from "../actions/utils";
import {Link} from "react-router-dom";
import {PropTypes} from 'prop-types';
import HeaderNotifications from './HeaderNotifications';
import {
    addRight, clearFilter, removeRight, updateAllFilters, updateCountries, updateExclusive,
    updateIncludedCountries
} from "../../buy/actions/filterActions";
import {connect} from "react-redux";
import InviteUsersModal from "../../common/modals/InviteUsersModal";
import {inviteIcon} from '../../main/components/Icons';

const HeaderBarTab = ({match, children, route, className = '', linkClass = ''}) => {
    return (
        <div className={(match) ? "tab active-tab" : `tab ${className}`}>
            <Link to={route} className={linkClass} >{children}</Link>
        </div>
    )
};

const CustomLink = ({match, children, route}) => {
    return (
        <div className={(match) ? "tab active-tab" : "tab"}>
            <a href={route}>{children}</a>
        </div>
    )
};

class HeaderBar extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            inviteModalOpen: false
        }
    }

    isMarketplaceMatch = (url) => {
        return url === "/marketplace" || url === "/marketplace/filter/multi"
    };

    render(){
        const { tab, profile, match, common } = this.props;
        const { inviteModalOpen } = this.state;
        const logoUrl = this.getLogoUrl(tab);

        return(
            <React.Fragment>
                {common.testStageMode && <div className="manager-header-test-mode">
                    {this.context.t("HEADER_TEST_STAGE_MODE")}
                </div>}
                <div className="manager-header">
                    <div className="logo" onClick={()=>goTo(logoUrl)}>
                        <img src={assetsBaseDir + "app/images/logo.svg"} alt=""/>
                    </div>

                    {profile === "BUYER" && (
                        <HeaderBarTab match={this.isMarketplaceMatch(match.url)} route={"/marketplace"}
                        >
                            {this.context.t("HEADER_LINK_MARKETPLACE")}
                        </HeaderBarTab>
                    )}

                    {profile === "BUYER" && (
                        <HeaderBarTab match={match.url === "/watchlist"} route={"/watchlist"}>
                            {this.context.t("HEADER_LINK_WATCHLIST")}
                        </HeaderBarTab>
                    )}

                    {profile === "BUYER" && (
                        <HeaderBarTab
                            match={
                                match.url === "/bids/activebids" ||
                                match.url === "/bids/declinedbids"
                            }
                            route={"/bids/activebids"}
                        >
                            {this.context.t("HEADER_LINK_BIDS")}
                        </HeaderBarTab>
                    )}

                    {profile === "BUYER" && (
                        <HeaderBarTab
                            match={match.url === "/closeddeals"}
                            route={"/closeddeals"}
                        >
                            {this.context.t("HEADER_LINK_CLOSED_DEALS")}
                        </HeaderBarTab>
                    )}

                    {profile === "SELLER" && (
                        <HeaderBarTab
                            match={match.url === "/managelistings"}
                            route={"/managelistings"}
                        >
                            {this.context.t("HEADER_LINK_MANAGE_LISTINGS")}
                        </HeaderBarTab>
                    )}

                    {profile === "SELLER" && (
                        <HeaderBarTab
                            match={
                                match.url === "/commercialoverview" ||
                                match.url === "/commercialoverview/filter/withactivity" ||
                                match.url === "/commercialoverview/filter/openbids" ||
                                match.url === "/commercialoverview/filter/closeddeals"
                            }
                            route={"/commercialoverview"}
                        >
                            {this.context.t("HEADER_LINK_COMMERCIAL_ACTIVITY")}
                        </HeaderBarTab>
                    )}

                    {profile === "SELLER" && (
                        <CustomLink
                            match={match.path === "/contentlisting/:customId?/:step?"}
                            route={"/contentlisting/new"}
                        >
                            {this.context.t("HEADER_LINK_CREATE_LISTING")}
                        </CustomLink>
                    )}

                    <div className="spacer" />

                    <div className="tab">
                        <a onClick={e =>{ this.setState({inviteModalOpen:true}); e.preventDefault(); }}>
                            <img src={inviteIcon} alt="Invite users" style={{ height: 24, marginRight: 5 }}/>
                            {this.context.t("HEADER_INVITE_USERS")}
                        </a>
                    </div>

                    {profile === "BUYER" && (
                        <HeaderBarTab className="tab baseline switch-mode" linkClass="ca-btn primary" route="/managelistings">
                            {this.context.t("HEADER_LINK_SELLING_MODE")}
                        </HeaderBarTab>
                    )}

                    {profile === "SELLER" && (
                        <HeaderBarTab className="tab baseline switch-mode" linkClass="ca-btn primary" route="/marketplace">
                            {this.context.t("HEADER_LINK_BUYING_MODE")}
                        </HeaderBarTab>
                    )}

                    <HeaderNotifications />

                    <HeaderBarTab className="tab baseline messages" route="/messages">
                        <i className="fa fa-envelope" />
                        {this.context.t("HEADER_LINK_MESSAGES")}
                    </HeaderBarTab>

                    <div className="settings">
                        <i className="fa fa-gear" />

                        <div className="popup">
                            <div className="wrap">
                                <HeaderBarTab
                                    route="/terms"
                                    className="tab" >
                                    {this.context.t("HEADER_LINK_TERMS")}
                                </HeaderBarTab>
                                <HeaderBarTab
                                    route="/preferences"
                                    className="tab" >
                                    {this.context.t("HEADER_LINK_PREFERENCES")}
                                </HeaderBarTab>
                                <HeaderBarTab
                                    route="/settings"
                                    className="tab" >
                                    {this.context.t("HEADER_LINK_SETTINGS")}
                                </HeaderBarTab>
                                <a href="/logout" className="tab">
                                    {this.context.t("HEADER_LINK_LOGOUT")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <InviteUsersModal common={common} isOpen={inviteModalOpen} onCloseModal={()=>{this.setState({inviteModalOpen:false})}} />
            </React.Fragment>
        )
    }

    getLogoUrl = () => {
        const { profile } = this.props;

        if (profile === "SELLER") {
            return "marketplace";
        } else {
            return "marketplace";
        }
    }
}

HeaderBar.contextTypes = {
    t: PropTypes.func.isRequired
};


const mapStateToProps = state => {
    return {
        common : state.common
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderBar)
