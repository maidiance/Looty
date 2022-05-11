import React, { useEffect, useState } from "react";
import axios from "axios";
import StyledDiv from '../styles/ElectionStyle';
import LootCard from "./LootCard";

const Election = () => {
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

  /**
  * Checks if the target is one of the collection boxes
  * @param {Object} target - The target from the event.
  * @returns {Object} node - The Collection Box that is targeted or null
  */
  function checkDropTarget(target) {
    // checking need/greed box
    if(target.children && target.children.length >= 2 && target.children[1].className){
      if(target.children[1].classList.contains('box')){
        return target;
      }
    }
    // checking header box
    if(target.parentNode.children && target.parentNode.children.length >= 2 && target.parentNode.children[1].className){
      if(target.parentNode.children[1].classList.contains('box')){
        return target.parentNode;
      }
    }
    // checking loot item
    if(target.parentNode.classList && target.parentNode.classList.contains('lootItem')){
      var loot = target.parentNode.parentNode.parentNode.parentNode;
      if(loot.children && loot.children.length >= 2 && loot.children[1].className){
        if(loot.children[1].classList.contains('box')){
          return loot;
        }
      }
    }
    // didn't find a valid box for target
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

  function handleOptions() {
    const optionDiv = document.getElementById('options');
    optionDiv.classList.toggle('hidden');
  }

  return (
    <StyledDiv>
      <div className='gear' onClick={handleOptions}>⚙️</div>
      <div className='hidden options' id='options'>
        <div className='valueDisplay'>
          <input
            id='sellValue'
            name='valueDisplay'
            type='radio'
            value='sell'
          />
          <label for='sellValue'>Sell Value</label>
          <input
            id='buyValue'
            name='valueDisplay'
            type='radio'
            value='buy'
          />
          <label for='buyValue'>Buy Value</label>
        </div>
        <div className='coinDisplay'>
          <input
            id='gold'
            name='coinDisplay'
            type='radio'
            value='gold'
          />
          <label for='gold'>Gold</label>
          <input
            id='copper'
            name='coinDisplay'
            type='radio'
            value='copper'
          />
          <label for='copper'>Copper</label>
        </div>
      </div>
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

export default Election;
