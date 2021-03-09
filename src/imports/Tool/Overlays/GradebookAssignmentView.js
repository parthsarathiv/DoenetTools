import React, { useEffect } from "react";
import Tool, { openOverlayByName } from "../Tool";
import { Styles, Table, studentData, attemptData } from "../../../Tools/DoenetGradebook"
import { useToolControlHelper } from "../ToolRoot";

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
 
export default function GradebookAssignmentView(props){
    const { open, activateMenuPanel } = useToolControlHelper();
    let assignmentId = props.assignmentId
    let assignmentsTable = {}
    let attempts = useRecoilValueLoadable(attemptData(assignmentId))
    let students = useRecoilValueLoadable(studentData)

    let maxAttempts = 0;

    attempts.state == 'hasValue' ? console.log(attempts.contents): console.log(attempts.state)
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
        
                    row[("a"+i)] = <a onClick = {(e) =>{
                        e.stopPropagation()
                        console.log("trying overlay");
                        open("gradebookdoenetmlview", "", "", assignmentId, userId, i)
                        //open("calendar", "fdsa", "f001");
                    }}>{attemptCredit ? attemptCredit * 100 + "%" : ""}</a>
                    // <Link to={`/attempt/?assignmentId=${assignmentId}&userId=${userId}&attemptNumber=${i}`}>
                    // {
                    //     attemptCredit ? attemptCredit * 100 + "%" : "" // if attemptCredit is `undefined`, we still want a table cell so that the footer column still shows up right.
                    // }
                    // </Link>
                }

                row["grade"] = attempts.contents[userId].credit ? attempts.contents[userId].credit*100+ "%" : ""
            }
    
            
            
            assignmentsTable.rows.push(row);
        }
    }

    console.log("in component");
    

    return(

        <Tool>
            <headerPanel></headerPanel>

            <mainPanel>
                <Styles>
                    <Table columns = {assignmentsTable.headers} data = {assignmentsTable.rows}/>
                </Styles>
                {/* <p>Testt overlay</p> */}
            </mainPanel>

            <supportPanel></supportPanel>
        </Tool>
    )

}