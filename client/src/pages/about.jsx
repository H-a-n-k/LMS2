import BG from '../resources/imgs/about-bg.png';
import Star from '../resources/imgs/about-star.png';
import Eye from '../resources/imgs/about-eye.png';
import Rule1 from '../resources/imgs/about-rule-1.png';
import Rule2 from '../resources/imgs/about-rule-2.png';
import Rule3 from '../resources/imgs/about-rule-3.png';
import Rule4 from '../resources/imgs/about-rule-4.png';

const AboutPage = () => { 
    return <div className="about-page">
        <div className="bg">
            <div>
                <span className="logo">
                    <img src={Star} alt="" />
                    B HUFLIT
                </span>
                <div className="content">
                    <div className="left">
                        <div className="welcome">Chào mừng bạn <br /> đến với thư viện!</div>
                        <br />
                        <p>
                            Thư viện B của Trường Đại học Ngoại ngữ – Tin học Thành phố Hồ Chí Minh  - HUFLIT - được thành
                            lập cùng với sự ra đời của trường. Ngày nay công nghệ thông tin phát triển mạnh, tài liệu điện
                            tử đang dần chiếm ưu thế hơn, vì vậy Thư viện trang bị phần mềm quản lý thư viện điện tử và đang
                            lên kế hoạch để đưa trang thư viện lên internet.
                        </p>
                        <div className="btn">XEM THÊM</div>
                    </div>
                    <div className="right">
                        <img src={BG} alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div className='regulation'>
            <div className="header pointer pill">
                <span>
                    <img src={Eye} alt="" />
                    Quy định
                </span>
            </div>

            <div className="rules">
                <div className="rule">
                    <div className="icon">
                        <img src={Rule1} alt="" />
                    </div>
                    <div className="title">
                        Quy định 1
                    </div>
                    <p>
                        Độc giả chỉ được mượn cùng lúc tối đa 3 quyển sách. Nếu muốn mượn thêm phải trả sách trước.
                    </p>
                </div>

                <div className="rule">
                    <div className="icon">
                        <img src={Rule2} alt="" />
                    </div>
                    <div className="title">
                        Quy định 2
                    </div>
                    <p>
                        Sách muộn quá 7 ngày được xem là đã mất và không thể trả được nữa.
                    </p>
                </div>

                <div className="rule">
                    <div className="icon">
                        <img src={Rule3} alt="" />
                    </div>
                    <div className="title">
                        Quy định 3
                    </div>
                    <p>
                        Muộn sách bị phạt 15k, hỏng phạt 30k, mất phạt 35k
                    </p>
                </div>

                <div className="rule">
                    <div className="icon">
                        <img src={Rule4} alt="" />
                    </div>
                    <div className="title">
                        Quy định 4
                    </div>
                    <p>
                        Khi bị phạt thẻ thư viện tạm thời bị khóa (không thẻ mượn sách) đến khi đóng phạt
                    </p>
                </div>
            </div>
        </div>
    </div>
}

export default AboutPage