import React, { Fragment, useState, useEffect } from "react";
import cn from "classnames";
import Translate from "@components/Translator/Translate";

const CmsLicenseTermItem = ({
	item, termPosition, onUpdate, onRestore, onSave,
}) => {
	const [editing, setEditing] = useState(false);
	const [content, setContent] = useState("");
	const [invalid, setInvalid] = useState(false);
	const { editable, position } = item;

	useEffect(() => {
		setContent(item.content);
	});

	const handleChange = (e) => {
		setInvalid(false);
		onUpdate({ content: e.target.value });
	};

	const onSaveItem = () => {
		if (content !== "") {
			setEditing(false);
			onSave();
		} else {
			setInvalid(true);
		}
	};

	const onToggleItem = () => {
		setInvalid(false);
		setEditing(!editing);
	};

	return (
		<div className="license-item">
			<div className={cn("license-item-name", {
				"license-item-disabled": !editable,
				"license-item-editing": editing,
			})}
			>
				<strong>
					{termPosition}
					.
					{position}
				</strong>
			</div>
			<div className={cn("license-item-content", {
				"license-item-disabled": !editable,
				"license-item-editing": editing,
				"license-item-invalid": invalid && !content,
			})}
			>
				{!editing && <div>{content}</div>}
				{editing && <textarea value={content} onChange={handleChange} />}
			</div>
			<div className={cn("license-item-actions", {
				"license-item-disabled": !editable,
				"license-item-editing": editing,
			})}
			>
				{editable ? (
					editing ? (
						<Fragment>
							<i className="icon-check" onClick={onSaveItem} />
							<i className="icon-remove" onClick={onToggleItem} />
						</Fragment>
					) : (
						<Fragment>
							<i className="icon-edit" onClick={onToggleItem} />
							<i className="icon-reset" onClick={onRestore} />
						</Fragment>
					)
				) : (
					<span>
						<Translate i18nKey="CMS_LICENSE_ITEM_DISABLE" />
					</span>
				)}
			</div>
		</div>
	);
};

export default CmsLicenseTermItem;