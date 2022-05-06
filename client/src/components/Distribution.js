import React, { useEffect, useState } from "react";
import axios from "axios";
import StyledDiv from '../styles/DistributionStyle';
import LootCard from "./LootCard";

const Distribution = () => {
  const [loot, setLoot] = useState([]);

  useEffect(() => {
    // load undistributed loot
    axios
      .get("http://localhost:8080/api/loot?undistributed=true")
      .then((resp) => {
        setLoot(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
    // allow drag and drop
    document.addEventListener('dragstart', dragStart);
    //  drop target
    document.addEventListener('dragover', dragOver);
    document.addEventListener('dragleave', dragLeave);
    document.addEventListener('drop', drop);
  }, []);

  function checkDropTarget(target) {
    // returns an element
    if(target.children && target.children.length >= 2 && target.children[1].className){
      if(target.children[1].classList.contains('box')){
        return target;
      }
    }
    if(target.parentNode.children && target.parentNode.children.length >= 2 && target.parentNode.children[1].className){
      if(target.parentNode.children[1].classList.contains('box')){
        return target.parentNode;
      }
    }
    return null;
  }

  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  }

  function dragOver(e) {
    e.preventDefault();
    var target = checkDropTarget(e.target);
    if(target) {
      target.classList.add('drag-over');
    }
  }

  function dragLeave(e) {
    var target = checkDropTarget(e.target);
    if(target) {
      target.classList.remove('drag-over');
    }
  }

  function drop(e) {
    var target = checkDropTarget(e.target);
    if(target) {
      target.classList.remove('drag-over');
      // get draggable element
      const id = e.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(id);
      // add to the drop target
      draggable.parentNode.removeChild(draggable);
      target.children[1].appendChild(draggable);
    }
  }

  return (
    <StyledDiv>
      <div className='need'>
        <h2>Need</h2>
        <div className='box'></div>
      </div>
      <div className='greed'>
        <h2>Greed</h2>
        <div className='box'></div>
      </div>
      <div className='undistributed'>
        <h2>Loot</h2>
        <div className='box'>
          {
            loot.map(item => {
              return (
                <div className='loot' draggable='true' key={item.loot_id} id={item.loot_id}>
                  <LootCard loot={item} />
                </div>
              );
            })
          }
        </div>
      </div>
    </StyledDiv>
  );
};

export default Distribution;
