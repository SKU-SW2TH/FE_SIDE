import React, { useEffect, useState } from 'react';
import "../../styles/Community.css";
import "../../styles/Board.css";
import CommunitySideNav from "./CommunitySideNav";
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import eyeCommunity from '../../assets/images/eye-commu.png';
import thumb from '../../assets/images/thumb.png';
import chat from '../../assets/images/chat.png';
import neko from '../../assets/images/neko.png';
import Title from '../ReusableComponents/Title';
import axios from 'axios';

const Written = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchType, setSearchType] = useState('title+author');
  const [totalPages, setTotalPages] = useState(0);
  const [postsData, setPostsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem('meCurrentPage')) || 0;
  });
  const [activeSort, setActiveSort] = useState('createdAt');

  const getPostId = async () => {
    try {
      console.log("sortBy:" + sortBy);
      const response = await axios.get(`http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/me`, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
              page: currentPage
            }
        }
      );
      if(response.status==200){
        const posts = response.data.content;
      
        setTotalPages(response.data.totalPages);

        console.log(response.data);

        const formattedPosts = posts.map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          name: post.postAuthor.nickname,
          time: new Date(post.createdAt).toLocaleString(),
          like: post.likeCount,
          view: post.viewCount,
          reply: post.commentCount,
        }));

        console.log(formattedPosts);
        setPostsData(formattedPosts);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("게시글 ID 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    getPostId();
  }, [sortBy, currentPage]);


  const createMarkup = (htmlContent) => {
    const config = {
      ADD_TAGS: [],
      ADD_ATTR: ['src', 'alt', 'width', 'height']
    };
    return { __html: DOMPurify.sanitize(htmlContent, config) };
  };

  const handleSortChange = (sortType) => {
    console.log("정렬 방식 변경:", sortType);
    setSortBy(sortType);
    setCurrentPage(0);
    setActiveSort(sortType);
  };

  const handlePageChange = async (pageNumber) => {
    localStorage.setItem('meCurrentPage', pageNumber);
    setCurrentPage(pageNumber);
    await getPostId();
    window.location.reload();
  };

  const handleSearch = async () => {
    setCurrentPage(0);
    await getPostId();
  };

  return (
    <div className='container'>
      <CommunitySideNav/>
      <div>
        <p className='community-title'>작성한 게시글</p>
        <div className='board-edit'>
          {isLoading ? (
            <p></p>
          ) : postsData.length === 0 ? (
            <div className='neko-container'>
              <img src={neko} alt='네코' className='neko-img' />
              <p>게시글이 없습니다.</p>
            </div>
          ) : (
            <ul className="post-list">
              {postsData.map((post) => (
                <li className='post-container' key={post.id}>
                  <Link to={`/post/${post.id}`} className='article-link'>
                    <Title title={post.title} />
                    <div 
                      className='content'
                      dangerouslySetInnerHTML={createMarkup(post.content)}
                    />
                    <div className='discript'>
                      <span className='name-time'>
                        {post.name} {post.time}
                      </span>
                      <span className='like-view-reply'>
                        <span className='like'><img src={thumb} alt='좋아요' className='like-img'/>{post.like}</span>
                        <span className='view'><img src={eyeCommunity} alt='조회수' className='view-img' />{post.view}</span>
                        <span className='reply'><img src={chat} alt='댓글' className='reply-img' />{post.reply}</span>
                      </span>
                    </div>
                    <hr className='hr-length'/>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {postsData.length > 0 && (
          <div className="pagination">
            {(() => {
              const adjustedCurrentPage = currentPage + 1;
              const pageGroup = Math.ceil(adjustedCurrentPage / 5);
              const startPage = (pageGroup - 1) * 5 + 1;
              const endPage = Math.min(startPage + 4, totalPages);
              const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
              return (
                <>
                  <button onClick={() => handlePageChange(adjustedCurrentPage - 2)} disabled={adjustedCurrentPage === 1 || adjustedCurrentPage !== startPage}>
                    이전
                  </button>

                  {pagesToShow.map(number => (
                    <button 
                      key={number} 
                      onClick={() => {
                        handlePageChange(number-1);
                      }} 
                      className={number === adjustedCurrentPage ? 'active' : ''}
                      style={{ color: number === adjustedCurrentPage ? 'black' : 'lightgray' }}
                    >
                      {number}
                    </button>
                  ))}

                  <button onClick={() => handlePageChange(adjustedCurrentPage)} disabled={adjustedCurrentPage === totalPages || adjustedCurrentPage !== endPage}>
                    다음
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Written; 