import { useState } from "react";
import axios from 'axios';

const BoardWrite = ({ history }) => {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const handlerChangeTitle = e => setTitle(e.target.value);
    const handlerChangeContents = e => setContents(e.target.value);

    const handlerSubmit = e => {
        e.preventDefault();

        axios.post(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/api/board/write`, { title, contents })
            .then(response => {
                if (response.data === '정상처리') {
                    alert('게시글이 정상적으로 등록되었습니다.');
                    history.push('/board');
                } else {
                    alert('게시글 등록에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`게시글 등록에 실패했습니다. (${error.message})`);
                return;
            });
    };

    return (
        <>
            <div className="container">
                <h2>게시판 등록</h2>
                <form id="frm" name="frm" onSubmit={handlerSubmit}>
                    <table className="board_detail">
                        <tbody>
                        <tr>
                            <td>제목</td>
                            <td><input type="text" id="title" name="title" value={title} onChange={handlerChangeTitle} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><textarea id="contents" name="contents" value={contents} onChange={handlerChangeContents}></textarea></td>
                        </tr>
                        </tbody>
                    </table>
                    <input type="submit" id="submit" value="저장" className="btn" />
                </form>		
            </div>
        </>
    );
};

export default BoardWrite;
