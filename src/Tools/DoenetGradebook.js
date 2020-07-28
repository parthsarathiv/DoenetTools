import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce} from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

axios.defaults.withCredentials = true;
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import query from '../queryParamFuncs';
import DoenetViewer from "./DoenetViewer";

import "../imports/table.css";
import "../imports/doenet.css";
import ToolLayout from "./ToolLayout/ToolLayout";
import ToolLayoutPanel from "./ToolLayout/ToolLayoutPanel";
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';



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
        user-select: none;
        vertical-align: text-top;
        max-width: 4rem;
        word-wrap: break-word;
    }

    th:first-child {
        max-width: 15rem;
        transform: rotate(0deg);
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

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-collapse: collapse;
//     border-spacing: 0;
    
//     thead {
//         border-bottom: 1px solid;
//     }
    
//     a {
//         color: inherit;
//         text-decoration: none;
//     }
//     .sortIcon {
//         vertical-align: text-bottom;
//     }
//     tbody tr:nth-child(even) {background: #CCC}
//     tbody tr:nth-child(odd) {background: #FFF}

//     td:first-child {
//         text-align: left;
//         max-width: 15rem;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         overflow: hidden;
//     }
//     th{
//         user-select: none;
//         vertical-align: text-top;
//         max-width: 4rem;
//         word-wrap: break-word;
//         //transform: rotate(-90deg);
//         // text-align: left;
//         //line-height: 5rem;
//         // text-overflow: ellipsis;
//         // white-space: nowrap;
//         // overflow: hidden;
//     }

//     th:first-child {
//         max-width: 10rem;
//         transform: rotate(0deg);
//     }


//     td {
//         user-select: none;
//         text-align: center;
//         max-width: 5rem;
//     }
//   }
// `

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
                    <div><span>
                    {column.render('Header')}
                    <span className = "sortIcon"> 
                        {column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />) : <FontAwesomeIcon icon={faSort} />}
                    </span>
                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                    </span></div>
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


function sortArraysByElementI(arrarr, i) {
    // TODO: finish
    arrarr.sort()
}



class GradebookOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            overviewLoaded: false,
        }

        this.courseId = "aI8sK4vmEhC5sdeSP3vNW"; // FIXME: value used for testing, this needs to be read from the url query

        this.assignmentsLoaded = false;
        this.assignments = null;
        this.studentsLoaded = false;
        this.students = null;
        this.overviewData = null;
        this._assignmentsTable = null;
    }

    componentDidMount() {
        axios.get(`/api/loadGradebookEnrollment.php?courseId=${this.courseId}`).then(resp => {
            let data = resp.data
            // From API:
            // array_push($response_arr,
            //     array(
            //         $row['username'],
            //         $row['firstName'],
            //         $row['lastName'],
            //         $row['courseCredit'],
            //         $row['courseGrade'],
            //         $row['overrideCourseGrade'],
            //     )
            // );

            this.students = {}
            for (let row of data) {
                let [username,
                    firstName,
                    lastName,
                    courseCredit,
                    courseGrade,
                    overrideCourseGrade] = row;

                this.students[username] = {
                    firstName,
                    lastName,
                    courseCredit,
                    courseGrade,
                    overrideCourseGrade,
                };
            }

            this.studentsLoaded = true;
            if (this.assignmentsLoaded) {
                this.getOverviewData();
            }
        }).catch(err => console.log((err.response).toString()));

    
        

        axios.get("/api/loadAssignments.php?courseId=" + this.courseId).then(resp => {
            let data = resp.data
            // From API:
            // array_push($response_arr,
            //     array(
            //         $row['assignmentId'],
            //         $row['assignmentName']
            //     )
            // );

            this.assignments = {};
            for (let row in data) {
                let [assignmentId, assignmentName] = data[row];

                this.assignments[row] = { assignmentId, assignmentName };
            }

            this.assignmentsLoaded = true;
            if (this.studentsLoaded) {
                this.getOverviewData();
            }
        }).catch(err => console.log((err.response).toString()));

        
        
    }

    getOverviewData() {
        axios.get("/api/loadGradebookOverview.php?courseId=" + this.courseId).then(resp => {
            let data = resp.data
            // From API:
            // array_push($response_arr,
            //     array(
            //         $row['assignmentId'],
            //         $row['assignmentName'],
            //         $row['credit'],
            //         $row['username']
            //     )
            // );

            this.overviewData = {}
            for (let username in this.students) { // initialize object
                this.overviewData[username] = {
                    grade: (this.students)[username].grade,
                    assignments: {}
                }

                for (let i in this.assignments) {
                    let assignmentId = this.assignments[i].assignmentId
                    this.overviewData[username].assignments[assignmentId] = null
                }
            }

            for (let user_assignment in data) {
                let [assignmentId,
                    assignmentName,
                    credit,
                    username] = data[user_assignment]

                this.overviewData[username].assignments[assignmentId] = credit
            }

            this.setState({ overviewLoaded: true })
        }).catch(err => console.log(err));

        
        
    }

    get assignmentsTable() {
        if (this._assignmentsTable !== null) {
            return this._assignmentsTable;
        }

        this._assignmentsTable = {};

        this._assignmentsTable.headers = [
            {
                Header: "Name",
                accessor: "name",
            },
        ]; // th elements in the all assignments table
        for (let i in this.assignments) {
            let { assignmentId, assignmentName } = this.assignments[i];
            this._assignmentsTable.headers.push(
                {
                    Header: <Link to={`/assignment/?assignmentId=${assignmentId}`}>{assignmentName}</Link>,
                    accessor: assignmentId,
                    disableFilters: true
                    //Cell: <Link to={`/assignment/?assignmentId=${assignmentId}`}>{assignmentName}</Link>
                }
            )
        }

        this._assignmentsTable.headers.push(
            {
                Header: "Weighted Credt",
                accessor: "weight",
                disableFilters: true
                
            }
        )
        this._assignmentsTable.headers.push(
            {
                Header: "Grade",
                accessor: "grade",
                sortType: gradeSorting,
                disableFilters: true
            },
        )



        this._assignmentsTable.rows = [];
        for (let username in this.students) {
            let firstName = this.students[username].firstName,
                lastName = this.students[username].lastName,
                credit = this.students[username].courseCredit,
                generatedGrade = this.students[username].courseGrade,
                overrideGrade = this.students[username].overrideCourseGrade;
            let grade = overrideGrade ? overrideGrade : generatedGrade

            let row = {}

            row["name"] = firstName + " " + lastName + "(" +  username + ")"


            for (let i in this.assignments) {
                let { assignmentId, assignmentName } = this.assignments[i]
                row[assignmentId] = (this.overviewData[username].assignments[assignmentId]) * 100 + "%"
            }

            row["weight"] = credit
            row["grade"] = grade

            this._assignmentsTable.rows.push(row);
        }

        return this._assignmentsTable
    }


    render() {
        if (!this.state.overviewLoaded) {
            return (<div>
                <p>Loading...</p>
                <p>If this takes too long you can try refreshing the page.</p>
            </div>)
        }

        // console.log("overviewdate", this.overviewData);
        // console.log("assgn", this.assignments);
        // console.log("studs", this.students);
        
        
        return (
            <Styles>
                <Table columns = {this.assignmentsTable.headers} data = {this.assignmentsTable.rows}/>
            </Styles>
        )
    }
}

class GradebookAssignmentView extends Component {
    constructor(props) {
        super(props)

        this.courseId = "aI8sK4vmEhC5sdeSP3vNW"; // FIXME: value used for testing, this needs to be read from the url query

        this.state = {
            assignmentLoaded: false,
            assignmentId: query.getURLSearchParam(this.props.location.search, "assignmentId"),
        }

        this.assignmentsLoaded = false;
        this.assignments = null;
        this.studentsLoaded = false;
        this.students = null;
        this.assignmentData = null;
        this._attemptsTable = null;
    }

    componentDidMount() {
        axios.get("/api/loadGradebookEnrollment.php?courseId=" + this.courseId).then(resp => {
            let data = resp.data
            // From API:
            // array_push($response_arr,
            //     array(
            //         $row['username'],
            //         $row['firstName'],
            //         $row['lastName']
            //     )
            // );

            this.students = {}
            for (let row of data) {
                let [username,
                    firstName,
                    lastName] = row;

                this.students[username] = {
                    firstName: firstName,
                    lastName: lastName,
                };
            }

            this.studentsLoaded = true;
            if (this.assignmentsLoaded) {
                this.getAssignmentData();
            }
        }).catch(err => console.log((err.response).toString()));

        axios.get("/api/loadAssignments.php?courseId=" + this.courseId).then(resp => {
            let data = resp.data
            // From API:
            // array_push($response_arr,
            //     array(
            //         $row['assignmentId'],
            //         $row['assignmentName']
            //     )
            // );

            this.assignments = {}
            for (let row of data) {
                let [assignmentId,
                    assignmentName] = row;

                this.assignments[assignmentId] = assignmentName; // note: this is in a different format than it is in overview
            }

            this.assignmentsLoaded = true;
            if (this.studentsLoaded) {
                this.getAssignmentData();
            }
        }).catch(err => console.log((err.response).toString()));
    }

    componentDidUpdate() {
        if (!this.state.assignmentLoaded) {
            this.getAssignmentData();
        }
    }

    getAssignmentData() {
        axios.get(`/api/loadGradebookAssignmentAttempts.php?assignmentId=${this.state.assignmentId}`).then(resp => {
            let data = resp.data
            // From API:
            // array_push($response_arr,
            //     array(
            //         $row['assignmentCredit'],
            //         $row['username'],
            //         $row['attemptCredit'],
            //         $row['attemptNumber']
            //     )
            // );

            //console.log("assgndata", data)

            this.assignmentData = {}
            for (let username in this.students) { // initialize object
                this.assignmentData[username] = {
                    credit: null,
                    attempts: {}
                }
            }

            for (let row of data) {
                let [assignmentCredit,
                    username,
                    attemptCredit,
                    attemptNumber] = row;

                this.assignmentData[username].grade = assignmentCredit // we need to do this in this block so that username is defined
                this.assignmentData[username].attempts[attemptNumber] = attemptCredit
            }

            console.log(this.assignmentData)

            this.setState({ assignmentLoaded: true });
        }).catch(err => console.log((err.response).toString()));
    }

    get attemptsTable() {
        if (this._attemptsTable != null) {
            return this._attemptsTable;
        }

        this._attemptsTable = {};

        // find the max number of attempts, table has number of cols based on max

        let maxAttempts = 0;

        
        for (let student in this.assignmentData) {
            let len = Object.keys(this.assignmentData[student].attempts).length;

            if (len > maxAttempts) maxAttempts = len;
        }

        this._attemptsTable.headers = [
            {
                Header: "Student",
                accessor: "student",
            }
        ];

        for (let i = 1; i <= maxAttempts; i++) {
            this._attemptsTable.headers.push(
            {
                Header: "Attempt " + i,
                accessor: "a"+i,
                disableFilters: true
            })
        }

        this._attemptsTable.headers.push({
            Header: "Assignment Grade",
            accessor: "grade",
            disableFilters: true
        })


        this._attemptsTable.rows = [];
        for (let username in this.students) {
            let { firstName,
                lastName } = this.students[username];
            
            let row = {};

            row["student"] = firstName + " " + lastName + "(" + username + ")"

            for (let i = 1; i <= maxAttempts; i++) {
                let attemptCredit = this.assignmentData[username].attempts[i];

                row[("a"+i)] = 
                <Link to={`/attempt/?assignmentId=${this.state.assignmentId}&username=${username}&attemptNumber=${i}`}>
                {
                    attemptCredit ? attemptCredit * 100 + "%" : "" // if attemptCredit is `undefined`, we still want a table cell so that the footer column still shows up right.
                }
                </Link>
            }

            row["grade"] = this.assignmentData[username].grade ? this.assignmentData[username].grade : ""
            
            this._attemptsTable.rows.push(row);
        }

        return this._attemptsTable;
    }

    render() {
        if (!this.state.assignmentLoaded) {
            return (<div>
                <p>Loading...</p>
                <p>If this takes too long you can try refreshing the page.</p>
            </div>);
        }

        let newAssignmentId = query.getURLSearchParam(this.props.location.search, "assignmentId");
        if (this.state.assignmentId !== newAssignmentId) {
            this.assignmentData = null;
            this._attemptsTable = null;
            this.setState({ assignmentId: newAssignmentId, assignmentLoaded: false });
            return (<div>
                <p>Loading new assignment...</p>
                <p>If this takes too long you can try refreshing the page.</p>
            </div>);
        }

        return (<div>
            <h2>{this.assignments[this.state.assignmentId]}</h2>
            <Styles>
                <Table columns = {this.attemptsTable.headers} data = {this.attemptsTable.rows}/>
            </Styles>
        </div>);
    }
}

class GradebookAttemptView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            attemptLoaded: false,
            assignmentId: query.getURLSearchParam(this.props.location.search, "assignmentId"),
            username: query.getURLSearchParam(this.props.location.search, "username"),
            attemptNumber: query.getURLSearchParam(this.props.location.search, "attemptNumber"),
        }

        this.courseId = "aI8sK4vmEhC5sdeSP3vNW"; // FIXME: value used for testing, this needs to be read from the url query

        this.assignmentsLoaded = false;
        this.assignments = null;
        this.studentsLoaded = false;
        this.students = null;
        this.dml = null;
    }

    componentDidMount() {
        axios.get("/api/loadGradebookEnrollment.php?courseId=" + this.courseId).then(resp => {
            let data = resp.data
            // From API:
            // array_push($response_arr,
            //     array(
            //         $row['username'],
            //         $row['firstName'],
            //         $row['lastName']
            //     )
            // );

            this.students = {}
            for (let row of data) {
                let [username,
                    firstName,
                    lastName] = row;

                this.students[username] = {
                    firstName: firstName,
                    lastName: lastName,
                };
            }

            this.studentsLoaded = true;
            if (this.assignmentsLoaded) {
                this.getDML();
            }
        }).catch(err => console.log((err.response).toString()));

        axios.get("/api/loadAssignments.php?courseId=" + this.courseId).then(resp => {
            let data = resp.data
            // From API:
            // array_push($response_arr,
            //     array(
            //         $row['assignmentId'],
            //         $row['assignmentName']
            //     )
            // );

            this.assignments = {}
            for (let row of data) {
                let [assignmentId,
                    assignmentName] = row;

                this.assignments[assignmentId] = assignmentName; // note: this is in a different format than it is in overview
            }

            this.assignmentsLoaded = true;
            if (this.studentsLoaded) {
                this.getDML();
            }
        }).catch(err => console.log((err.response).toString()));
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.attemptLoaded) {
            this.getDML();
        }
    }

    getDML() {
        axios.get(`/api/loadAssignmentAttempt.php?assignmentId=${this.state.assignmentId}&username=${this.state.username}&attemptNumber=${this.state.attemptNumber}`).then(resp => {
            // data = JSON.parse(data);
            // From API:
            // array_push($response_arr,
            //     $row['latestDocumentState']
            // );
            let data = resp.data;

            this.dml = data[0]; // this endpoint can only return an array with one element or an error code

            this.setState({ attemptLoaded: true });
        }).catch(err => console.log((err.response).toString()));
    }

    render() {
        if (!this.state.attemptLoaded) {
            return (<div>
                <p>Loading...</p>
                <p>If this takes too long you can try refreshing the page.</p>
            </div>);
        }

        let newAssignmentId = query.getURLSearchParam(this.props.location.search, "assignmentId");
        let assignmentChanged = (newAssignmentId !== this.state.assignmentId);

        let newUsername = query.getURLSearchParam(this.props.location.search, "username");
        let usernameChanged = (newUsername !== this.state.username);

        let newAttemptNumber = query.getURLSearchParam(this.props.location.search, "attemptNumber");
        let attemptNumberChanged = (newAttemptNumber !== this.state.attemptNumber);

        if (assignmentChanged || usernameChanged || attemptNumberChanged) {
            this.dml = null;
            this.setState({
                assignmentId: newAssignmentId,
                username: newUsername,
                attemptNumebr: newAttemptNumber,
                attemptLoaded: false
            });
            return (<div>
                <p>Loading new attempt...</p>
                <p>If this takes too long you can try refreshing the page.</p>
            </div>);
        }

        return (<DoenetViewer free={{ doenetState: this.dml }} />)
    }
}

export default class DoenetGradebook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            errorInfo: null,
            assignmentsLoaded: false,
        };

        this.courseId = "aI8sK4vmEhC5sdeSP3vNW"; // FIXME: value used for testing, this needs to be read from the url query

        this.assignments = null;

        axios.get(`/api/loadAssignments.php?courseId=${this.courseId}`).then(resp => {
            let data = resp.data;
            // From API:
            // array_push($response_arr,
            //     array(
            //         $row['assignmentId'],
            //         $row['assignmentName']
            //     )
            // );

            this.assignments = {};
            for (let row of data) {
                let [assignmentId, assignmentName] = row;
                this.assignments[assignmentId] = assignmentName;
            }

            this.setState({ assignmentsLoaded: true });
        }).catch(err => console.log((err.response).toString()));
    }


    componentDidCatch(error, info) {
        this.setState({ error, errorInfo: info });
    }

    get navItems() {
        let navItems = [];
        for (let assignmentId in this.assignments) {
            let assignmentName = this.assignments[assignmentId];
            navItems.push(
                <div style={{width:"100%", borderBottom: "solid #6e6e6e 1px",marginBottom: ".5em"}} key={`navItem_${assignmentId}`}>
                    <Link to={`/assignment/?assignmentId=${assignmentId}`} className="gradebookNavLink">{assignmentName}</Link>
                </div>
            );
        }

        // TODO: sort navItems, didn't have internet when I wrote this method

        return navItems;
    }

    render() {
        if (this.state.error !== null) {
            return (<div>
                <p>Oops! Something went wrong. Try reloading the page or contacting support.</p>
                <p>Error Info: {JSON.stringify(this.state.errorInfo)}</p>
            </div>)
        }

        if (!this.state.assignmentsLoaded) {
            return (<div>
                <p>Loading...</p>
                <p>If this takes too long you can try refreshing the page.</p>
            </div>)
        }




        return (
        <Router basename="/gradebook">
            <ToolLayout toolName="Gradebook" headingTitle="TODO: courseName" >
                <ToolLayoutPanel key="one" panelName="Left Nav">
                <div style={{padding: "5px"}}>

                    <Link to="/" className="gradebookNavItem">See All Assignments</Link>
                    <h2>Assignments</h2>
                    {this.navItems}
                    </div>
                </ToolLayoutPanel>
                <ToolLayoutPanel key="two" panelName="Grades Panel">
                    <div style={{padding: "5px"}}>
                        <Switch>
                            <Route sensitive exact path="/" component={GradebookOverview} />
                            <Route sensitive exact path="/assignment/" component={GradebookAssignmentView} />
                            <Route sensitive exact path="/attempt/" component={GradebookAttemptView} />
                        </Switch>

                    </div>

                </ToolLayoutPanel>

            </ToolLayout>
        </Router>

        );
    }
}