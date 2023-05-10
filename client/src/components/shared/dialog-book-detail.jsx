import DialogWrapper from "./dialog-wrapper";
import CateIcon from '../../resources/imgs/book_cate_icon.png'
import AuthorIcon from '../../resources/imgs/book_author_icon.png'
import PubIcon from '../../resources/imgs/book_publisher_icon.png'
import YearIcon from '../../resources/imgs/book_year_icon.png'
import DateIcon from '../../resources/imgs/book_adddate_icon.png'
import { getBookCover } from "../../mock-data";
import useFetch from '../../utils/useFetch';
import { convertToDMY } from "../../utils/convertDate";

const BookDetailDialog = ({ book, onExit }) => { 

    const { data: category } = useFetch('/category/detail/' + book.cate_id);

    return <DialogWrapper onClickOut={onExit}>
        <div className="book-detail-dialog">
            <div className="header">Thông Tin Sách</div>
            <h2>{book.book_name} #{book.book_id}</h2>
            <div className="desc">{book.summary}</div>
            <div className="info">
                <div className="left">
                    <p>
                        <img src={CateIcon} alt="" />
                        Thể Loại: {category}
                    </p>
                    <p>
                        <img src={AuthorIcon} alt="" />
                        Tác Giả: {book.author}
                    </p>
                    <p>
                        <img src={PubIcon} alt="" />
                        Nhà Xuất Bản: {book.publisher}
                    </p>
                    <p>
                        <img src={YearIcon} alt="" />
                        Năm Xuất Bản: {book.publishYr}
                    </p>
                    <p>
                        <img src={DateIcon} alt="" />
                        Ngày Thêm: {convertToDMY(book.add_date)}
                    </p>
                </div>
                <div className="right">
                    <img src={getBookCover(book.book_id)} alt="" />
                </div>
            </div>
            <div className="exit" onClick={onExit}>x</div>
        </div>
    </DialogWrapper>
}

export default BookDetailDialog;