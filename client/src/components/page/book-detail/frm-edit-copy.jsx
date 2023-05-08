import { useState } from "react";
import {CallApiWithToken} from "../../../utils/callApi";
import DialogWrapper from "../../shared/dialog-wrapper"
import useGlobalContext from "../../../contexts/GlobalContext";
import useFetch from "../../../utils/useFetch";

const FormEditCopy = ({ onExit, copy, refresh }) => { 
    
    const { token } = useGlobalContext();
    const { data: Statuses } = useFetch('/state', null, token);
    const [formData, setFormData] = useState({ copy_id: copy.copy_id, state_id: copy.state_id, note: copy.note});


    const onConfirm = async (action) => {
        try {
            switch (action) {
                case 1:
                    await CallApiWithToken(token).post('/lbooks')
                    break;
                case 2:
                    await CallApiWithToken(token).post('/copy/update/' + copy.copy_id, {
                        ...formData
                    });
                    break;
                case 3:
                    await CallApiWithToken(token).put('/copy/delete/' + copy.copy_id);
                    break;
                default: return;

            }
            alert('Thành công!');
            refresh(x => !x)
            onExit();
        } catch (err) {
            alert('Có lỗi xảy ra')
            console.log('failed: ', err)
        }
    }

    const onFormChange = (e) => { 
        const { id, value } = e.target;
        setFormData(x => { return {...x, [id]: value} })
    }

    return <DialogWrapper onClickOut={onExit}>
        <div className="edit-copy">
            <h3 className="title mb-3">Chỉnh sửa cuốn sách #{copy.copy_id}</h3>
            <div className="input-group mb-3">
                <span className="input-group-text">Tình trạng</span>
                <select id="state_id" className="form-control" value={formData.state_id || (Statuses && Statuses[0])} onChange={(e) => onFormChange(e)}>
                    {Statuses?.map(x => <option key={x.id} value={x.id}>
                        {x.state_name}
                    </option>)}
                </select>
            </div>
           
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="note" placeholder=" " value={formData.note} onChange={(e) => onFormChange(e)} />
                <label for="note">Ghi chú</label>
            </div>
           
            <div style={{ float: "right" }}>
                <div className="btn btn-primary" onClick={() => onConfirm(2)}>Cập nhật</div>
                <div className="btn btn-danger ms-3 me-3" onClick={() => onConfirm(3)}>Xóa</div>
                <div className="btn btn-secondary" onClick={onExit}>Hủy</div>
            </div>
        </div>
    </DialogWrapper>
}

export default FormEditCopy