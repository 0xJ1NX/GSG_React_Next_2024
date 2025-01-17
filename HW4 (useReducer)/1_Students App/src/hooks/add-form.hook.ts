import { validateStudent } from "../utils/validation.ts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IStudent } from "../types";

const INITIAL_STUDENT = {
  age: 0,
  coursesList: [],
  id: "",
  isGraduated: false,
  name: "",
  absents: 0,
};

const useAddForm = (props: { onSubmit: (std: IStudent) => void }) => {

  const [isOpen, setIsOpen] = useState(true);
  const [student, setStudent] = useState<IStudent>(INITIAL_STUDENT);
  const [errorsList, setErrorsList] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const nav = useNavigate();

  const handleChange = (field: string, value: any) => {
    setStudent({ ...student, [field]: value });
  };

  const handleSubmit = () => {
    const newStudent: IStudent = { ...student, id: Date.now().toString() };

    const errors = validateStudent(newStudent);
    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      setErrorsList([]);
      props.onSubmit(newStudent);
      handleClear();
      setMessage("Student Added Successfully");
      setTimeout(() => {
        nav("/");
      }, 1500);
    }
  };

  const handleClear = () => {
    setStudent(INITIAL_STUDENT);
  };

  const handleCoursesChange = (list: string[]) => {
    setStudent({ ...student, coursesList: list });
  };


  const handleFormOpen = () => {
    setIsOpen(!isOpen);
  };


  return {
    isOpen,
    student,
    errorsList,
    message,
    handleChange,
    handleSubmit,
    handleClear,
    handleCoursesChange,
    handleFormOpen,
  };

};

export default useAddForm;
