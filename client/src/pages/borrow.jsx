import useFetch from '../utils/useFetch'
import DataTable from '../components/shared/data-table'
import { useEffect, useMemo, useRef, useState } from 'react';
import AddBorrowDialog from '../components/page/borrow/add-borrow';
import ReturnBookDialog from '../components/page/borrow/return-book';

const BorrowPage = () => { 

    const [page, setPage] = useState(1);
    const [borrow, setBorrow] = useState(true); //show only borrowed book
    const [searchId, setSearchId] = useState('');
    const [searchBook, setSearchBook] = useState('');
    const [searchCard, setSearchCard] = useState('');
    const [searchById, setSearchById] = useState(true);
    const [refresh, setRefresh] = useState(true);

    //dialogs
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showReturnDialog, setShowReturnDialog] = useState(false);

    const borrowObj = useMemo(() => { 

        return {
            params: {
                page,
                borrow,
                id: searchId,
                bookID: searchBook,
                cardID: searchCard,
                refresh
            }
        }
    }, [page, borrow, searchId, searchBook, searchCard, refresh])
    const { data: borrows, loading } = useFetch('/borrow', borrowObj);
    const { data: total } = useFetch('/borrow/count', borrowObj);
    const pageCount = useMemo(() => Math.max(1, Math.ceil(total / 20)), [total]);

    const searchIdRef = useRef('');
    const searchBookRef = useRef('');
    const searchCardRef = useRef('');

    const headers = borrow ?
        ['Mã phiếu', 'Ngày mượn', 'Thời hạn', 'Tình trạng', 'Mã cuốn sách', 'Mã thẻ']
        : ['Mã phiếu', 'Ngày mượn', 'Thời hạn', 'Ngày trả', 'Tình trạng sách', 'Mã sách', 'Mã thẻ'];
    const rows = borrows?.map(x => {
        const getFine = (i) => { 
            switch (i) { 
                case 1: return 'Quá hạn'
                case 2: return 'Mất sách'
                default: return 'Đang mượn'
            }
        }   

        return {
            onRowSelected: () => {
                if (x.ret_date) return;
                if (x.fine_status === 2) { 
                    alert('Muộn quá 7 ngày là coi như mất, khỏi trả nữa, giữ luôn đi')
                    return;
                }

                setSelectedItem(x.borrow_id)
                setShowReturnDialog(true)
            },
            rowData: borrow ?
                [x.borrow_id, x.bor_date, x.due_date, getFine(x.fine_status) , x.copy_id, x.card_id]
                :
                [x.borrow_id, x.bor_date, x.due_date, x.ret_date || 'Chưa trả',
                    x.ret_date ? (x.ret_status ? 'Nguyên vẹn': 'Sách hỏng') : 'Chưa trả', x.copy_id, x.card_id]
        }
    })

    const onSearch = () => {
        setSearchId(searchIdRef.current.value);
        setSearchBook(searchBookRef.current.value);
        setSearchCard(searchCardRef.current.value);
    }

    useEffect(() => {
        if (searchById) {
            searchBookRef.current.value = '';
            searchCardRef.current.value = '';
        } else {
            searchIdRef.current.value = '';
        }
    }, [searchById])

    //reset page
    useEffect(() => {
        setPage(1);
    }, [searchBook, searchId, searchCard, borrow])

    const onInputEnter = (e) => { 
        if (e.key === 'Enter') onSearch();
    }

    return <div className="container-80 pb-3">
        <div className="page-title">Danh sách phiếu mượn - trả</div>

        <div className="mb-3">
            <button className="btn btn-primary" onClick={() => setShowAddDialog(true)}>Mượn sách</button>
        </div>

        {showAddDialog && <AddBorrowDialog onExit={() => setShowAddDialog(false)} refresh={()=>setRefresh(x => !x)} />}
        {showReturnDialog && selectedItem && <ReturnBookDialog onExit={() => { setShowReturnDialog(false); }} id={selectedItem} refresh={() => setRefresh(x => !x)} />}

        <div className="mb-3">
            <div className="input-group me-2">
                <span className={`input-group-text btn ${searchById ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSearchById(true)}>Tìm mã phiếu</span>
                <input type="text" className="form-control me-5" placeholder='Nhập mã phiếu'
                    ref={searchIdRef} onKeyDown={onInputEnter} disabled={!searchById} />

                <span className={`input-group-text btn ${!searchById ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSearchById(false)}>Tìm mã sách</span>
                <input type="text" className="form-control" placeholder='Nhập mã sách'
                    ref={searchBookRef} onKeyDown={onInputEnter} disabled={searchById} />

                <span className={`input-group-text btn ${!searchById ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSearchById(false)}>Tìm mã thẻ</span>
                <input type="text" className="form-control me-5" placeholder='Nhập mã thẻ'
                    ref={searchCardRef} onKeyDown={onInputEnter} disabled={searchById} />

                <button className="btn btn-primary" onClick={onSearch}>Tra cứu</button>
            </div>

        </div>

        <div className='mb-3'>
            <label className={borrow ? 'btn btn-info me-3' : 'btn btn-outline-info me-3'} htmlFor='borrow'>Phiếu mượn</label>
            <input type="radio" id='borrow' name='borrow' checked={borrow} onChange={() => setBorrow(true)} hidden />
            <label className={!borrow ? 'btn btn-info' : 'btn btn-outline-info'} htmlFor='return'>Phiếu Trả</label>
            <input type="radio" id='return' name='borrow' checked={!borrow} onChange={() => setBorrow(false)} hidden />
        </div>

        { loading ? <div className="loader"></div> :
            (borrows && borrows.length > 0) ?
            <DataTable headers={headers} rows={rows} noEdit={!borrow} />
            : <p>Không tìm thấy kết quả nào</p>
        }

        <div>
            <input type="number" value={page} min={1} max={pageCount} onChange={(e) => setPage(e.target.value)} /> / {pageCount}
        </div>
    </div>
}

export default BorrowPage;