import styled from 'styled-components';
import React, { useEffect, useRef, useState } from "react";

const StyledPaginationWrapper = styled.div`
  .pagination > li > a,
  .pagination > li > span {
    color: #000;
    width:28px;
    height:28px;
    text-align:center;
    vertical-align:top;
    line-height:28px;
    display:block;
    font-size:14px;
    font-weight:600;
  }
  .pagination > .next > a > img {
    max-width: 14px;
  }

  .pagination > li{
    border: 1px solid #fff;
    border-radius:5px;
    cursor:pointer;
    margin:5px;
  }
  .pagination > li:hover a{
    color:#4674FE;
  }
  .pagination > li.active{
    border: 1px solid #4674FE;

  }
  .pagination > li.active a{
    color:#4674FE;
    font-weight:400;

  }

  .active > a,
  .active > a:focus,
  .active > a:hover,
  .active > span,
  .active > span:focus,
  .active > span:hover {
    color: #4674FE;
  }
  .pagination > li img{
    padding:8px 8px 0px;
  }
`;

export default function Pagenation(props) {


  function setpage(page){
    props.handlePageChange(page);
  }

  return (
    <StyledPaginationWrapper>
      <ul className={`pagination`}>
      {((page, itemsPerPage, number)=>{

        const pagearr=new Array();
        //현재 페이지를 기점으로 첫번째 페이지 찾기.
        let startpage=page-(page-1)%itemsPerPage;
        let lastpage=number%itemsPerPage>0 ? parseInt(number/itemsPerPage)+1: parseInt(number/itemsPerPage);
        //pagearr.push(<div>{lastpage}</div>);
        if(page==1){
          pagearr.push(<li class='prev' num='1' onClick={()=>setpage(1)}><img src={process.env.PUBLIC_URL + '/page_left_off.png'}/></li>)
        }
        else if(page<6){
          pagearr.push(<li class='prev' num='1' onClick={()=>setpage(1)}><img src={process.env.PUBLIC_URL + '/page_left.png'}/></li>)
        }
        else{
          pagearr.push(<li class='prev' num={startpage-1} onClick={()=>setpage(startpage-1)}><img src={process.env.PUBLIC_URL + '/page_left.png'}/></li>)
        }
        //setpageno(temppage);
        for(let i=0; i<5; i++){
          if(i+startpage>lastpage){
            break;
          }
          if(i+startpage==page){
            pagearr.push(<li onClick={()=>setpage(startpage+i)} num={startpage+i} class='active' ><a href='#'>{i+startpage}</a></li>)
        
          }
          else{  
            pagearr.push(<li onClick={()=>setpage(startpage+i)} num={startpage+i}><a href='#'>{i+startpage}</a></li>)
          }
        }
        if(lastpage==page){
          pagearr.push(<li class='next' onClick={()=>setpage(lastpage)}  num={lastpage} ><img src={process.env.PUBLIC_URL + '/page_right_off.png'}/></li>)
        
        }
        else if(lastpage<=startpage+4){
          
          pagearr.push(<li onClick={()=>{setpage(lastpage)}}  class='next' num={lastpage} ><img src={process.env.PUBLIC_URL + '/page_right.png'}/></li>)
        
        }else{
          pagearr.push(<li onClick={()=>setpage(startpage+5)}  class='next' num={startpage+5} ><img src={process.env.PUBLIC_URL + '/page_right.png'}/></li>)
        
        }

        return pagearr;
      })(props.page, props.itemsPerPage, props.number)}
</ul>
      {/*<Pagination
          activePage={props.page}
          itemsCountPerPage={props.itemsPerPage}
          totalItemsCount={props.number} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator의 페이지 범위
          onChange={props.handlePageChange} // 페이지 변경을 핸들링하는 함수
          activeClass={"active"}
          firstPageText={""}
          lastPageText={""}
          prevPageText={''}
          nextPageText={''}
          itemClassNext={2}/>*/}
    </StyledPaginationWrapper>
  )
}
