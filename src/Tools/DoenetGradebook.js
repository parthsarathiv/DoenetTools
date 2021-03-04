import React, { useEffect, useRef, useState, Suspense } from "react"
import styled from 'styled-components'
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce} from 'react-table'
import {
    atom,
    RecoilRoot,
    useSetRecoilState,
    useRecoilState,
    useRecoilValue,
    selector,
    atomFamily,
    selectorFamily,
    useRecoilValueLoadable,
    useRecoilStateLoadable,
  } from "recoil";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    useHistory
} from "react-router-dom";

import Tool, { openOverlayByName } from "../imports/Tool/Tool";
import { useMenuPanelController } from "../imports/Tool/MenuPanel";
import GlobalFont from "../fonts/GlobalFont.js";

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import { getCourses_CI, setSelected_CI, updateCourses_CI } from "../imports/courseInfo";

// React Table Styling
const Styles = styled.div`
  padding: 1rem;

  table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid gray;
    
    thead {
        border-bottom: 1px solid gray;
    }

    
    a {

        color: inherit;
        text-decoration: none;
    }

    .sortIcon {
        padding-left: 4px;
    }

    tbody tr:nth-child(even) {background: #CCC}
    tbody tr:nth-child(odd) {background: #FFF}

    td:first-child {
        text-align: left;
        max-width: 15rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    th {
        position: sticky;
        top: 0;
        background: white;
        user-select: none;
        max-width: 4rem;
        //word-wrap: break-word;
        padding: 2px;
        max-height: 10rem;
    }

    th:first-child {
        vertical-align: bottom;
        max-width: 15rem;

        p {
            margin: 5px;
        }
    }


    th > p {
        height: 100%;
    }
    th:not(:first-child) > p{
        writing-mode: vertical-rl;
        text-align: left;
        transform: rotate(180deg);

    }


    td {
        user-select: none;
        text-align: center;
        max-width: 5rem;
    }

    td, th {
        border-right: 1px solid gray;

        :last-child {
            border-right: 0;
        }
    }
  }
`

const courseId = atom({
    key: "courseId",
    default: ""
})

const coursesDataQuerry = atom({
    key: "coursesDataQuerry",
    default: selector({
        key: "coursesDataQuerry/Default",
        get: async () => {
            try{
                const { data } = await axios.get('/api/loadUserCourses.php')
                return data
            }catch(error){
                console.log("Error loading users course list", error.message);                
                return {}
            }
        }
    })
})

const coursesData = selector({
    key: 'coursesData',
    get: ({get}) => {
        let data = get(coursesDataQuerry)
        return data;   
    }
})

const assignmentDataQuerry = atom({
    key: "assignmentDataQuerry",
    default: selector({
        key:"assignmentDataQuerry/Default",
        get: async ({get}) => {
            try{
                const courseIdPayload = {params: { courseId:get(courseId)}}
                const { data } = await axios.get('/api/loadAssignments.php', courseIdPayload)
                
                return data
            }catch(error){
                console.log("No assignments associated with course ID: ", get(courseId));
                return {};
            }
        }
    })
})

const assignmentData = selector({
    key: "assignmentData",
    get: ({get}) => {
        let assignmentArray = {};
        let data = get(assignmentDataQuerry)
        
        for(let row of data){
            let [assignmentId, assignmentName] = row;
            assignmentArray[assignmentId] = assignmentName;
        }
        return assignmentArray
    },
    set: ({set, get}, newValue)=>{
        console.log("New Value: ", newValue);
    }
})


const studentDataQuerry = atom({
    key: "studentDataQuerry",
    default: selector({
        key: "studentDataQuerry/Default",
        get: async ({get}) => {
            const courseIdPayload = {params: { courseId:get(courseId)}}
            try{
                const { data } = await axios.get('/api/loadGradebookEnrollment.php', courseIdPayload)
                return data;
            }catch(error){
                console.log("No students associated with course ID: ", get(courseId), error);
                return {};
            }
        }
    })
})

const studentData = selector({
    key: "studentData",
    get: ({get}) => {
        let data = get(studentDataQuerry)
        let students = {}

        for(let row of data){
            let [userId,
                firstName,
                lastName,
                courseCredit,
                courseGrade,
                overrideCourseGrade] = row
            students[userId] = {
                firstName,
                lastName,
                courseCredit,
                courseGrade,
                overrideCourseGrade,
            }; 
        }
        return students;
    }
})


const overViewDataQuerry = atom({
    key:"overViewDataQuerry",
    default: selector({
        key: "overViewDataQuerry/Default",
        get: async ({get}) =>{
            try{
                const courseIdPayload = {params: { courseId:get(courseId)}}
                let { data } = await axios.get('/api/loadGradebookOverview.php', courseIdPayload)
                return data
            }catch(error){
                console.log("Error loading overview data for courdse ID: ", get(courseId), error.message);
                return {};
            }
        }
    })
})

const overViewData = selector({
    key: "overViewData",
    get: ({get}) =>{
        const students = get(studentData)
        const assignments = get(assignmentData)

        let overView = {}

        for(let userId in students){
            overView[userId] = {
                grade: students[userId].courseGrade,
                assignments: {},
            }

            for(let assignmentId in assignments){
                overView[userId].assignments[assignmentId] = null;
            }
        }

        let data = get(overViewDataQuerry)

        for(let userAssignment in data){
            let [assignmentId,
                assignmentName,
                credit,
                userId] = data[userAssignment]
            overView[userId].assignments[assignmentId] = credit
        }

        return overView
    }
})

const attemptDataQuerry = atomFamily({
    key: "attemptDataQuerry",
    default: selectorFamily({
        key:"attemptDataQuerry/Default",
        get: (assignmentId) => async () => {
            try {
                let assignmentIdPayload = { params: { assignmentId: assignmentId } };
                let { data } = await axios.get('/api/loadGradebookAssignmentAttempts.php', assignmentIdPayload)
                return data
            }catch(error){
                console.log("Error loading attempts data for assignmentId: ", assignmentId, error.message);
                return {}
            }
        }
    })
})

const attemptData = selectorFamily({
    key: "attemptData",
    get: (assignmentId) => ({get}) => {

        let attempts = {}

        const students = get(studentData);

        for(let userId in students){
            attempts[userId] = {
                credit: null,
                attempts: {}
            }
        }

        let data = get(attemptDataQuerry(assignmentId))

        for(let row of data){
            let [userId,
                attemptNumber,
                assignmentCredit,
                assignmentCreditOverride,
                attemptCredit,
                attemptCreditOverride
                ] = row;

            attempts[userId].credit = assignmentCredit
            attempts[userId].attempts[attemptNumber] = attemptCredit;
        }

        return attempts;
    }
})

const specificAttemptDataQuerry = atomFamily({
    key: "specificAttemptDataQuerry",
    default: selectorFamily({
        key: "specificAttemptDataQuerry/Default",
        get: (params) => async ({get}) => {
            try{
                let assignmentAttemptPayload = { params: params }
                console.log("payload: ", assignmentAttemptPayload);
                
                let { data } = await axios.get('/api/loadAssignmentAttempt.php',assignmentAttemptPayload)
                
                return data
            }catch(error){
                console.log("Error loading specific attempt data for assignmentId: ", assignmentId, error.message);
                return {}
            }
        }
    })
})

const specificAttemptData = selectorFamily({
    key: 'specificAttemptData',
    get: (params) => ({get}) => {
        let data = get(specificAttemptDataQuerry(params))
        //console.log("debug data: ", data.assignmentAttempted);

        let specificAttempt = {
            assignmentAttempted: data.assignmentAttempted,
            doenetML: data.doenetML,
            stateVariables: data.stateVariables,
            variant: data.variant,
            assignmentCredit: data.assignmentCredit,
            assignmentCreditOverride: data.assignmentCreditOverride,
            attemptCredit: data.attemptCredit,
            attemptCreditOverride: data.attemptCreditOverride,
            timestamp: data.timestamp
        }

        return specificAttempt;
    }
})

// Table Component
function Table({ columns, data }) {

    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
            return rows.filter(row => {
                const rowValue = row.values[id];
                return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true;
            });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );
    

    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,
    } = useTable({
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },  
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy, // useGlobalFilter
    )
  
    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <p>{column.render('Header')}</p>
                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                    <span className = "sortIcon"> 
                        {column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />) : <FontAwesomeIcon icon={faSort} />}
                    </span>
                    </th>
                    ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

function gradeSorting(a, b, columnID){
    const order = { '+': -1, '-': 1, undefined: 0 };
    const ga = a.cells[9].value
    const gb = b.cells[9].value

    if ((ga == null || ga == '') && (gb == null || gb == '')){
        return 0
    }

    else if (ga == null || ga == ''){
        return 1
    }

    else if (gb == null || gb == ''){
        return -1
    }

    return ga[0].localeCompare(gb[0]) || order[ga[1]] - order[gb[1]];
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
        value={filterValue || ''}
        onChange={e => {
            setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
        />
    )
}

function GradebookOverview(props) {
    let overviewTable = {}
    overviewTable.headers=[{
        Header: "Name",
        accessor: "name",
    },];

    let assignments = useRecoilValueLoadable(assignmentData);
    //let assignments = { contents: {}}

    if(assignments.state == 'hasValue'){
        for(let assignmentId in assignments.contents){
            overviewTable.headers.push({
                Header: <Link to={`/assignment/?assignmentId=${assignmentId}`}>{assignments.contents[assignmentId]}</Link>,
                accessor: assignmentId,
                disableFilters: true
            })
        }
    }

    overviewTable.headers.push(
        {
            Header: "Weighted Credt",
            accessor: "weight",
            disableFilters: true
            
        }
    )
    overviewTable.headers.push(
        {
            Header: "Grade",
            accessor: "grade",
            sortType: gradeSorting,
            disableFilters: true
        },
    )

    overviewTable.rows = []
    
    let students = useRecoilValueLoadable(studentData)
    //let students = { state:'hasError', contents: {}}
    let overView = useRecoilValueLoadable(overViewData)
    //let overView = { state:'hasError', contents: {}}

    if(students.state == 'hasValue'){
        for (let userId in students.contents) {
            
            let firstName = students.contents[userId].firstName,
                lastName = students.contents[userId].lastName,
                credit = students.contents[userId].courseCredit,
                generatedGrade = students.contents[userId].courseGrade,
                overrideGrade = students.contents[userId].overrideCourseGrade;

            let grade = overrideGrade ? overrideGrade : generatedGrade

            let row = {}

            row["name"] = firstName + " " + lastName
            
            if(overView.state == 'hasValue' && assignments.state == 'hasValue'){
                for (let assignmentId in assignments.contents) {
                    row[assignmentId] = (overView.contents[userId].assignments[assignmentId]) * 100 + "%"
                }
            }

            row["weight"] = credit
            row["grade"] = grade

            
            overviewTable.rows.push(row);
        }
    }

    //console.log("debug overviewtable", overviewTable);
    

    return (
        <Styles>
            <Table columns = {overviewTable.headers} data = {overviewTable.rows}/>
        </Styles>
    )

}

function GradebookAssignmentView(props){
    let assignmentId = props.assignmentId
    let assignmentsTable = {}
    let attempts = useRecoilValueLoadable(attemptData(assignmentId))
    let students = useRecoilValueLoadable(studentData)

    let maxAttempts = 0;

    if(attempts.state == 'hasValue'){
        for (let userId in attempts.contents) {
            let len = Object.keys(attempts.contents[userId].attempts).length;
    
            if (len > maxAttempts) maxAttempts = len;
        }
    }

    assignmentsTable.headers = [
        {
            Header: "Student",
            accessor: "student",
        }
    ];

    for (let i = 1; i <= maxAttempts; i++) {
        assignmentsTable.headers.push(
        {
            Header: "Attempt " + i,
            accessor: "a"+i,
            disableFilters: true
        })
    }

    assignmentsTable.headers.push({
        Header: "Assignment Grade",
        accessor: "grade",
        disableFilters: true
    })

    assignmentsTable.rows = [];
    
    if(students.state == 'hasValue'){
        for (let userId in students.contents) {
            let firstName = students.contents[userId].firstName;
            let lastName = students.contents[userId].lastName;
            
            let row = {};
    
            row["student"] = firstName + " " + lastName
    
            if(attempts.state == 'hasValue'){
                for (let i = 1; i <= maxAttempts; i++) {
                    let attemptCredit = attempts.contents[userId].attempts[i];
        
                    row[("a"+i)] = 
                    <Link to={`/attempt/?assignmentId=${assignmentId}&userId=${userId}&attemptNumber=${i}`}>
                    {
                        attemptCredit ? attemptCredit * 100 + "%" : "" // if attemptCredit is `undefined`, we still want a table cell so that the footer column still shows up right.
                    }
                    </Link>
                }

                row["grade"] = attempts.contents[userId].grade ? attempts.contents[userId].grade : ""
            }
    
            
            
            assignmentsTable.rows.push(row);
        }
    }

    return(
        <Styles>
            <Table columns = {assignmentsTable.headers} data = {assignmentsTable.rows}/>
        </Styles>
    )

}

function GradebookDoenetMLView(props){
    let assignmentId = props.assignmentId;
    let userId = props.userId;
    let attemptNumber = props.attemptNumber;
    let specificAttempt = useRecoilValueLoadable(specificAttemptData({assignmentId, userId, attemptNumber}))
    if(specificAttempt.state == 'hasValue'){
        return(<div>
            <p>{specificAttempt.contents.doenetML}</p>
        </div>)
    }else{
        return(<>
            <p>{specificAttempt.state}</p>
        </>)
    }
}

function CourseSelector(props){
    
    return(<select onChange = {(event) => props.callback(event.target.value)}>
        <option value = ''>Select Course</option>
        {props.courseList.map((course, i) => <option key = {i} value = {course.courseId}>{course.longname}</option> )}
    </select>)
}

export default function DoenetGradebook(props){

    let [courseIdVal, setCourseIdVal] = useRecoilState(courseId);
    let courseList = useRecoilValueLoadable(coursesData);

    return (
        <Router basename="/gradebook">
            <Tool>
                <headerPanel title="Gradebook">
                </headerPanel>
                <mainPanel>
                    {courseIdVal != '' ? <GradebookOverview /> : courseList.state == 'hasValue' ? <CourseSelector callback = {setCourseIdVal} courseList = {courseList.contents.courseInfo}/> : <p>Loading...</p>}
                </mainPanel>
            </Tool>
        </Router>
    )
} 