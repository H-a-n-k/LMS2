import DialogWrapper from "./dialog-wrapper";

const ConfirmDialog = ({msg, onConfirm, onCancle}) => { 
    return <DialogWrapper noBG onClickOut={onCancle}>
        <div className="confirm-dialog">
            <p>{msg}</p>
            <div className="btns">
                <span className="yes btn" onClick={onConfirm}>Có</span>
                <span className="no btn" onClick={onCancle}>Không</span>
            </div>
        </div>
    </DialogWrapper>
}

export default ConfirmDialog;