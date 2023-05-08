import { useState } from "react";
import DialogWrapper from "../../shared/dialog-wrapper";
import useGlobalContext from "../../../contexts/GlobalContext";
import { CallApiWithToken } from "../../../utils/callApi";

const ReturnBookDialog = ({ onExit, id }) => { 
    
    const [state, setState] = useState(1);
    const { token } = useGlobalContext();

    const onSelect = (e) => {   
        setState(parseInt(e.target.value));
    }

    const onSubmit = async () => { 
        try {
            await CallApiWithToken(token).post('/borrow/returnBook/' + id, {
                status: state
            });
            alert('Đã trả')
            onExit();
        } catch (err) { 
            alert('Có lỗi');
            console.log(err);
        }
    }

    return <DialogWrapper onClickOut={onExit}>
        <div className="col-4 p-5" style={{backgroundColor: "white"}}>
            <h3 className="mb-3">Trả sách cho phiếu mượn #{id}</h3>

            <p>Trạng thái sách: </p>
            <div className="m-row mb-4">
                <div className="form-check me-4">
                    <input className="form-check-input" type="radio" name="state" id="opt1"
                        value={1} checked={state === 1} onChange={(e) => onSelect(e)} />
                    <label className="form-check-label" for="opt1">
                        Nguyên vẹn
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="state" id="opt2"
                        value={0} checked={state === 0} onChange={(e) => onSelect(e)} />    
                    <label className="form-check-label" for="opt2">
                        Hư hỏng
                    </label>
                </div>
            </div>

            <div>
                <button className="btn btn-primary" onClick={onSubmit}>Xác nhận</button>
            </div>
        </div>
    </DialogWrapper>
}

export default ReturnBookDialog;