import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchModal = ({ isOpen, setIsOpen }) => {
   const history = useHistory();
   const [searchQuery, setSearchQuery] = useState("");
   const closeSearch = () => {
      setIsOpen(false);
   };

   const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
   };

   const handleSearchSubmit = (e) => {
      e.preventDefault();
      if (searchQuery) {
         history.push(`/catalog?search=${searchQuery}`);
         closeSearch();
      }
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
                  <form onSubmit={handleSearchSubmit}>
                     <div className="search-group">
                        <div className="search-input">
                           <input
                              type="text"
                              name=""
                              placeholder="Search..."
                              id=""
                              value={searchQuery}
                              onChange={handleInputChange}
                           />
                           <button type="submit">
                              <i className="bx bx-search-alt"></i>
                           </button>
                        </div>
                        <div className="search-result"></div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SearchModal;
