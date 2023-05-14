import useFetch from '../utils/useFetch'
import DataTable from '../components/shared/data-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import PayFineDialog from '../components/page/fine/pay_fine';

const FinePage = () => { 

    const [page, setPage] = useState(1);
    const [paid, setPaid] = useState(0);
    const [cardId, setCardId] = useState('');
    const [borrowId, setBorrowId] = useState('');
    const [searchByBorrow, setSearchByBorrow] = useState(true);
    const [selectedItem, setSelectedItem] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const searchBorrowRef = useRef('');
    const searchCardRef = useRef('');

    const fineObj = useMemo(() => {
        return {
            params: {
                page,
                paid,
                cardId,
                borrowId,
                refresh
            }
        }
    }, [page, paid, cardId, borrowId, refresh]);
    const { data: fines, loading } = useFetch('/fine', fineObj);
    const { data: count } = useFetch('/fine/count', fineObj);

    const pageCount = useMemo(() => Math.max(Math.ceil(count / 20), 1), [count]);

    const headers = ['Phiếu mượn', 'Mã thẻ' ,'Lỗi', 'Số tiền'];
    const rows = fines?.map(x => { 
        return {
            onRowSelected: () => { 
                setSelectedItem(x);
                setShowDialog(true);
            },
            rowData: [x.borrow_id, x.card_id , x.cause, x.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'đ']
        }
    })

    const onSearch = () => { 
        setCardId(searchCardRef.current.value);
        setBorrowId(searchBorrowRef.current.value);
    }

    const onInputEnter = (event) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    }

    useEffect(() => { 
        if (searchByBorrow) {
            searchCardRef.current.value = '';
        } else { 
            searchBorrowRef.current.value = '';
        }
    }, [searchByBorrow])


    return <div className="container-80 pb-5">
        <div className="page-title">Danh sách phiếu phạt</div>
        {showDialog && <PayFineDialog onExit={() => setShowDialog(false)} item={selectedItem} refresh={()=>setRefresh(x => !x)} />}

        <div className="input-group mb-4">
            <div className={`btn me-3 ${paid === 0 ? 'btn-info' : 'btn-outline-info'}`} onClick={() => setPaid(0)}>Chưa trả</div>
            <div className={`btn me-5 ${paid === 1 ? 'btn-info' : 'btn-outline-info'}`} onClick={() => setPaid(1)}>Đã trả</div>

            <span className={`input-group-text btn ${searchByBorrow ? 'btn-primary' : 'btn-secondary'}`} id="basic-addon1" onClick={() => setSearchByBorrow(true)}>Tìm theo mã phiếu</span>
            <input type="text" className="form-control me-4" placeholder="Mã thẻ" aria-label="Username" aria-describedby="basic-addon1"
                ref={searchBorrowRef} onKeyDown={(e) => onInputEnter(e)} disabled={!searchByBorrow} />
            <span className={`input-group-text btn ${!searchByBorrow ? 'btn-primary' : 'btn-secondary'}`} id="basic-addon1" onClick={() => setSearchByBorrow(false)}>Tìm theo mã thẻ</span>
            <input type="text" className="form-control me-4" placeholder="Mã phiếu mượn" aria-label="Username" aria-describedby="basic-addon1"
                ref={searchCardRef} onKeyDown={(e) => onInputEnter(e)} disabled={searchByBorrow} />
            <button onClick={onSearch} className="btn btn-primary">Tra cứu</button>
        </div>
        {loading ? <div className="loader"></div> : <DataTable headers={headers} rows={rows} noEdit={paid===1} />}
        <div className="pager">
            Trang <input type="number" max={pageCount} min={1} value={page} onChange={(e) => setPage(e.currentTarget.value)} /> / {pageCount}
        </div>
    </div>
}

export default FinePage;