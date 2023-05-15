import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CallApi from "../utils/callApi";
import useFetch from "../utils/useFetch";

const PutStaffPage = () => { 
    const { id } = useParams();
    const navigate = useNavigate();

    const initForm = { name: '', phone: '', email: '', username: '', password: '', active: true };
    const [form, setForm] = useState(initForm);
    const [error, setError] = useState('');

    const { data: emp } = useFetch('/emp/detail/' + (id || -1));

    useEffect(() => { 
        if (emp) setForm(emp);
    }, [emp])

    const onFormChange = (e) => {
        const { id, value } = e.target;
        setForm(x => { return { ...x, [id]: value } })
    }

    const onFrmSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!id) {
                await CallApi.post('/emp/add', form);
                alert('Đã tạo')
                setForm(initForm);
                setError('');
            } else { 
                await CallApi.post('/emp/update/' + id, form);
                navigate('/BLibrary/Staff')
            }

        } catch (err) {
            console.log(err);
            setError(err.response.data.msg)
        }
    }

    const block = async () => { 
        try {
            await CallApi.post('/account/block/' + form?.acc_id);
            navigate('/BLibrary/Staff')
        } catch (err) {
            alert('Có lỗi');
            console.log(err);
        }
    }

    return <div className="container col-6">
        {id ? <div className="page-title"> Cập nhật thủ thư</div> :
            <div className="page-title">Thêm thủ thư</div>
        }

        <form onSubmit={(e) => onFrmSubmit(e)}>
            <div className="row mb-3">
                <div className={`form-floating`}>
                    <input type="text" id="name" className="form-control" placeholder=" "
                        value={form?.name} onChange={onFormChange}/>
                    <label htmlFor="name" className="ps-4">Họ tên: </label>
                </div>
            </div>

            <div className="row mb-3">
                <div className={`form-floating col-6`}>
                    <input type="text" id="email" className="form-control" placeholder=" "
                        value={form?.email} onChange={onFormChange}/>
                    <label htmlFor="email" className="ps-4">Email:</label>
                </div>
                <div className="form-floating col-6">
                    <input type="text" id="phone" className="form-control" placeholder=" "
                        value={form?.phone} onChange={onFormChange}/>
                    <label htmlFor="phone" className="ps-4">SĐT:</label>
                </div>
            </div>
            {!id &&
                <div className="row mb-3">
                    <div className={`form-floating col-6`}>
                        <input type="text" id="username" className="form-control" placeholder=" "
                            value={form?.username} onChange={onFormChange}/>
                        <label htmlFor="username" className="ps-4">Tài khoản:</label>
                    </div>
                    <div className="form-floating col-6">
                        <input type="password" id="password" className="form-control" placeholder=" "
                            value={form?.password} onChange={onFormChange}/>
                        <label htmlFor="password" className="ps-4">Mật khẩu:</label>
                    </div>
                </div>
            }
            
            <div className="m-row">
                {error && <p className="text-danger">{error}</p>}
                <div className="flex-fill"></div>
                <div>
                    {id && <button className={`btn me-4 ${form?.active ? 'btn-danger' : 'btn-success'}`} onClick={block}>
                        {form?.active ? 'Khóa' : 'Mở khóa'}
                    </button>}
                    <button className="btn btn-primary">{id ? 'Chỉnh sửa' : 'Thêm'}</button>
                </div>
            </div>
        </form>

    </div>
}

export default PutStaffPage;