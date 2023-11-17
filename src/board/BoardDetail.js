import axios from 'axios';
import { useEffect, useState } from 'react';

function BoardDetail({ match, history }) {
    const {boardIdx} = match.params;

    const [board, setBoard] = useState({});
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const handlerChangeTitle = e => setTitle(e.target.value);
    const handlerChangeContents = e => setContents(e.target.value);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/api/board/${boardIdx}`)
            .then(response => {
                setBoard(response.data);
                setTitle(response.data.title);
                setContents(response.data.contents);    
            })
            .catch(error => console.log(error));
    }, []);

    const handlerClickList = () => {
        history.push('/board');
    };

    const handlerClickUpdate = () => {
        axios.put(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/api/board/${board.boardIdx}`,
                    { "title": title, "contents": contents })
            .then(response => {
                if (response.data === 1) {
                    alert('정상적으로 수정되었습니다.');
                } else { 
                    alert('수정에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`수정에 실패했습니다. (${error.message})`);
                return;
            });
    };

    const handlerClickDelete = () => {
        axios.delete(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/api/board/${board.boardIdx}`)
            .then(response => {                                         
                if (response.data === 1) {                              
                    alert('정상적으로 삭제되었습니다.');
                    history.push('/board');
                } else { 
                    alert('삭제에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {                                           
                console.log(error);
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
    };

    return (
        <>
            <div className="container">
                <h2>게시판 상세</h2>
                <form action="" method="POST" id="frm" name="frm">
                    
                    <input type="hidden" name="boardIdx" />
                
                    <table className="board_detail">
                        <colgroup>
                            <col width="15%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="35%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">글번호</th>
                                <td>{board.boardIdx}</td>
                                <th scope="row">조회수</th>
                                <td>{board.hitCnt}</td>
                            </tr>
                            <tr>
                                <th scope="row">작성자</th>
                                <td>{board.createdId}</td>
                                <th scope="row">작성일</th>
                                <td>{board.createdDt}</td>
                            </tr>
                            <tr>
                                <th scope="row">제목</th>
                                <td colSpan="3">
                                    <input type="text" id="title" name="title" value={title} onChange={handlerChangeTitle} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="view_text">
                                    <textarea title="내용" id="contents" name="contents" value={contents} onChange={handlerChangeContents}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                
                <input type="button" id="list"   className="btn" value="목록으로" onClick={handlerClickList} />
                <input type="button" id="edit"   className="btn" value="수정하기" onClick={handlerClickUpdate} />
                <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickDelete} />
                
                {/*
                <!-- jQuery 라이브러리를 불러옴 -->
                <script src="https://code.jquery.com/jquery-3.6.1.js"></script>
                
                <!-- 각 버튼을 클릭했을 때 동작을 정의 -->
                <script>
                    // 문서 전체가 로딩되었을 때 실행되는 코드
                    $(function() {
                        // id 속성의 값이 list인 엘리먼트가 클릭되었을 때 동작을 정의
                        $('#list').on('click', function() {
                            location.href = 'openBoardList.do';
                        });
                        
                        $('#edit').on('click', function() {
                            let frm = $('#frm')[0];
                            frm.action = 'updateBoard.do';
                            frm.submit();
                        });
                        
                        $('#delete').on('click', function() {
                            let frm = $('#frm')[0];
                            frm.action = 'deleteBoard.do';
                            frm.submit();
                        });
                    });
                </script>		
                */}
            </div>
        </>
    );
}

export default BoardDetail;