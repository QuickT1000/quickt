import React from 'react'
import BaseButtons from "../buttons/BaseButtons";

const BaseCard = (props) => {
    const {
        onSave,
        onCancel,
        disabled,
        title,
        children
    } = props;

    return (
        <div className={'card'}>
            <div className="card-header">{title}</div>
            <div className="card-body">
                {children}
            </div>
            <div className="card-footer">
                <BaseButtons button='save' onClick={onSave} disabled={disabled}/>
                <BaseButtons button='cancel' onClick={onCancel}/>
            </div>
        </div>
    );
};

export default BaseCard;
