import React, {useEffect, useState} from 'react';
import {Pagination, Form} from "react-bootstrap";
import './DwPagination.scss';

const DwPagination = (props) => {
    const {pagination, onChange} = props;
    const total = pagination.total;
    const pages = Math.ceil(total / pagination.pageSize);
    const mediaMatch = window.matchMedia('(min-width: 630px)');
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addEventListener('change', handler);
        return () => mediaMatch.removeEventListener('change', handler);
    });

    const onClick = (pageIndex) => {
        onChange({...pagination, pageIndex});
    };

    const handlePageSizeChange = (e) => {
        onChange({...pagination, pageSize: parseInt(e.target.value)});
    };


    const renderPaginationItems = () => {
        const items = [];
        const currentPage = parseInt(pagination.pageIndex);

        if (pages <= 5) {
            for (let number = 1; number <= pages; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => onClick(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
        } else {
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(pages - 1, currentPage + 1);

            items.push(
                <Pagination.Item key={1} active={currentPage === 1} onClick={() => onClick(1)}>
                    1
                </Pagination.Item>
            );

            if (currentPage > 3) items.push(<Pagination.Ellipsis key="ellipsis-1"/>);

            for (let number = startPage; number <= endPage; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => onClick(number)}>
                        {number}
                    </Pagination.Item>
                );
            }

            if (currentPage < pages - 2) items.push(<Pagination.Ellipsis key="ellipsis-2"/>);
            items.push(
                <Pagination.Item key={pages} active={currentPage === pages} onClick={() => onClick(pages)}>
                    {pages}
                </Pagination.Item>
            );
        }

        return items;
    };

    const pageIndex = parseInt(pagination.pageIndex);

    if (!matches) {
        return (
            <div className="pagination-container">
                <Pagination size="sm">
                    <Pagination.Prev onClick={() => onClick(pageIndex - 1)} disabled={pageIndex === 1}/>
                    <Pagination.Item>
                        {pageIndex}
                    </Pagination.Item>
                    <Pagination.Next onClick={() => onClick(pageIndex + 1)} disabled={pageIndex === pages}/>
                </Pagination>

                <Form.Select
                    value={pagination.pageSize}
                    onChange={handlePageSizeChange}
                    size='sm'
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={total}>All</option>
                </Form.Select>
            </div>

        )
    } else {
        return (
            <div className="pagination-container">
                <Pagination size="sm">
                    <Pagination.First onClick={() => onClick(1)} disabled={pageIndex === 1}/>
                    <Pagination.Prev onClick={() => onClick(pageIndex - 1)} disabled={pageIndex === 1}/>

                    {renderPaginationItems()}

                    <Pagination.Next onClick={() => onClick(pageIndex + 1)}
                                     disabled={pageIndex === pages}/>
                    <Pagination.Last onClick={() => onClick(pages)} disabled={pageIndex === pages}/>
                </Pagination>

                <Form.Select
                    value={pagination.pageSize}
                    onChange={handlePageSizeChange}
                    size='sm'
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={total}>All</option>
                </Form.Select>
            </div>
        );
    }
}

export default DwPagination;
