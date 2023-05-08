import { Link, useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import DataTable from "../components/shared/data-table";
import { CallApiWithToken } from "../utils/callApi";
import useGlobalContext from "../contexts/GlobalContext";

const LibCardDetail = () => { 
    const { id } = useParams();

    const { token, role } = useGlobalContext();

    const { data: card } = useFetch('/card/detail/' + id);
    const { data: history, loading } = useFetch('/borrow/findBorrowByCard/' + id);

    const headers = ['Mã phiếu', 'Sách', 'mã sách', 'Ngày mượn', 'Hạn trả', 'Ngày trả', 'Tình trạng sách'];
    const rows = history?.map(x => { 
        return {
            onRowSelected: () => { },
            rowData: ['#' + x.borrow_id, x.book_name, '#' + x.copy_id, x.bor_date, x.due_date,
                x.ret_date || 'Chưa trả', x.ret_date ? (x.ret_status ? 'Nguyên vẹn' : 'Bị hỏng') : 'Chưa trả']
        }
    })

    const blockCard = async () => { 
        try {
            await CallApiWithToken(token).post('/card/block/' + id);
            window.location.reload();
        } catch { 
            alert('Failed')
        }
    }

    const blockAccount = async () => {
        try {
            await CallApiWithToken(token).post('/account/block/' + card.acc_id);
            window.location.reload();
        } catch {
            alert('Failed')
        }
    }

    return <div className="container-80">
        <div className="page-title">Thông tin thẻ</div>

        {card && <div className="mx-auto col-8">
            <h3>Mã thẻ: #{card.card_id}</h3>
            <div className="input-group mb-3">
                <span className="input-group-text">Tên</span>
                <div className="form-control col-1">{card.name}</div>
                <span className="input-group-text">Ngày sinh</span>
                <div className="form-control">{card.birth_date}</div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Khóa</span>
                <div className="form-control col-1">{card.school_year}</div>
                <span className="input-group-text">Khoa</span>
                <div className="form-control">{card.department}</div>
                <span className="input-group-text">tình trạng</span>
                <div className="form-control">{card.active ? 'Hoạt động' : 'Tạm khóa'}</div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Ngày mở</span>
                <div className="form-control col-1">{card.issue_date}</div>
                <span className="input-group-text">Hạn</span>
                <div className="form-control">{card.expire_date}</div>
            </div>
            
            {token && role === 'EMP' &&
                <>
                    <div className="mb-4">Tài khoản: {card.username ?
                        <>
                            <b className="me-3">{card.username}</b>
                            <button className={card.acc_active ? "btn btn-danger" : 'btn btn-success'} onClick={blockAccount}>
                                {card.acc_active ? 'Khóa tài khoản' : 'Mở khóa'}
                            </button>
                        </>
                        : 'Chưa tạo tài khoản'}</div>

                    <Link to={'/BLibrary/UpdateCard/' + card.card_id}>
                        <div className="btn btn-primary me-4">Chỉnh sửa</div>
                    </Link>
                    <div className={card.active ? 'btn btn-danger' : 'btn btn-success'} onClick={blockCard}>
                        {card.active ? 'Khóa thẻ' : 'Mở khóa thẻ'}
                    </div>
                </>
            }
        </div>}

        <div className="page-title">Lịch sử mượn</div>

        {loading && <div className="loader"></div>}
        {history ? <DataTable headers={headers} rows={rows} /> : <h3>Không có lịch sử mượn</h3>}
    </div>
}

export default LibCardDetail;