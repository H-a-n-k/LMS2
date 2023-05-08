import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import {CallApiWithToken} from "../utils/callApi";
import useGlobalContext from "../contexts/GlobalContext";
import useFetch from '../utils/useFetch';

const PutBookPage = () => { 
    const { id } = useParams();
    const { token } = useGlobalContext();

    const DefaultFormData = { book_name: '', author: '', publisher: '', publishYr: '2000', summary: '', cate_id: '-1' }
    const [form, setForm] = useState(DefaultFormData);

    const { data: categories } = useFetch('/category');
    let { data: book } = useFetch('/book/detail/' + id)

    useEffect(() => { 
        if (id) setForm(book);
    }, [book, id])

    const navigate = useNavigate();

    const onFormChange = (e) => { 
        const { id, value } = e.target;
        setForm(x => { return { ...x , [id]: value} })
    }

    const onSubmit = async () => { 
        try {

            if (form.cate_id < 0) { 
                alert('Vui lòng chọn thể loại');
                return;
            }
            const body = {
                ...form,
                publishYr: form.publishYr,
                book_id: id || 'id',
                coverImg: 'img'
            }
            
            if (id) {
                await CallApiWithToken(token).post('/book/updateBook/' + id, body)
            } else { 
                await CallApiWithToken(token).post('/book/addBook', body)
            }

            alert('Thành công!')
            if (id) navigate('/BLibrary/Book/' + id);
            else setForm(DefaultFormData);
        } catch (err) { 
            console.log(err);
            alert('Có lỗi!');
        }
    }

    return <div className="put-book-page">
        <div className="container-80">
            <div className="page-title">{id ? 'Sửa sách' :'Thêm Sách'}</div>
            <div className="w-75 p-3 mx-auto">
                <form action="#">
                    <div className="row mb-3">
                        <div className="form-floating col-6">
                            <input type="text" id="book_name" className="form-control" placeholder=" "
                                onChange={onFormChange} value={form && form['book_name']} />
                            <label htmlFor="book_name" className="ps-4">Tên sách: </label>
                        </div>
                        <div className="form-floating col-6">
                            <input type="text" id="author" className="form-control" placeholder=" "
                                onChange={onFormChange} value={form && form['author']} />
                            <label htmlFor="author" className="ps-4">Tác giả:</label>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="form-floating col-6">
                            <input type="text" id="publisher" className="form-control" placeholder=" "
                                onChange={onFormChange} value={form && form['publisher']} />
                            <label htmlFor="publisher" className="ps-4">Nhà xuất bản:</label>
                        </div>
                        <div className="form-floating col-3">
                            <input type="number" id="publishYr" className="form-control" placeholder=" "
                                onChange={onFormChange} value={form && form['publishYr']} />
                            <label htmlFor="publishYr" className="ps-4">Năm xuất bản:</label>
                        </div>
                        <div className="form-floating col-3">
                            <select id="cate_id" className="form-select" onChange={onFormChange} value={form && form['cate_id']}>
                                <option key={-1} value={-1} hidden>Chọn thể loại</option>
                                {categories?.map(x => <option key={x.cate_id} value={x.cate_id}>{x.cate_name}</option>)}
                            </select>
                            <label htmlFor="cate_id" className="ps-4">Thể loại:</label>
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="summary" className="form-label">Tóm tắt:</label>
                        <textarea id="summary" className="form-control" onChange={onFormChange} value={form && form['summary']} />
                    </div>
                    <div className="btn btn-submit" onClick={onSubmit}>Xác nhận</div>
                </form>
            </div>
        </div>
    </div> 
}

export default PutBookPage