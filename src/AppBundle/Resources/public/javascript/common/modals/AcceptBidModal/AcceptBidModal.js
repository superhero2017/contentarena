import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { GenericModalStyle} from "./../../../main/styles/custom";
import GeneralTerms from "./../../../main/components/GeneralTerms";
import DigitalSignature from "./../../../main/components/DigitalSignature";

class AcceptBidModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signature: '',
            isFail: false,
            isLoading: false,
            terms: false
        };
    }

    handleTermsAndConditions = (event) => { this.setState({terms: event.target.checked}) };
    handleAcceptBid = () => {
        this.setState({isLoading: true});

        const {signature} = this.state;
        const {contentId, selectedBid, postAction, listingCustomId, onCloseModal} = this.props;
        let payload = selectedBid;
        payload.content = contentId;

        ContentArena.ContentApi.acceptBid(payload, signature)
            .then(
                () => {
                    onCloseModal();
                    postAction(listingCustomId);
                },
                () => this.setState({isFail: true, isLoading: false})
            );
    };

    render() {
        const { isOpen, onCloseModal, selectedBid } = this.props;
        const { isFail, isLoading, signature, terms } = this.state;

        return <Modal isOpen={isOpen} className="modal-wrapper wide" style={GenericModalStyle}>
            <header className="modal-header">
                <h3 className="modal-title">{this.context.t("COMMERCIAL_ACTIVITY_BID_TITLE_ACCEPT")}</h3>
                <i className="fa fa-times" onClick={onCloseModal} />
            </header>
            <section className="modal-body">
                {!isLoading && !isFail && <div>
                    <DigitalSignature
                        customClass='for-modal'
                        licenseBidId={selectedBid.customId}
                        title={this.context.t("ACCEPT_BID_PLEASE_SIGN_WITH_YOUR_CURSOR")}
                        clearBtnText={this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_CANCEL")}
                        signature={signature}
                        onReady={signature => { this.setState({signature}) }} />
                    <GeneralTerms
                        defaultChecked={terms}
                        value={terms}
                        onChange={e => this.handleTermsAndConditions(e) }/>
                </div>
                }
                {isLoading && <i className="fa fa-cog fa-spin" />}
                {isFail && <div className="body-msg">
                    {this.context.t("COMMERCIAL_ACTIVITY_ACCEPT_BID_FAILED")}</div>
                }
            </section>
            <footer className="modal-footer">
                {isFail || isLoading
                    ? (<button className="cancel-btn" onClick={onCloseModal}>
                        {this.context.t("MESSAGE_POPUP_BUTTON_CANCEL")}
                        </button>)
                    : (<React.Fragment>
                        <button className="cancel-btn" onClick={onCloseModal}>
                            {this.context.t("MESSAGE_POPUP_BUTTON_CANCEL")}
                        </button>
                        <button className="standard-button" onClick={this.handleAcceptBid} disabled={!signature || !terms}>
                            {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_ACCEPT")}</button>
                        </React.Fragment>)
                }
            </footer>
        </Modal>
    };
};

AcceptBidModal.propTypes = {
    selectedBid: PropTypes.object.isRequired,
    postAction: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired
};

AcceptBidModal.contextTypes = {
    t: PropTypes.func.isRequired
};

export default AcceptBidModal;