import React from 'react';
import classnames from 'classnames';
import { usePagination, leftDots, rightDots } from '../hooks/usePagination';
import '../styles/pagination.scss';

interface PaginationProps {
    onPageChange: (currentPage: string | number) => void,
    totalCount: number,
    siblingCount: number,
    currentPage: number,
    pageSize: number,
    className: string
}

const Pagination = (props: PaginationProps) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <tfoot
            className={classnames('pagination-container', { [className]: className })}
        >
            <tr className='flex flex-row'>
                <td
                    className={classnames('pagination-item', {
                        disabled: currentPage === 1
                    })}
                    onClick={onPrevious}
                >
                    <div className="arrow left" />
                </td>
                {paginationRange.map(pageNumber => {
                    if (pageNumber === leftDots) {
                        return <td className="pagination-item dots" key='left_dots'>&#8230;</td>;
                    }

                    if (pageNumber === rightDots) {
                        return <td className="pagination-item dots" key='right_dots'>&#8230;</td>;
                    }

                    return (
                        <td
                            className={classnames('pagination-item', {
                                selected: pageNumber === currentPage
                            })}
                            onClick={() => onPageChange(pageNumber)}
                            key={pageNumber}
                        >
                            {pageNumber}
                        </td>
                    );
                })}
                <td
                    className={classnames('pagination-item', {
                        disabled: currentPage === lastPage
                    })}
                    onClick={onNext}
                >
                    <div className="arrow right" />
                </td>
            </tr>
        </tfoot>
    );
};

export default Pagination;
