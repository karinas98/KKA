import { useState } from "react"

const reviews=()=>{
  const [comments, setComments] = useState([]);
  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const comment = event.target.comment.value;
    const newComment = { name, comment };
    setComments([...comments, newComment]);
    event.target.reset();
    //const res = await axios.get(`${API_URL}/foods`);


  }
  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <div key={index}>
          <h3>{comment.name}</h3>
          <p>{comment.comment}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Comment:
          <textarea name="comment" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default reviews