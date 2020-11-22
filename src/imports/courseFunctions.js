
import { useIndexedDB, initDB } from 'react-indexed-db';
import axios from 'axios';
import nanoid from 'nanoid';
import {
    useQuery,
    useMutation,
  } from "react-query";
import regeneratorRuntime from "regenerator-runtime";


const getCourses_CI = async () => {
  console.log("react query: getCourses");
  
  const phpUrl = '/api/loadUserCourses.php';
  const data = await axios.get(phpUrl);
  return {"courses": data.data.courseInfo, "selected": data.data.courseInfo[0]};
}

const updateCourses_CI = (courseArray) => {
  console.log("react query: updateCourses", courseArray);
  
  const phpurl = '/api/saveUserCourseModifications.php';
  axios.post(phpurl, courseArray);
}

export function useGetCourses() {
  return useQuery("getcourses", getCourses_CI);
}

export function useUpdateCourses(){
  return useMutation(updateCourses_CI);
}