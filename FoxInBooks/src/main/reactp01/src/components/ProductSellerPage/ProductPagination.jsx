import './ProductPagination.css'

const ProductPagination = ({ handlePageChange, page, pageNumbers }) => {
  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(1, page - 1);
    handlePageChange(prevPage);
  };

  const handleNextPage = () => {
    const nextPage = Math.min(pageNumbers.length, page + 1);
    handlePageChange(nextPage);
  };

  const handleLastPage = () => {
    handlePageChange(pageNumbers.length);
  };

  return (
    <div className="pageNationContainer">
      <div>
        <button className="handlePageButton" onClick={handleFirstPage}>{`<<`}</button>
        <button className="handlePageButton" onClick={handlePrevPage}>{`<`}</button>
        {pageNumbers.map((number) => (
          <button
            className={`handledpageNumbers_${page === number ? 'currentPage' : ''}`}
            key={number}
            onClick={() => handlePageChange(number)}>{number}
          </button>
        ))}
        <button className="handlePageButton" onClick={handleNextPage}>{`>`}</button>
        <button className="handlePageButton" onClick={handleLastPage}>{`>>`}</button>
      </div>
    </div>
  );
};

export default ProductPagination;