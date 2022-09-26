import React from "react";
import previous from "./Images/previous.png"
import next from "./Images/next.png"


function Paging({ page, setPage, pageInput, setPageInput, maxPages }){
  const nextPage= ()=> {
    setPage(Number(page) + 1)
    setPageInput(Number(page) + 1)
  }

  const previousPage= ()=> {
    setPage(Number(page) - 1)
    setPageInput(Number(page) - 1)
  }

  const onKeyDown= (e)=> {
    if (e.keyCode === 13){
      if (
        Number(e.target.value < 1) ||
        Number(e.target.value > maxPages) ||
        isNaN(Number(e.target.value))
      ){
        setPageInput(1)
        setPage(1)
      } else {
        setPageInput(e.target.value)
      }
    }
  }

  const onChange= (e)=> {
    setPageInput(e.target.value)
  }

  return (
    <div className="pag-container">
      <br/>
      <button 
        className="paging-buttons" 
        // disable={pageInput <=1} 
        onClick={previousPage}
        >
        <img src={previous} alt="button not found" width="20px" height="25px"/>
      </button>
      <input
        className="pag-input"
        onChange={(e)=> onChange(e)}
        onKeyDown= {(e)=> onKeyDown(e)}
        name= "page"
        value= {pageInput}
      />
      <p className="text">de {maxPages}</p>
      <button 
        className="paging-buttons" 
        // disabled= {page >= maxPages} 
        onClick={nextPage}
        >
        <img src={next} alt="button not found" width="20px" height="25px"/>
      </button>
    </div>

  )
}

export default Paging;
