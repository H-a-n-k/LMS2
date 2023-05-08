
const booksData = [
    {
        book_id: 1, image: require('./resources/imgs/img_1.png'),
        title: 'Trong đáy mắt trời xanh là vĩnh viễn viễn viễn',
        author: 'Xuân Quỳnh',
        categoryID: 3,
        summary: 'Có rất nhiều biến thể của Lorem Ipsum mà bạn có thể tìm thấy, nhưng đa số được biến đổi bằng cách thêm các yếu tố hài hước, các từ ngẫu nhiên có khi không có vẻ gì là có ý nghĩa. Nếu bạn định sử dụng một đoạn Lorem Ipsum, bạn nên kiểm tra kĩ để chắn chắn là không có gì nhạy cảm được giấu ở giữa đoạn văn bản. Tất cả các công cụ sản xuất văn bản mẫu Lorem Ipsum đều được làm theo cách lặp đi lặp lại các đoạn chữ cho tới đủ thì thôi, khiến cho lipsum.com trở thành công cụ sản xuất Lorem Ipsum đáng giá nhất trên mạng. Trang web này sử dụng hơn 200 từ la-tinh, kết hợp thuần thục nhiều cấu trúc câu để tạo ra văn bản Lorem Ipsum trông có vẻ thật sự hợp lí. Nhờ thế, văn bản Lorem Ipsum được tạo ra mà không cần một sự lặp lại nào, cũng không cần chèn thêm các từ ngữ hóm hỉnh hay thiếu trật tự.' 
    },
    {
        book_id: 2, image: require('./resources/imgs/img_2.png'), title: 'Những tấm lòng cao cả', author: 'Edmondo De Amicis', categoryID: 3 },
    {
        book_id: 3, image: require('./resources/imgs/img_3.png'), title: 'Đừng lựa chọn an nhàn khi còn trẻ', author: 'Cảnh Thiên', categoryID: 3 },
    {
        book_id: 4, image: require('./resources/imgs/img_4.png'), title: 'Tuổi trẻ đáng giá bao nhiêu', author: 'Rosie Nguyễn', categoryID: 1 },
    {
        book_id: 5, image: require('./resources/imgs/img_5.png'), title: 'Kiếp nào ta cùng tìm thấy nhau', author: 'Brian L. Weiss', categoryID: 1 },
    {
        book_id: 6, image: require('./resources/imgs/img_6.png'), title: 'Mật mã thần số học', author: 'Glynis Mccants', categoryID: 2 }
]

const CategoriesData = [
    { categoryID: 1, nameCategory: 'Truyền cảm hứng' },
    { categoryID: 2, nameCategory: 'Giải trí' },
    { categoryID: 3, nameCategory: 'Lịch sử' },
    { categoryID: 4, nameCategory: 'Giáo trình' },
    { categoryID: 5, nameCategory: 'Truyện ngắn' },
    { categoryID: 6, nameCategory: 'Tiểu sử' },
    { categoryID: 7, nameCategory: 'Giả tưởng' },
    { categoryID: 8, nameCategory: 'Tình cảm' },
    { categoryID: 9, nameCategory: 'Văn học' },
    { categoryID: 10, nameCategory: 'Kinh dị' }
]

const BookCopyData = [
    { copy_id: 'cp001', book_id: 1, state_id: 0, note: 'noted' },
    { copy_id: 'cp002', book_id: 2, state_id: 0, note: 'noted' },
    { copy_id: 'cp003', book_id: 3, state_id: 0, note: 'noted' },
    { copy_id: 'cp004', book_id: 4, state_id: 0, note: 'noted' },
    { copy_id: 'cp005', book_id: 5, state_id: 0, note: 'noted' },
    { copy_id: 'cp006', book_id: 6, state_id: 0, note: 'noted' },

    { copy_id: 'cp007', book_id: 1, state_id: 1, note: '' },
    { copy_id: 'cp008', book_id: 2, state_id: 1, note: '' },
    { copy_id: 'cp009', book_id: 3, state_id: 1, note: '' },
    { copy_id: 'cp010', book_id: 4, state_id: 1, note: '' },
    { copy_id: 'cp011', book_id: 5, state_id: 1, note: '' },
    { copy_id: 'cp012', book_id: 6, state_id: 1, note: '' },

    { copy_id: 'cp013', book_id: 2, state_id: 2, note: '' },
    { copy_id: 'cp014', book_id: 4, state_id: 2, note: '' },
    { copy_id: 'cp015', book_id: 6, state_id: 2, note: '' },

    { copy_id: 'cp016', book_id: 2, state_id: 3, note: '' },
    { copy_id: 'cp017', book_id: 3, state_id: 3, note: '' },
    { copy_id: 'cp018', book_id: 5, state_id: 3, note: '' }
]

const getBookCover = (img, w=123, h=184) => { 
    return `https://picsum.photos/seed/${img}/${w}/${h}`
}

export { booksData, CategoriesData, BookCopyData ,getBookCover }