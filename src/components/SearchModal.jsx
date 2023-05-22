import React from "react";

const SearchModal = ({ isOpen, setIsOpen }) => {
   const closeSearch = () => {
      setIsOpen(false);
   };

   return (
      <div className={`modal ${isOpen ? "active" : ""}`}>
         <div className="overlay">
            <div className="modal-inner">
               <div className="modal-inner__head">
                  <span>TomoShop</span>
                  <span onClick={closeSearch}>
                     <i className="bx bx-x"></i>
                  </span>
               </div>
               <div className="modal-inner__body">
                  <div className="search-group">
                     <div className="search-input">
                        <input type="text" name="" placeholder="Search..." id="" />
                        <button>
                           <i className="bx bx-search-alt"></i>
                        </button>
                     </div>
                     <div className="search-result"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SearchModal;
