import BaseButtons from "../../buttons/BaseButtons";
import React from "react";
import "./QucktToolbar.scss";

const QuicktToolbar = (props) => {
    const {
        onAdd,
        onEdit,
        onDelete,
        onImport,
        onExport,
        selectedRows,
        children
    } = props;

    return (
        <div className='quickt__toolbar'>
            <div className='quickt__toolbar__buttons me-auto'>
                <BaseButtons button='add' onClick={onAdd}/>
                <BaseButtons button='edit' onClick={onEdit} disabled={selectedRows.length !== 1}/>
                <BaseButtons button='delete' onClick={onDelete} disabled={selectedRows.length === 0}/>
                <BaseButtons button='import' onClick={onImport} />
                <BaseButtons button='export' onClick={onExport} disabled={selectedRows.length === 0}/>
                {children}
            </div>
        </div>
    )
}

export default QuicktToolbar;