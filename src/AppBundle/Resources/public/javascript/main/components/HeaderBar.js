import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { goTo } from "../actions/utils";
import HeaderNotifications from "./HeaderNotifications";
import InviteUsersModal from "../../common/modals/InviteUsersModal";
import { inviteIcon } from "./Icons";
import { ROUTE_PATHS } from "@constants";

const HeaderBarTab = ({
	match, children, route, className = "", linkClass = "", onClick,
}) => (
	<div className={(match) ? "tab active-tab" : `tab ${className}`} onClick={onClick}>
		<Link to={route} className={linkClass}>{children}</Link>
	</div>
);

const CustomLink = ({ match, children, route }) => (
	<div className={(match) ? "tab active-tab" : "tab"}>
		<a href={route}>{children}</a>
	</div>
);

const HeaderBarSeller = ({ match }, context) => (
	<React.Fragment>
		<HeaderBarTab
			match={match.url === ROUTE_PATHS.MANAGE_LISTINGS}
			route={ROUTE_PATHS.MANAGE_LISTINGS}
		>
			{context.t("HEADER_LINK_MANAGE_LISTINGS")}
		</HeaderBarTab>
		<HeaderBarTab
			match={
				match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_WITH_ACTIVITY
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_OPEN_BIDS
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_CLOSED_DEALS
			}
			route={ROUTE_PATHS.COMMERCIAL_OVERVIEW}
		>
			{context.t("HEADER_LINK_COMMERCIAL_ACTIVITY")}
		</HeaderBarTab>
		<CustomLink
			match={match.path === "/contentlisting/:customId?/:step?"}
			route="/contentlisting/new"
		>
			{context.t("HEADER_LINK_CREATE_LISTING")}
		</CustomLink>
	</React.Fragment>
);

HeaderBarSeller.contextTypes = {
	t: PropTypes.func.isRequired,
};

const HeaderBarSellerCms = ({ match }, context) => (
	<React.Fragment>
		<HeaderBarTab
			match={match.url === ROUTE_PATHS.PROPERTIES}
			route={ROUTE_PATHS.PROPERTIES}
		>
			{context.t("HEADER_LINK_MANAGE_PROPERTIES")}
		</HeaderBarTab>

		<HeaderBarTab
			match={
				match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_WITH_ACTIVITY
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_OPEN_BIDS
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_CLOSED_DEALS
			}
			route={ROUTE_PATHS.COMMERCIAL_OVERVIEW}
		>
			{context.t("HEADER_LINK_COMMERCIAL_ACTIVITY")}
		</HeaderBarTab>

	</React.Fragment>
);

HeaderBarSellerCms.contextTypes = {
	t: PropTypes.func.isRequired,
};


class HeaderBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inviteModalOpen: false,
			dataLoading: true,
			notifications: [],
			unseenNotificationsCount: 0,
			unseenMessagesCount: 0,
			isDownArrowShown: true,
		};
	}

	componentDidMount() {
		this.loadNotifications();
	}

	loadNotifications() {
		ContentArena.Api.getNotifications().then(({ data }) => {
			if (!data) {
				return;
			}

			data.sort((a, b) => b.id - a.id);
			const notifications = data.filter(item => item.type.name !== "MESSAGE");
			const unseenNotificationsCount = notifications.filter(item => !item.seen).length;
			const unseenMessagesCount = data.filter(item => item.type.name === "MESSAGE").length;

			this.setState({
				dataLoading: false,
				unseenNotificationsCount,
				unseenMessagesCount,
				notifications,
			});
		});
	}

	isMarketplaceMatch = url => url === "/marketplace" || url === "/marketplace/filter/multi";

	setDownArrow = isDownSet => this.setState({ isDownArrowShown: isDownSet });

	render() {
		const {
			tab, profile, match, common,
		} = this.props;
		const {
			inviteModalOpen, dataLoading, notifications, unseenNotificationsCount, unseenMessagesCount, isDownArrowShown,
		} = this.state;
		const logoUrl = this.getLogoUrl(tab);
		const { testStageMode, cmsEnabled } = common;

		return (
			<React.Fragment>
				{testStageMode && (
					<div className="manager-header-test-mode">
						{this.context.t("HEADER_TEST_STAGE_MODE")}
					</div>
				)}
				<div className="manager-header">
					<div className="header-wrapper">
						<div className="logo" onClick={() => goTo(logoUrl)}>
							<img src={`${assetsBaseDir}app/images/logo.svg`} alt="" />
						</div>

						{profile === "BUYER" && (
							<HeaderBarTab
								match={this.isMarketplaceMatch(match.url)}
								route="/marketplace"
							>
								{this.context.t("HEADER_LINK_MARKETPLACE")}
							</HeaderBarTab>
						)}

						{profile === "BUYER" && (
							<HeaderBarTab match={match.url === "/watchlist"} route="/watchlist">
								{this.context.t("HEADER_LINK_WATCHLIST")}
							</HeaderBarTab>
						)}

						{profile === "BUYER" && (
							<HeaderBarTab
								match={
									match.url === "/bids/activebids"
									|| match.url === "/bids/declinedbids"
								}
								route="/bids/activebids"
							>
								{this.context.t("HEADER_LINK_BIDS")}
							</HeaderBarTab>
						)}

						{profile === "BUYER" && (
							<HeaderBarTab
								match={match.url === "/closeddeals"}
								route="/closeddeals"
							>
								{this.context.t("HEADER_LINK_CLOSED_DEALS")}
							</HeaderBarTab>
						)}

						{profile === "SELLER" && !cmsEnabled && <HeaderBarSeller {...this.props} />}

						{profile === "SELLER" && cmsEnabled && <HeaderBarSellerCms {...this.props} />}

						<div className="spacer" />

						<div className="tab">
							<a onClick={(e) => {
								this.setState({ inviteModalOpen: true });
								e.preventDefault();
							}}
							>
								<img src={inviteIcon} alt="Invite users" style={{ height: 24, marginRight: 5 }} />
								{this.context.t("HEADER_INVITE_USERS")}
							</a>
						</div>

						{profile === "BUYER" && (
							<HeaderBarTab
								className="tab baseline switch-mode"
								linkClass="ca-btn primary"
								route={cmsEnabled ? ROUTE_PATHS.PROPERTIES : ROUTE_PATHS.MANAGE_LISTINGS}
							>
								{this.context.t("HEADER_LINK_SELLING_MODE")}
							</HeaderBarTab>
						)}

						{profile === "SELLER" && (
							<HeaderBarTab
								className="tab baseline switch-mode"
								linkClass="ca-btn primary"
								route="/marketplace"
							>
								{this.context.t("HEADER_LINK_BUYING_MODE")}
							</HeaderBarTab>
						)}

						<HeaderNotifications
							dataLoading={dataLoading}
							notifications={notifications}
							unseenNotificationsCount={unseenNotificationsCount}
						/>

						<HeaderBarTab className="tab baseline messages" route="/messages" onClick={this.markMessagesAsSeen}>
							<i className="fa fa-envelope" />
							{!!unseenMessagesCount
								&& <div className="counter">{unseenMessagesCount}</div>
							}
						</HeaderBarTab>

						<div
							className="settings"
							 onMouseEnter={() => this.setDownArrow(false)}
							 onMouseLeave={() => this.setDownArrow(true)}
						>

							{this.context.t("HEADER_LINK_MY_CONTENT_ARENA")}
							<i className={`fa ${isDownArrowShown ? "fa-angle-down" : "fa-angle-up"}`} />

							<div className="popup">
								<div className="wrap">
									<HeaderBarTab
										route="/terms"
										className="popup-item"
									>
										<i className="fa fa-file-pdf-o" />
										{this.context.t("HEADER_LINK_TERMS")}
									</HeaderBarTab>
									<HeaderBarTab
										route="/preferences"
										className="popup-item"
									>
										<i className="fa fa-sliders" />
										{this.context.t("HEADER_LINK_PREFERENCES")}
									</HeaderBarTab>
									<HeaderBarTab
										route="/settings"
										className="popup-item"
									>
										<i className="fa fa-cog" />
										{this.context.t("HEADER_LINK_SETTINGS")}
									</HeaderBarTab>
									<a href="https://landing.contentarena.com/web/faq/" className="tab popup-item">
										<i className="fa fa-question-circle-o" />
										{this.context.t("HEADER_LINK_FAQ")}
									</a>
									<a href="/logout" className="tab popup-item">
										<i className="fa fa-sign-out" />
										{this.context.t("HEADER_LINK_LOGOUT")}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<InviteUsersModal
					common={common}
					isOpen={inviteModalOpen}
					onCloseModal={() => {
						this.setState({ inviteModalOpen: false });
					}}
				/>
			</React.Fragment>
		);
	}

	getLogoUrl = () => {
		const { profile } = this.props;

		if (profile === "SELLER") {
			return "marketplace";
		}
		return "marketplace";
	};

	markMessagesAsSeen = () => {
		const { unseenMessagesCount } = this.state;

		this.setState({
			unseenMessagesCount: 0,
		});

		if (unseenMessagesCount) {
			ContentArena.Api.markMessagesAsSeen();
		}
	};
}

HeaderBar.contextTypes = {
	t: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
	common: state.common,
});

export default connect(
	mapStateToProps,
	null,
)(HeaderBar);
