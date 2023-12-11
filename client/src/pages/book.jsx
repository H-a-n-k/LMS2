import BooksGrid from '../components/shared/books-grid';
import { useEffect, useMemo, useState } from 'react';
import CallApi from '../utils/callApi'
import { Link, useLocation } from 'react-router-dom';
import useGlobalContext from '../contexts/GlobalContext';
import BooksTable from '../components/page/book/books-table';
import useFetch from '../utils/useFetch';

const BookPage = () => { 

    const ItemPerPage = 20;

    const { state } = useLocation();
    const { search, selectCate } = state || {};
    const { token, role } = useGlobalContext();

    //STATES
    const [searchName, setSearchName] = useState(search || ''); //input controll
    const [keyword, setKeyword] = useState('' || search);  //input result -> keyword for query
    const [hint, setHint] = useState([]); //hint list
    const [showHint, setShowHint] = useState(false);
    const [searching, setSearching] = useState(false); //hint loading
    const [searchCol, setSearchCol] = useState('book_name');

    const [selectedCate, setSelectedCate] = useState(selectCate || -1);
    const [page, setPage] = useState(1);
    const [orderBy, setOrderBy] = useState('add_date');
    const [orderAsc, setOrderAsc] = useState(false);

    //book list
    const listObj = useMemo(() => {
        return {
            params: {
                cateId: selectedCate > 0 ? selectedCate : null,
                keyword,
                limit: ItemPerPage,
                page,
                orderBy,
                asc: orderAsc,
                searchCol
            }
        }
    }, [keyword, selectedCate, page, orderAsc, orderBy, searchCol]);
    const { data: list, loading } = useFetch('/book', listObj);

    //category
    const { data: categories } = useFetch('/category');

    //page count
    const bookCountObj = useMemo(() => {
        return {
            params: {
                keyword,
                cateId: selectedCate > 0 ? selectedCate : null,
                searchCol
            }
        }
    }, [keyword, selectedCate, searchCol]);
    const { data: bookCount } = useFetch('/book/count', bookCountObj);

    //search hint
    useEffect(() => { 
        let mounted = true;
        let timer;

        const fetchApi = async () => { 
            if (!searchName) return;

            setSearching(true);
            try {
                const resp = await CallApi.get('/book/searchHint', {
                    params: {
                        keyword: searchName,
                        cateId: selectedCate > 0 ? selectedCate : null,
                        searchCol
                    }
                })

                const data = await resp.data;
                if (mounted) setHint(data);
            } catch (err) {
                console.log(err);
            } finally { 
                setSearching(false);
            }
        }

        if (searchName.length > 0) {
            timer = setTimeout(fetchApi, 300);
        } else { 
            setHint([]);
        }

        return () => { 
            mounted = false;
            if (timer) clearTimeout(timer);
        }
    }, [searchName, selectedCate, searchCol])

    const getTotalPage = useMemo(() => { 
        return Math.max(Math.ceil(bookCount / ItemPerPage), 1);
    }, [bookCount])
    
    const onSearch = () => {
        setKeyword(searchName);
        setPage(1);
    }

    const onChangeCategory = (e) => {
        setSelectedCate(e.target.value);
        setPage(1);
    }

    const onSearchKeyDown = (e) => { 
        if (e.key === 'Enter') onSearch();
    }

    const onOrderChange = (e) => { 
        setOrderAsc(e.target.id === 'asc')
    }

    const onSearchOptChange = (e) => {
        setSearchCol(e.target.value);
        setSearchName('');
        setKeyword('');
    }

    const searchPlaceHolder = useMemo(() => {
        switch (searchCol) {
            case 'book_id': return 'Nhập mã sách';
            case 'author': return 'Nhập tên tác giả';
            default: return 'Nhập tựa sách';
        }
    }, [searchCol])

    return <div className="book-page">
        <h3 className="page-title">Tìm kiếm sách</h3>
        <div className="container-80">
            {token &&
                <Link to='/BLibrary/AddBook'>
                    <div className="add-book-btn mb-3">
                        + Thêm Sách
                    </div>
                </Link>
            }
        </div>
        <div className="tool-bar container-80">
            <div>
                <label htmlFor='searchName'>
                    <select value={searchCol} onChange={(e) => onSearchOptChange(e)} className='p-2 searchCol'>
                        <option value="book_name">Tìm tựa sách</option>
                        <option value="book_id">Tìm mã sách</option>
                        <option value="author">Tìm tác giả</option>
                    </select>
                </label>
                <div className="input-wrap">
                    <input type='text' id='searchName' maxLength={50} placeholder={searchPlaceHolder} value={searchName}
                        onChange={(e) => { setSearchName(e.target.value) }} onKeyDown={(e) => onSearchKeyDown(e)}
                        onFocus={() => setShowHint(true)} onBlur={() => setTimeout(() => setShowHint(false), 300)} />
                    
                    {searchName.length > 0 &&
                        <div className={'hints ' + (showHint?'':'hide')}>
                            {searching ? <div><i>Đang tìm...</i></div> :
                                hint.length > 0 &&
                                hint.map(x => <div className="hint" key={x} onClick={() => { setSearchName(x);}}>{x}</div>)
                            }
                        </div>
                    } 
                </div>
                <div className="btn" onClick={onSearch}>Tìm</div>
            </div>
            <div className='cate'>
                <label htmlFor='category'>
                    Thể loại:
                </label>
                <select onChange={e => onChangeCategory(e)} value={selectedCate} id='category'>
                    <option value={-1} key={-1}>Tất cả</option>
                    {categories?.map(x => <option value={x.cate_id} key={x.cate_id}>{x.cate_name}</option>)}
                </select>
            </div>

            <div className='sort'>
                <label>
                    Sắp xếp:
                </label>
                <select onChange={(e) => setOrderBy(e.target.value)} value={orderBy}>
                    <option value="add_date">Ngày thêm vào</option>
                    <option value="book_name">Tên sách</option>
                </select>
                <input type='radio' id='asc' name='orderby' checked={orderAsc} onChange={onOrderChange} hidden/>
                <label htmlFor='asc'>Tăng dần</label>
                <input type='radio' id='desc' name='orderby' checked={!orderAsc} onChange={onOrderChange} hidden/>
                <label htmlFor='desc'>Giảm dần</label>
            </div>
        </div>
        <div className="container-80">
            {loading ? <div className="loader"></div> : list && list.length > 0 ? 
                role === 'EMP' ?
                    <BooksTable bookList={list} />
                    :
                    <BooksGrid bookList={list} nCol={5} />
                :
                <h3>Không tìm thấy thấy theo tiêu chí của bạn</h3>
            }
            <div className="pager">
                Trang <input type="number" max={getTotalPage} min={1} value={page} onChange={(e) => setPage(e.currentTarget.value)} /> / {getTotalPage}
            </div>
        </div>
    </div>
}

export default BookPage