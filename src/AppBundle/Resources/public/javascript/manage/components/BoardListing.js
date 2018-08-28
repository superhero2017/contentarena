import React, { Component } from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import {goTo, limitText} from "../../main/actions/utils";
import {
    blueCheckIcon, clockRoundIcon, exclamationRoundIcon, expiredIcon, playIcon, soldIcon,
    yellowCheckIcon
} from "../../main/components/Icons";
import {SuperRightBoardLabels} from "../../sell/components/SuperRightDefinitions";
import {PropTypes} from "prop-types";

class BoardListing extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showOptions: false,
            showRemoveConfirm : false,
            showArchiveConfirm : false,
            showDeactivateConfirm : false
        };
        this.clockIcon = assetsBaseDir + "app/images/clock.png";
        this.exclamationIcon = assetsBaseDir + "app/images/exclamation_round.png";
        this.playIcon = assetsBaseDir + "app/images/play.png";
        this.bucketIcon = assetsBaseDir + "app/images/bucket_blue.png";
        this.editIcon = assetsBaseDir + "app/images/edit.png";
        this.duplicateIcon = assetsBaseDir + "app/images/duplicate.png";
        this.viewIcon = assetsBaseDir + "app/images/search.png";
        this.submitIcon = assetsBaseDir + "app/images/submit.png";
        this.dotsIcon = assetsBaseDir + "app/images/dots.png";
        this.deactivateIcon = assetsBaseDir + "app/images/close_red.png";
    }

    onSelect = () => {
      const {onSelect, customId} = this.props;

      if ( onSelect ) onSelect(customId);


    };

    toggleOptions = (e) => {
        this.setState({showOptions: !this.state.showOptions});
        e.stopPropagation();
    };

    edit = () => {
        const { customId, step } = this.props;
        const stepToShow = step + 1;
        goTo(`contentlisting/${customId}/${step > 4 ? 'sign' : stepToShow}`);
    };

    submit = () => {
        const { customId } = this.props;
        goTo("contentlisting/" + customId + "/sign")
    };

    view = () => {
        const { customId } = this.props;
        goTo("listing/" + customId, true);
    };

    hideOptions = (e) => {
        const {defaultAction} = this.props;
        const {showOptions} = this.state;
        this.setState({showOptions: false});
        if ( defaultAction && !showOptions ){
            if ( defaultAction === "EDIT"){
                this.edit()
            }

            if ( defaultAction === "VIEW"){
                this.view()
            }

            if ( defaultAction === "SUBMIT"){
                this.submit()
            }
        }

        e.stopPropagation();
    };

    render(){
        const {
            PROGRAM_NAME,
            name,
            customId,
            expiresAt,
            salesPackages,
            rightsPackage,
            tournament,
            seasons,
            className,
            showEdit,
            showRemove,
            showArchive,
            showSubmit,
            showDuplicate,
            showDeactivate,
            showView,
            onRemove,
            onArchive,
            onDuplicate,
            onDeactivate,
            lastAction,
            lastActionDate,
            lastActionUser,
            owner,
            status,
            hasActivity,
            hasPendingBids,
            onSubmit,
            style
        } = this.props;

        const {showOptions, showRemoveConfirm, showDeactivateConfirm, showArchiveConfirm, showStatusInfo} = this.state;

        return (
            <div className={className} style={style} onClick={this.hideOptions}>
                {showOptions && <div className="options-tooltip">
                    {showSubmit && <div className={"option"} onClick={this.submit}>
                        <img src={this.submitIcon} /> {this.context.t("Submit")}
                    </div>}
                    {showEdit && <div className={"option"} onClick={this.edit}>
                        <img src={this.editIcon} /> {this.context.t("Edit")}
                    </div>}
                    {showDuplicate && <div className={"option"} onClick={()=>{
                        this.setState({showOptions: false});
                        onDuplicate(customId);
                    }}>
                        <img src={this.duplicateIcon} />
                        {this.context.t("Duplicate")}
                    </div>}
                    {showView && <div className={"option"} onClick={this.view}>
                        <img src={this.viewIcon} />
                        {this.context.t("View")}
                    </div>}
                    {showRemove && <div className={"option"} onClick={()=>{
                        this.setState({showRemoveConfirm: true});
                    }}>
                        <img src={this.bucketIcon} />
                        {this.context.t("Remove")}
                    </div>}
                    {showArchive && <div className={"option"} onClick={()=>{
                        this.setState({showArchiveConfirm: true});
                    }}>
                        <img src={this.bucketIcon} />
                        {this.context.t("Archive")}
                    </div>}
                    {showDeactivate && <div className={"option"} onClick={()=>{
                        this.setState({showDeactivateConfirm: true});
                    }}>
                        <img src={this.deactivateIcon} style={{width: 16}} />
                        {this.context.t("Deactivate")}
                    </div>}

                    {lastAction && <div className="last-action">
                        {this.context.t("Last action: ")}{lastAction.description} {lastActionUser && "by " + lastActionUser.firstName + " " + lastActionUser.lastName } {lastActionDate && "on " + Moment(lastActionDate).format('HH:mm DD/MM/YYYY')}
                    </div>}

                    {owner && <div className="last-action">
                        {this.context.t("Listing Owner: ")}{owner.firstName + " " + owner.lastName }
                    </div>}
                </div>}

                {/*CONFIRM DEACTIVATE*/}
                {showDeactivateConfirm && <div className="confirmation-tooltip">
                    <div className={"confirmation-text"}>
                        {this.context.t("Are you sure you want to deactivate the listing?")}
                    </div>
                    <button className={"button button-confirm"} onClick={(e)=>{
                        this.setState({showDeactivateConfirm: false});
                        onDeactivate();
                        e.stopPropagation();
                    }}>
                        {this.context.t("Deactivate")}
                    </button>
                    <button className={"button"} onClick={(e)=>{
                        this.setState({showDeactivateConfirm: false});
                        e.stopPropagation();
                    }}>
                        {this.context.t("Cancel")}
                    </button>
                </div>}

                {/*CONFIRM REMOVE*/}
                {showRemoveConfirm && <div className="confirmation-tooltip">
                    <div className={"confirmation-text"}>
                        {this.context.t("Remove-listing-confirmation")}?
                    </div>
                    <button className={"button button-confirm"} onClick={(e)=>{
                        this.setState({showRemoveConfirm: false});
                        onRemove();
                        e.stopPropagation();
                    }}>
                        {this.context.t("Remove")}
                    </button>
                    <button className={"button"} onClick={(e)=>{
                        this.setState({showRemoveConfirm: false});
                        e.stopPropagation();
                    }}>
                        {this.context.t("Cancel")}
                    </button>
                </div>}

                {/*CONFIRM ARCHIVE*/}
                {showArchiveConfirm && <div className="confirmation-tooltip">
                    <div className={"confirmation-text"}>
                        {this.context.t("Are you sure you want to archive this listing?")}?
                    </div>
                    <button className={"button button-confirm"} onClick={(e)=>{
                        this.setState({showArchiveConfirm: false});
                        onArchive();
                        e.stopPropagation();
                    }}>
                        {this.context.t("Archive")}
                    </button>
                    <button className={"button"} onClick={(e)=>{
                        this.setState({showArchiveConfirm: false});
                        e.stopPropagation();
                    }}>
                        {this.context.t("Cancel")}
                    </button>
                </div>}

                {/*STATUS INFO*/}
                {showStatusInfo && <div className="status-tooltip">
                    <div className={"option"}>
                        {status.name === 'PENDING' && "Listing under review. Not visible in the marketplace yet."}
                        {status.name === 'INACTIVE' && "Listing is deactivated."}
                        {status.name === 'REJECTED' && "Listing rejected. Please edit or contact support."}
                        {status.name === 'EXPIRED' && "This listing has expired."}
                        {status.name === 'SOLD_OUT' && "All sales bundle of this listing were sold."}
                        {hasPendingBids && "There are open bids on this listing. You can view the bid via the Commercial Activity tab. Until the bid is processed, the edit, decline and remove functionality will be unavailable"}
                    </div>
                </div>}

                { ((status.name !== 'DRAFT' && status.name !== 'EDITED' ) || hasPendingBids) &&
                <div
                    className={"status-icon"}
                    onMouseOver={() => {this.setState({showStatusInfo : true})}}
                    onMouseLeave={() => {this.setState({showStatusInfo : false})}}>
                    {status.name === 'PENDING' && <img src={clockRoundIcon} />}
                    {status.name === 'INACTIVE' &&<img src={playIcon} />}
                    {status.name === 'REJECTED' && <img src={exclamationRoundIcon} />}
                    {status.name === 'EXPIRED' && <img src={expiredIcon} />}
                    {status.name === 'SOLD_OUT' && <img src={soldIcon} />}
                    {hasPendingBids &&  <img src={exclamationRoundIcon} />}
                        </div>}

                <div  className="menu-icon" onClick={this.toggleOptions}>
                    <img src={this.dotsIcon} />
                </div>
                <div className={"name"}>
                    { name }
                </div>
                <div className={"tournament"}>
                    {tournament && tournament.length === 1 && <div className="item">{tournament[0].name}</div>}
                    {tournament && tournament.length === 0 && <div className="item">
                        {this.context.t("General content")}
                    </div>}
                    {seasons && seasons.length > 1 && <div className="item">
                        {this.context.t("Season: Multiple seasons")}
                    </div>}
                    {seasons && seasons.length === 1 && <div className="item">
                        {this.context.t("Season: ")}{seasons[0].year}
                        </div>}
                </div>
                <div className={"rights"}>
                    {rightsPackage && rightsPackage.map((rp,i,l) => {
                        return <span key={"rp-"+i}>
                            {!rp.exclusive &&
                            <img src={blueCheckIcon}/>}

                            {rp.exclusive &&
                            <img src={yellowCheckIcon}/>}

                            {SuperRightBoardLabels[rp.shortLabel]}
                            { rp.shortLabel === "PR" && PROGRAM_NAME &&
                            this.context.t("Program: ") + PROGRAM_NAME
                            }
                        </span>
                    })}
                </div>

                <div className={"expiry"}>
                    <div>{ salesPackages.length } sales bundle{ salesPackages.length > 1 && "s"}</div>
                    <div>{this.context.t("Expiry:")} {expiresAt ? Moment(expiresAt).format('DD/MM/YYYY') : 'Not set'}</div>
                </div>

            </div>
        )
    }
}
BoardListing.contextTypes = {
    t: PropTypes.func.isRequired
};
export default BoardListing;
