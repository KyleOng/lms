import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

const CourseIdPage = ({ params }: Props) => {
  return <div>Course id: {params.courseId}</div>;
};

export default CourseIdPage;
