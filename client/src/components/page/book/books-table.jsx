import { useNavigate } from "react-router-dom";
import { getBookCover } from "../../../mock-data";
import {convertToDMY} from '../../../utils/convertDate'
import DataTable from "../../shared/data-table";

const BooksTable = ({ bookList }) => { 
    
    const navigate = useNavigate();
    const headers = ['', 'Mã', 'Tên', 'Tác giả', 'Năm XB', 'NXB', 'Ngày thêm'];
    const rows = bookList.map(x => { 
        const y = {};
        y.onRowSelected = () => navigate(`/BLibrary/Book/${x.book_id}`);
        y.rowData = [<img src={getBookCover(x.book_id)} alt="" style={{ width: '100px' }} />,
            '#'+x.book_id, x.book_name, x.author, x.publishYr, x.publisher, convertToDMY(x.add_date)]

        return y;
    })

    return <DataTable headers={headers} rows={rows} />
}

export default BooksTable;