import React from "react";
import { connect } from "react-redux";
import Moment from "moment/moment";
import { PropTypes } from "prop-types";
import cn from "classnames";
import { getFullName, goToListing, limitText } from "../../main/actions/utils";
import { DATE_TIME_FORMAT } from "@constants";
import ChatMessage from "../../main/components/ChatMessage";
import AttachmentUploader from "../../main/components/AttachmentUploader";
import { attachmentClipIcon } from "../../main/components/Icons";
import Loader from "../../common/components/Loader";

class Messages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			threads: [],
			loadingThreads: false,
			loadingMessages: false,
			attachmentReady: false,
			selectedThread: null,
			inputMessage: null,
			messages: [],
		};
		this.attachmentUploader = React.createRef();
	}

	componentDidMount() {
		this.setState({
			loadingThreads: true,
		});


		ContentArena.ContentApi.getThreads().done((threads) => {
			let selectedThread;
			const
				{ customId } = this.props.match.params;

			threads = threads.filter(t => t.lastMessageContent !== undefined || (customId && t.customId === customId));

			if (customId) {
				selectedThread = threads.filter(t => t.customId === this.props.match.params.customId)[0];
			} else if (threads.length > 0) {
				selectedThread = threads[0];
			}

			this.setState({
				threads,
				selectedThread,
				loadingThreads: false,
			});
			this.updateMessages();
		});
	}

	selectThread = (selectedThread) => {
		const { history } = this.props;

		history.push(`/messages/${selectedThread.customId}`);
	};

	updateMessages = (thread) => {
		const selectedThread = thread || this.state.selectedThread;

		if (!selectedThread) return;

		this.setState({
			loadingMessages: true,
			messages: [],
		});

		ContentArena.ContentApi.getThread(selectedThread.customId).done((r) => {
			this.setState({
				loadingMessages: false,
				messages: r,
			});
		});
	};

	prepareMessageObject = () => {
		const {
			selectedThread,
			inputMessage,
			attachmentMessage,
			attachmentReady,
		} = this.state;

		const base = {
			thread: selectedThread.id,
			listing: selectedThread.listing.id,
			content: inputMessage || "",
		};

		return attachmentReady ? { ...base, ...attachmentMessage } : base;
	};

	send = () => {
		const { messages } = this.state;

		const message = this.prepareMessageObject();
		this.setState({ inputMessage: "", saving: true });

		ContentArena.ContentApi.sendMessage(message).done((r) => {
			this.setState({
				saving: false,
				attachmentMessage: null,
				attachmentReady: false,
				showSuccess: true,
				messages: [...messages, r],
			});
			this.closeAttachmentUploader();
		});
	};

	cancelAttachment = () => this.setState({
		attachmentReady: false,
		attachmentMessage: null,
	});

	prepareAttachment = (filePath, fileName, fileSize, fileExtension) => {
		const {
			selectedThread,
		} = this.state;

		if (!this.attachmentUploader.current.state.show) return;

		this.setState({
			attachmentReady: true,
			attachmentMessage: {
				attachment: true,
				fileName,
				fileSize,
				fileExtension,
				filePath,
				thread: selectedThread.id,
				listing: selectedThread.listing.id,
			},
		});
	};

	render() {
		const {
			loadingThreads,
			threads,
		} = this.state;

		return (
			<div className="messages-container">
				{!loadingThreads && threads.length === 0 ? this.renderNoMessages() : this.renderMessages()}
			</div>
		);
	}

	openAttachmentUploader = () => {
		this.attachmentUploader.current.openFileSelector();
	};

	closeAttachmentUploader = () => {
		this.attachmentUploader.current.close();
	};

	renderNoMessages() {
		return (
			<div className="no-messages">{this.context.t("MESSAGES_NO_MESSAGES_YET")}</div>
		);
	}

	renderMessages() {
		const {
			loadingThreads,
			loadingMessages,
			selectedThread,
			attachmentReady,
			threads,
			inputMessage,
			messages,
			saving,
		} = this.state;

		const { user } = this.props;

		return (
			<React.Fragment>
				<div className="threads">
					<div className="thread-wrapper ca-overflow">
						<Loader loading={loadingThreads}>
							{threads.length === 0 && (
								<div>{this.context.t("MESSAGES_NO_THREADS_YET")}</div>
							)}
							{threads.length > 0 && threads.map((t, i) => (
								<div
									className={cn("thread", {
										"thread-selected": selectedThread && selectedThread.id === t.id,
										"has-unread-messages": t.unreadMessagesForCurrentUser,
									})}
									key={`thread-${i}`}
									onClick={() => {
										this.selectThread(t);
									}}
								>
									<div className="date">
										{Moment(t.lastMessageDate).format(`${DATE_TIME_FORMAT}`)}
									</div>
									<div className="listing-name">
										{t.listing.name}
									</div>
									<div className="company">
										{t.oppositeParty.legalName}
									</div>
									<div className="user">
										{t.lastMessageUser ? getFullName(t.lastMessageUser) : ""}
									</div>
									<div className="last-message">
										{t.lastMessageContent && limitText(t.lastMessageContent)}
									</div>
								</div>
							))}
						</Loader>
					</div>
				</div>

				{selectedThread && (
					<div className="thread-content">
						<div className="thread-title">
							<div
								className="listing-name ca-title"
								onClick={() => {
									goToListing(selectedThread.listing.customId, true);
								}}
							>
								{selectedThread.listing.name}
							</div>
							<div className="company-name">
								<i className="fa fa-user-o icon" />
								{selectedThread.oppositeParty.legalName}
							</div>
						</div>
						<div className="messages ca-overflow">
							<Loader loading={loadingMessages && messages.length === 0}>
								{!loadingMessages && messages.map((m, i) => {
									const ownCompanyMessage = user.company.id === m.sender.company.id;
									const ownMessage = user.id === m.sender.id;
									return (
										<ChatMessage
											key={i}
											ownMessage={ownMessage}
											ownCompanyMessage={ownCompanyMessage}
											message={m}
										/>
									);
								}).reverse()}
							</Loader>
						</div>
						<AttachmentUploader
							ref={this.attachmentUploader}
							onFinish={this.prepareAttachment}
							onCancel={this.cancelAttachment}
						/>
						<div className="message-input">
							{/* <div className={"message-input-title"}>

                            </div> */}
							<div className="d-flex align-items-center">
								<textarea
									value={inputMessage}
									placeholder={this.context.t("MESSAGES_TITLE")}
									onChange={(e) => {
										this.setState({ inputMessage: e.target.value });
									}}
									disabled={attachmentReady}
									className="message-content"
								/>

							</div>
						</div>
						<div className="message-input-tools">
							<div className="attachment-icon" onClick={this.openAttachmentUploader}>
								{attachmentClipIcon}
							</div>
							<button
								className="standard-button"
								onClick={this.send}
								disabled={(!inputMessage || inputMessage === "" || saving) && !attachmentReady}
							>
								{!saving && this.context.t("MESSAGES_SEND_BUTTON")}
								{saving && <i className="fa fa-cog fa-spin" />}
							</button>
						</div>
					</div>
				)}

				{!selectedThread && (
					<div style={{ padding: "0 15px" }}>
						{this.context.t("MESSAGES_NO_THREAD_SELECTED")}
					</div>
				)}
			</React.Fragment>
		);
	}
}

Messages.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null,
)(Messages);
