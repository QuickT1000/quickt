import React from 'react';

export const BaseColumn = (props) => {

    const {
        children,
        ...restProps
    } = props;

    return (
        <td {...restProps}>{children}</td>
    );

};
