import React, { useState } from "react";
import { useSelector } from "react-redux";

const OpenEditAddModal = () => {
  const { openEditModal, openAddModal } = useSelector((state) => state.books);

  return (
    <></>
    // <div>
    //   {(openEditModal || openEditModal) && (
    //     <div
    //       className="modal fade"
    //       tabIndex="-1"
    //       role="dialog"
    //       style={{ display: "block" }}
    //     >
    //       <div className="modal-dialog" role="document">
    //         <div className="modal-content">
    //           <div className="modal-header">
    //             <h5 className="modal-title"> {}</h5>
    //             <button
    //               type="button"
    //               className="close"
    //               onClick={handleModalClose}
    //             >
    //               <span>&times;</span>
    //             </button>
    //           </div>
    //           <div className="modal-body">
    //             <p>Custom Modal body content goes here.</p>
    //           </div>
    //           <div className="modal-footer">
    //             <button
    //               type="button"
    //               className="btn btn-secondary"
    //               onClick={handleModalClose}
    //             >
    //               Close
    //             </button>
    //             <button type="button" className="btn btn-primary">
    //               Save Changes
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   {showModal && (
    //     <div className="modal-backdrop" onClick={handleModalClose}></div>
    //   )}
    // </div>
  );
};

export default OpenEditAddModal;
