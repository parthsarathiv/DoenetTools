import React, { useRef, useState, useEffect } from 'react';
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState, useRecoilState, selector } from "recoil";

const filterState = atom({
  key: "filterState",
  default: 'Show All',
});

const listAtom = atom({
  key: "listatom",
  default: [],
});

const filteredList = selector({
  key: 'filtered List',
  get: ({get}) => {
    const filter = get(filterState);
    const list = get(listAtom);

    switch(filter) {
      case 'Show Completed':
        return list.filter((item) => item.isCompleted)
      case 'Show Uncompleted':
        return list.filter((item) => !item.isCompleted)
      default:
        return list
    }
  },
});

let id = 0;
function getId(){
  return id++;
}

function TodoItem(props) {

  const [list, setList] = useRecoilState(listAtom);
  const index = list.findIndex((listitem) => listitem === props.item);

  const editText = (event) => {
    setList([...list.slice(0, index), {id: props.item.id, isCompleted: props.item.isCompleted, text: event.target.value}, ...list.slice(index+1)]);
  }

  const deleteItem = () => {
    setList([...list.slice(0, index), ...list.slice(index+1)]);
  }

  const toggleIsComplete = () => {
    setList([...list.slice(0, index), {id: props.item.id, isCompleted: !props.item.isCompleted, text: props.item.text}, ...list.slice(index+1)]);
  }

  return (
    <>
      <input type ="checkbox" checked = {props.item.isCompleted} onChange = {toggleIsComplete} />
      <input type = "text" value = {props.item.text} onChange = {editText} />
      <button onClick = {deleteItem}>X</button>
    </>
  );
}

function ListView() {
  const listItems = useRecoilValue(filteredList);
  return(
    <div>
      <ol>
        {listItems ? listItems.map((listItem) => (<li key = {listItem.id}><TodoItem item = {listItem} /></li>)) : "Add Items"}
      </ol>
    </div>
  );
}


function ItemCreator() { 
  const [inputValue, setInputValue] = useState('');
  const setListItems = useSetRecoilState(listAtom);

  const addItem = () => {
    setListItems((oldItems) => ([...oldItems, {id: getId(), isCompleted: false, text: inputValue}]));
    setInputValue('');
  }

  return(
    <>
      <input value = {inputValue} onChange = {(event) => setInputValue(event.target.value)} />
      <button onClick = {addItem}>Add</button>
    </>
  );
}

function Filter() {
  
  const [filter, setFilter] = useRecoilState(filterState);
  const updateFilter = (e) => {
    setFilter(e.target.value)
  }

  return(
    <>
      Filter
      <select onChange = {updateFilter}>
        <option value = 'Show All'>All</option>
        <option value = 'Show Completed'>Completed</option>
        <option value = 'Show Uncompleted'>Uncompleted</option>
      </select>
    <p>{filter}</p>
    </>
  )
}

export default function DoenetExampleTool(props) {
  return(
    <RecoilRoot>
      <Filter />
      <ListView />
      <ItemCreator />
    </RecoilRoot>
  );
}