import { useMemo, useState } from 'react'
import FrmAddCate from '../components/page/category/frm-add-cate'
import useGlobalContext from '../contexts/GlobalContext'
import CategoriesGrid from '../components/shared/categories-grid'
import BG from '../resources/imgs/cate_bg.png'
import { useNavigate } from 'react-router-dom'
import useFetch from '../utils/useFetch'

const CategoryPage = () => {
    const [showFrmAdd, setShowFrmAdd] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const listObj = useMemo(() => { return refresh }, [refresh]);
    const { data: list, loading } = useFetch('/category', listObj);

    const { token, role } = useGlobalContext();

    const navigate = useNavigate();

    const showFrm = () => {
        //if (!token) return;
        setShowFrmAdd(true);
    }

    const onAdd = () => {
        setSelectedItem({});
        showFrm();
    }

    const selectCate = (id) => { 
        navigate('/BLibrary/Book', { state: { selectCate: id } });
    }

    return (token && role === 'EMP') ? <div className='category-page'>
        {showFrmAdd && <FrmAddCate setShow={setShowFrmAdd} item={selectedItem} setRefresh={setRefresh} />}
        <div className="container-80">
            <div className="header">
                <div className="title">Danh Sách Thể Loại</div>
                <div className="btn btn-add" onClick={onAdd}>
                    THÊM
                </div>
            </div>

            {loading && <div className="loader"></div>}
            <CategoriesGrid list={list} onSelect={(x) => { setSelectedItem(x); showFrm(); }} />
        </div>
    </div> : <div className="category-page">
            <div className="content">
                <div className="left">
                    <div className="header">
                        <div className="title">Các thể loại sách có trong B - Library</div>
                    </div>

                    {loading && <div className="loader"></div>}
                    <CategoriesGrid list={list} nCol={4} onSelect={(x) => selectCate(x.cate_id)} />
                </div>
                <div className="right">
                    <img src={BG} alt="" />
                </div>
            </div>
    </div>
}

export default CategoryPage;
