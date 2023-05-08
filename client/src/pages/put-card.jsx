import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CallApiWithToken } from '../utils/callApi'
import {convertToYMD} from '../utils/convertDate'
import useGlobalContext from '../contexts/GlobalContext'
import useFetch from "../utils/useFetch";

const PutCardPage = () => {
    const { id } = useParams();
    const { token } = useGlobalContext();
    const navigate = useNavigate();

    const initialFrm = {
        name: '', birth_date: '', school_year: '', department: '', expire_date: ''
    };
    const [frmData, setFrmData] = useState(initialFrm);

    const { data: card } = useFetch('/card/detail/' + id);
    useEffect(() => {
        if (card) setFrmData({ ...card, birth_date: convertToYMD(card.birth_date), expire_date: convertToYMD(card.expire_date) });
    }, [card])

    const onInputChange = (e) => {
        const { id, value } = e.target;
        setFrmData(x => { return { ...x, [id]: value } });
    }

    const onFrmSubmit = async (e) => { 
        e.preventDefault();
        try {
            console.log(frmData);
            if (id) await CallApiWithToken(token).post('/card/update/' + id, frmData);
            else await CallApiWithToken(token).post('/card/add', frmData);

            alert(id ? 'updated' : 'added');
            if (id) navigate('/BLibrary/LibCard/' + id);
            setFrmData(initialFrm);
        } catch(err) { 
            console.log(err);
        }
    }

    return <div className="container col-6">
        <div className="page-title">
            {id ? 'Cập nhật thẻ #' + id : 'Thêm thẻ thư viện'}
        </div>

        <form onSubmit={(e) => onFrmSubmit(e)}>
            <div className="row mb-3">
                <div className="form-floating col-8">
                    <input type="text" id="name" className="form-control" placeholder=" "
                        value={frmData['name']} onChange={onInputChange}/>
                    <label htmlFor="name" className="ps-4">Họ tên: </label>
                </div>
                <div className="form-floating col-4">
                    <input type="date" id="birth_date" name="birth_date" className="form-control" placeholder=" "
                        value={frmData['birth_date']} onChange={onInputChange}/>
                    <label htmlFor="birth_date" className="ps-4">Ngày sinh:</label>
                </div>
            </div>

            <div className="row mb-3">
                <div className={`form-floating ${id ? 'col-4' :'col-8'}`}>
                    <input type="text" id="department" className="form-control" placeholder=" "
                        value={frmData['department']} onChange={onInputChange}/>
                    <label htmlFor="department" className="ps-4">Khoa:</label>
                </div>
                <div className="form-floating col-4">
                    <input type="number" id="school_year" className="form-control" placeholder=" "
                        value={frmData['school_year']} onChange={onInputChange}/>
                    <label htmlFor="school_year" className="ps-4">Khóa:</label>
                </div>
                {id && 
                    <div className="form-floating col-4">
                        <input type="date" id="expire_date" className="form-control" placeholder=" "
                            value={frmData['expire_date']} onChange={onInputChange} />
                        <label htmlFor="expire_date" className="ps-4">Hạn</label>
                    </div>
                }
            </div>

            <button className="btn btn-primary" style={{float: 'right'}}>Xác nhận</button>
        </form>

    </div>
}

export default PutCardPage;