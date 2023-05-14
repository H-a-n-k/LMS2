import { useEffect, useMemo, useRef, useState } from "react";
import useGlobalContext from "../contexts/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../utils/useFetch";
import DataTable from "../components/shared/data-table";

const LibCard = () => { 
    const [page, setPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [searchID, setSearchID] = useState('');
    const [active, setActive] = useState(true);
    const [searchByName, setSearchByName] = useState(false);

    //inputs control
    const searchNameRef = useRef('');
    const searchIDRef = useRef('');

    const { token } = useGlobalContext();
    const navigate = useNavigate();

    const cardObj = useMemo(() => {
        return {
            params: {
                id: searchID,
                name: searchName,
                page,
                active
            }        
        }
    }, [searchID, searchName, page, active])
    const { data: cards, loading } = useFetch('/card', cardObj, token)
    const { data: cardCount } = useFetch('/card/count', cardObj, token)
    
    const headers = ['Mã thẻ', 'Họ tên', 'Ngày sinh', 'Khóa', 'Khoa', 'Tình trạng', 'Ngày mở', 'Hạn'];
    const rows = cards?.map(x => { 
        const y = {};
        y.onRowSelected = () => { navigate('/BLibrary/LibCard/' + x.card_id);}
        y.rowData = ['#' + x.card_id, x.name, x.birth_date, x.school_year, x.department,
            x.active ? 'Hoạt động' : 'Tạm khóa', x.issue_date, x.expire_date]

        return y;
    });

    const pageCount = useMemo(() => Math.max(Math.ceil(cardCount / 20), 1), [cardCount])

    const onSearch = () => { 
        setSearchID(searchIDRef.current.value);
        setSearchName(searchNameRef.current.value);
    }

    const onInputEnter = (event) => { 
        if (event.key === 'Enter') { 
            onSearch();
        }
    }

    //reset page
    useEffect(() => { 
        setPage(1)
    }, [searchID, searchName, active])

    useEffect(() => {
        if (searchByName) searchIDRef.current.value = '';
        else searchNameRef.current.value = '';
    }, [searchByName])

    return <div className="libcard-page container-80 pb-3">
        <h3 className="page-title">Danh sách thẻ thư viện</h3>

        {/* <div>
            <button type="button" class="btn btn-primary mb-3">+ Thêm mới</button>
        </div> */}

        <div className="input-group mb-3">
            <span className={`input-group-text btn ${!searchByName ? 'btn-primary' : 'btn-secondary'}`} id="basic-addon1" onClick={() => setSearchByName(false)}>Tìm theo mã thẻ</span>
            <input type="text" className="form-control me-4" placeholder="Mã thẻ" aria-label="Username" aria-describedby="basic-addon1"
                ref={searchIDRef} onKeyDown={(e) => onInputEnter(e)} disabled={searchByName} />

            <span className={`input-group-text btn ${searchByName ? 'btn-primary' : 'btn-secondary'}`} id="basic-addon1" onClick={() => setSearchByName(true)}>Tìm theo tên</span>
            <input type="text" className="form-control me-4" placeholder="Tên" aria-label="Username" aria-describedby="basic-addon1"
                ref={searchNameRef} onKeyDown={(e) => onInputEnter(e)} disabled={!searchByName} />
            <button onClick={onSearch} className="btn btn-primary">Tra cứu</button>
        </div>

        <div className="m-row mb-3">
            <Link to={'/BLibrary/AddCard'}>
                <div className="btn btn-primary">+ Thêm mới</div>
            </Link>
            <div style={{flex: '1'}}></div>
            <div className="m-row mb-3 flex-center">
                <span className="badge bg-info p-2 text-dark">Tình trạng thẻ</span>
                <label htmlFor="active" className={active ? 'ms-3' :'ms-3 text-primary'}>Bị khóa</label>
                <div className="form-check form-switch ms-2">
                    <input className="form-check-input" type="checkbox" id="active" checked={active} onClick={() => setActive(x => !x)} />
                </div>
                <label htmlFor="active" className={active ? 'text-primary' : ''}>Hoạt động</label>
            </div>
        </div>

        <div>
            {
                loading ? <div className="loader"></div> :
                (cards && cards.length > 0) ? <DataTable headers={headers} rows={rows} />
                : <h3>Không tìm thấy</h3>
            }
        </div>
        <div className="pager">
            <input type="number" min={1} max={pageCount} value={page} onChange={e => setPage(e.target.value)} /> / {pageCount}
        </div>
    </div>
}

export default LibCard;