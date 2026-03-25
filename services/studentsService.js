// emulates db connection !!
import { students } from "../students.js";


export const findAllUsers = () => {
    return students;
};

/**
 * 
 * @param {*} id : string
 * @returns student
 */

export const findUser = (id) => {
  return students.find((student) => student.id === id);
};
