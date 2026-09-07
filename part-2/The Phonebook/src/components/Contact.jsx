const Contact = ({ name, number, deleteContact }) => {
  return (
    <li className="note">
      {name} {number}
      <button onClick={deleteContact}>delete</button>
    </li>
  );
};

export default Contact;
