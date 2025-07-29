import { Add } from "pages/Admin/EditHandling";
import Delete from "pages/Admin/Delete";
import { createPortal } from "react-dom";

function Panel({ showForm, onClose ,resfresh}) {
    return (
        <>  {(showForm[0] && showForm[1] == 'Add') ? createPortal(
            <Add showForm={showForm} onClose={onClose} refresh={resfresh}/> ,
    document.body): <></>} 
            {(showForm[0] && showForm[1] == 'Delete') ? <Delete /> : ''}
            {(showForm[0] && showForm[1] == 'Update') ? <></> : ''}
        </>
    );
}

export default Panel