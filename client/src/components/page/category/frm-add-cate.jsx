import { useState, useRef } from "react";
import DialogWrapper from "../../shared/dialog-wrapper"
import {CallApiWithToken} from "../../../utils/callApi";
import useGlobalContext from "../../../contexts/GlobalContext";
import ConfirmDialog from "../../shared/dialog-confirm";
import UpdIcon from '../../../resources/imgs/cate_upd_icon.png'
import DelIcon from '../../../resources/imgs/cate_del_icon.png'

const FrmAddCate = ({setShow, item, setRefresh}) => { 
    const {token} = useGlobalContext();
    
    const [name, setName] = useState((item && item.cate_name) || '');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showToastUpd, setShowToastUpd] = useState(false);
    const [showToastDel, setShowToastDel] = useState(false);
    const [error, setError] = useState('');

    const dialogRef = useRef('');

    const Exit = () => { 
        setShow(false);
    }

    const refresh = () => { 
        setRefresh(x => !x);
    }

    //action = 1: add, 2: update, 3: delete
    const onConfirm = async (action) => {

        try {
            switch (action) { 
                case 1:
                    await CallApiWithToken(token).post('/category/add', { name });
                    break;
                case 2:
                    if (item && item.cate_id) await CallApiWithToken(token).post('/category/update/' + item.cate_id, {
                        cate_id: item.cate_id,
                        name
                    });
                    setShowToastUpd(true);
                    break;
                case 3:
                    if (item && item.cate_id) await CallApiWithToken(token).put('/category/delete/' + item.cate_id);
                    setShowToastDel(true);
                    break;
                default: return;

            }
            let delay = action === 1 ? 0 : 1500;
            dialogRef.current.className += ' fade'
            setTimeout(() => { 
                refresh();
                Exit();
            }, delay)
        } catch (err) {
            console.log('failed: ', err)
            setError(err.response.data.msg);
        }
    }

    const keyDown = (e) => { 
        if (e.key === 'Enter') { 
            if (item && item.cate_id) onConfirm(2);
            else onConfirm(1);
            return;
        }
    }

    return <DialogWrapper onClickOut={Exit}>
        <div className="add-dialog" ref={dialogRef}>
            <h2>
                {item && item.cate_id ? "Cập nhật" : "Thêm"} thể loại
            </h2>
            <div>
                <input type='text' placeholder="Tên thể loại" autoFocus={true} value={name}
                    onKeyDown={(e) => { keyDown(e) }} onChange={(e) => { setName(e.target.value) }} />
                {(!item || !item.cate_id) && <span className="btn pill btn-add" onClick={() => onConfirm(1)}>Thêm</span>}
            </div>
            <div className="btn-cancle" onClick={Exit}>x</div>
            <div className="btns">
                {item && item.cate_id &&
                    <>
                        <span className="btn pill delete" onClick={() => { setShowConfirm(true)}}>Xóa</span>
                        <span className="btn pill" onClick={() => { onConfirm(2) }}>Cập Nhật</span>
                    </>
                }
            </div>

            <div>
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
            
            {showConfirm &&
                <ConfirmDialog msg={'Có chắc là muốn xóa không?'} onCancle={() => setShowConfirm(false)} onConfirm={() => onConfirm(3)} />
            }

            {showToastUpd && 
                <DialogWrapper noBG>
                    <div className="mtoast update">
                        <img src={UpdIcon} alt="" />
                        Cập nhật thành công!
                    </div>
                </DialogWrapper>
            }

            {showToastDel &&
                <DialogWrapper noBG>
                    <div className="mtoast delete">
                        <img src={DelIcon} alt="" />
                        <span>Đã xóa thành công !!</span>
                    </div>
                </DialogWrapper>
            }

        </div>
    </DialogWrapper>
}

export default FrmAddCate;