// src/create.tsx

function Create() {
  return (
    <>
      <h1>3D Model and User Input</h1>
      <div className="container">

          <div className="input-area">
              <input id="user-text" type="text" placeholder="Enter your description"/>
              <input id="submit-button" type="submit" value="Submit"/>
          </div>

          <div id="three-container"></div>
      </div>
    </>
  )
}

export default Create