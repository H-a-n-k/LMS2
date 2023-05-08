import useFetch from '../utils/useFetch'
import DataTable from '../components/shared/data-table'
import { useEffect, useMemo, useRef, useState } from 'react';
import AddBorrowDialog from '../components/page/borrow/add-borrow';
import ReturnBookDialog from '../components/page/borrow/return-book';

const BorrowPage = () => { 

    const [page, setPage] = useState(1);
    const [borrow, setBorrow] = useState(true); //show only borrowed book
    const [searchId, setSearchId] = useState('');

    //dialogs
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showReturnDialog, setShowReturnDialog] = useState(false);

    const borrowObj = useMemo(() => { 

        return {
            params: {
                page,
                borrow,
                id: searchId
            }
        }
    }, [page, borrow, searchId])
    const { data: borrows } = useFetch('/borrow', borrowObj);
    const { data: total } = useFetch('/borrow/count', borrowObj);
    const pageCount = useMemo(() => Math.max(1, Math.ceil(total / 20)), [total]);

    const searchIdRef = useRef('');

    useEffect(() => { 
        setPage(1)
    }, [borrow, searchId])

    const headers = ['Mã phiếu', 'Ngày mượn', 'Thời hạn', 'Ngày trả', 'Tình trạng sách', 'Mã sách', 'Mã thẻ'];
    const rows = borrows?.map(x => { 
        return {
            onRowSelected: () => { 
                setSelectedItem(x.borrow_id)
                setShowReturnDialog(true)
            },
            rowData: [x.borrow_id, x.bor_date, x.due_date, x.ret_date || 'Chưa trả',
                x.ret_date ? x.ret_status ? 'Nguyên vẹn' : 'Sách hỏng' : 'Chưa trả', x.copy_id, x.card_id]
        }
    })

    const onSearch = () => { 
        const search = searchIdRef.current.value;
        setSearchId(search);
    }

    const onInputEnter = (e) => { 
        if (e.key === 'Enter') onSearch();
    }

    return <div className="container-80 pb-3">
        <div className="page-title">Danh sách phiếu mượn - trả</div>

        <div className="mb-3">
            <button className="btn btn-primary" onClick={() => setShowAddDialog(true)}>Mượn sách</button>
        </div>

        {showAddDialog && <AddBorrowDialog onExit={() => setShowAddDialog(false)} />}
        {showReturnDialog && selectedItem && <ReturnBookDialog onExit={() => { setShowReturnDialog(false); }} id={selectedItem} />}

        <div className="mb-3 m-row">
            <label className={borrow ? 'btn btn-info me-3' : 'btn btn-outline-info me-3'} htmlFor='borrow'>Phiếu mượn</label>
            <input type="radio" id='borrow' name='borrow' checked={borrow} onChange={() => setBorrow(true)} hidden/>
            <label className={!borrow ? 'btn btn-info' : 'btn btn-outline-info'} htmlFor='return'>Phiếu Trả</label>
            <input type="radio" id='return' name='borrow' checked={!borrow} onChange={() => setBorrow(false)} hidden />
            <div className="input-group ms-5 me-5" style={{width: '40%'}}>
                <span className="input-group-text">Tìm mã phiếu</span>
                <input type="text" className="form-control" placeholder='Nhập mã phiếu' ref={searchIdRef} onKeyDown={onInputEnter}/>
            </div>
            <button className="btn btn-primary" onClick={onSearch}>Tìm</button>
        </div>

        <DataTable headers={headers} rows={rows} />

        <div>
            <input type="number" value={page} min={1} max={pageCount} onChange={(e) => setPage(e.target.value)} /> / {pageCount}
        </div>
    </div>
}

export default BorrowPage;