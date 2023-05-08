import { useEffect, useState } from "react";
import { CallApiWithToken } from "../utils/callApi";
import useGlobalContext from "../contexts/GlobalContext";

const StaffPage = () => {
    const [staffs, setStaffs] = useState([]);

    const { token } = useGlobalContext();

    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            try {
                const resp = await CallApiWithToken(token).get('/staffs');
                const data = resp.data;
                if (mounted) setStaffs(data);
            } catch (err) { 
                console.log(err);
            }
        }

        if (mounted) fetchApi();

        return () => { 
            mounted = false;
        }
    }, [token])

    return <div className="staff-page">
        <h2>Danh sách : </h2>
        <ol>
            {staffs.map(x => <li key={x.id}>
                <ul>
                    <li>Tên: {x.fullName}</li>
                    <li>Tài khoản: {x.userName}</li>
                    <li>Giới tính: {x.sex}</li>
                    <li>Địa chỉ: {x.address}</li>
                    <li>Ngày sinh: {x.birthday}</li>
                    <li>Ngày tạo: {x.startProfile}</li>
                    <hr />
                </ul>
            </li>)}
        </ol>
    </div>
}

export default StaffPage;