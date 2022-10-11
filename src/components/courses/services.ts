import { courses } from "../../mockData";
import { ICourse } from "./interfaces";


const coursesServices = {
    findCourseById: (id: number): ICourse | undefined => {
        let course: ICourse | undefined = courses.find(element => element.id === id);
        return course;
    }
};


export default coursesServices;