const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => {
        return (
          <Part
            key={crypto.randomUUID()}
            name={part.name}
            exercises={part.exercises}
          />
        );
      })}
    </>
  );
};

const Total = ({ course }) => {
  return (
    <p>
      total of{" "}
      {course.parts.reduce((acc, current) => {
        return current.exercises + acc;
      }, 0)}{" "}
      exercises
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
