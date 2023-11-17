import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = ({ history }) => {

    const [datas, setDatas] = useState([]);
    
    useEffect(() => {
        axios.get(`https://cs8etiyohi.execute-api.ap-northeast-2.amazonaws.com/production/board`)
            .then(response => {
                console.log(JSON.parse(response.data.body));
                setDatas(JSON.parse(response.data.body));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 403) {
                    alert('접근 권한이 없습니다. 로그인 후 다시 접속해 주세요.');
                    history.push('/login');
                }                
            });
    }, []);

    return (
        <>
            <div className="container">
                <h2>게시판 목록</h2>
                <table className="board_list">
                    <colgroup>
                        <col width="15%" />
                        <col width="*" />
                        <col width="15%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">조회수</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="4">일치하는 데이터가 없습니다.</td>
                                </tr>
                            )
                        }
                        {
                            datas && datas.map(board => (
                                <tr key={board.board_idx}>
                                    <td>{board.board_idx}</td>
                                    <td className="title">
                                        <Link to={`/board/detail/${board.board_idx}`}>{board.title}</Link></td>
                                    <td>{board.hit_cnt}</td>
                                    <td>{board.created_dt}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Link to="/board/write" className="btn">글쓰기</Link>
            </div>
        </>
    );
};

export default BoardList;

