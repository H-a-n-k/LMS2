import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {CallApiWithToken} from '../utils/callApi';
import { getBookCover } from '../mock-data'
import FormEditCopy from "../components/page/book-detail/frm-edit-copy";
import useGlobalContext from "../contexts/GlobalContext";
import {convertToDMY} from '../utils/convertDate'
import useFetch from "../utils/useFetch";
import DataTable from "../components/shared/data-table";

const BookDetailPage = () => {
    const {token} = useGlobalContext();

    const { id } = useParams();
    const [refeshCopies, setRefeshCopies] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [selectedCopy, setSelectedCopy] = useState(null);
    const [status, setStatus] = useState('');

    const { data: book } = useFetch('/book/detail/' + id);
    // eslint-disable-next-line
    const statusObj = useMemo(() => { return { params: { state: status } } }, [id, refeshCopies, status, token])
    const { data: copies } = useFetch('copy/getCopiesByBook/' + id, statusObj, token);
    const { data: statuses } = useFetch('/state', null, token);

    //copy table
    const headers = ['Mã cuốn sách', 'Tình trạng', 'Ghi chú'];
    const rows = copies?.map(x => {
        return {
            onRowSelected: () => selectCopy(x),
            rowData: ['#'+ x.copy_id, x.state_name, x.note]
        }
    })

    const navigate = useNavigate();

    const onDeleteBook = async () => { 
        try {
            if (!window.confirm("Xoa ha")) return;
            await CallApiWithToken(token).put('book/deleteBook/' + id);
            alert('đã xóa')
            navigate('/BLibrary/Book')
        } catch (err) { 
            console.log(err);
            alert('có lỗi xảy ra');
            return false;
        }
    }

    const onAddCopy = async () => {
        try {
            await CallApiWithToken(token).post('copy/add', {
                note: 'Sách mới',
                book_id: book.book_id
            })

            alert('Đã thêm');
            setRefeshCopies(x => !x)
        } catch (err) { 
            console.log(err);
            alert('Có lỗi xảy ra');
        }
    }

    const selectCopy = (copy) => { 
        setSelectedCopy(copy);
        setShowEditDialog(true);
    }

    return <div className="book-detail-page">
        <h2 className="page-title">Thông tin sách</h2>
        {showEditDialog && <FormEditCopy onExit={() => setShowEditDialog(false)} copy={selectedCopy} refresh={setRefeshCopies} />}

        <div className="container-80 pb-5">
            {book ?
                <>
                    <div className="book-info">
                        <div className="left">
                            <div className="book-cover">
                                <img src={getBookCover(book.book_id, 200, 300)} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="name">{book.book_name}</div>
                            <div>Thể loại: {book.cate_name}</div>
                            <div>Tác giả: {book.author}</div>
                            <div>NXB: {book.publisher}</div>
                            <div>Năm XB: {book.publishYr}</div>
                            <div>Ngày thêm: {convertToDMY(book.add_date)}</div>
                            {token && <>
                                <div className="btn btn-primary" onClick={() => navigate(`/BLibrary/UpdateBook/${book.book_id}`)}>
                                    Chỉnh Sửa
                                </div>
                                <div className="btn btn-danger" onClick={onDeleteBook}>
                                    Xóa
                                </div>
                            </>}
                        </div>
                        
                    </div>
                    <h3>Tóm tắt: </h3>
                    <div>{book.summary}</div>
                    <br />
                    
                    {token && <>
                        <hr />
                        <br />
                        <h2 className="page-title">Thông tin các cuốn sách</h2>
                        <div className="btn btn-primary mb-3" onClick={onAddCopy}>+ Thêm cuốn sách</div>
                        <div className="mb-3">
                            <label className="me-3">Lọc theo tình trạng</label>
                            <select value={status} onChange={e => setStatus(e.target.value)}>
                                <option value=''>Tất cả</option>
                                {statuses && statuses.map(x => <option key={x.id} value={x.id}>{x.state_name}</option>)}
                            </select>
                        </div>
                        
                        {(copies && copies.length > 0) ? <DataTable headers={headers} rows={rows} /> : 'Không tìm thấy'}
                    </>} 
                    
                </>
                :
                <h2>không tìm thấy sách</h2>
            }
        </div>
    </div>
}

export default BookDetailPage;