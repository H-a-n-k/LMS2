import useFetch from '../utils/useFetch';
import DataTable from '../components/shared/data-table';
import { useNavigate } from 'react-router-dom';

const StaffPage = () => {

    const navigate = useNavigate();

    const { data: emps, loading } = useFetch('/emp/');
    const headers = ['Tên', 'SĐT', 'Email', 'Tài khoản', 'Trạng thái'];
    const rows = emps?.map(x => { 
        return {
            onRowSelected: () => navigate('/BLibrary/UpdateEmp/'+x.id),
            rowData: [x.name, x.phone, x.email, x.username, x.active ? 'Hoạt động' :'Khóa']
        }
    })

    return <div className="container-80">
        <div className="page-title">Danh sách thủ thư</div>
        
        <div className='mb-3'>
            <div className="btn btn-primary" onClick={()=> navigate('/BLibrary/AddEmp/')}>Thêm mới</div>
        </div>
        {loading ? <div className="loader"></div> :
            emps && emps.length ? <DataTable headers={headers} rows={rows} /> : 
                <p><i>Không tìm thấy</i></p>    
        }
    </div>
}

export default StaffPage;