import { IStudent } from "../types";

interface IState {
  students: IStudent[];
  totalAbsents: number;
}

type Action =
  | { type: "INIT_STATE";  payload: { studentsList: IStudent[]; totalAbsents: number };}
  | { type: "ADD_STUDENT"; payload: IStudent }
  | { type: "REMOVE_FIRST" }
  | { type: "UPDATE_ABSENT"; payload: { id: string; change: number } };

const reducer = (state: IState, action: Action): IState => {
    switch (action.type) {
        case "INIT_STATE":
            if (state.students.length === 0) {
                return { students: action.payload.studentsList, totalAbsents: action.payload.totalAbsents };
            }
            return state;
        case "ADD_STUDENT":
            const newStudent = action.payload;
            return { ...state, students: [...state.students,newStudent] };
        case "REMOVE_FIRST":
            return { ...state, students: state.students.slice(1) };
        case "UPDATE_ABSENT":
            return {
                ...state,
                students: state.students.map(std => std.id === action.payload.id ? { ...std, absents: std.absents + action.payload.change } : std),
                totalAbsents: state.totalAbsents + action.payload.change
            };
        default:
            return state;
    
    }


};

export default reducer;
