const Notification = ({ message, error }) => {
  return (
    (message || error) && <div className={error ? 'error' : 'message'}>{message}</div>
  );
};

export default Notification;
