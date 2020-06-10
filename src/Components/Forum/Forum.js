import React from "react"

function Forum(){
    function createForum(e) {
        const form = new FormData(document.getElementById("newForum"));
    
        fetch("http://localhost:3000/forums.json", {
          method: "POST",
          body: form,
        });
        e.preventDefault();
        alert("A new Forum has been created");
      }

    return(

<div class = "container">
        <div className="request">
        <h2 className="title is-5 has-text-grey-light">Create a New Forum</h2>
        <section className="forms text-center border border-light p-5">
          <form className="form" onSubmit={createForum} id="newForum">
            <div className="form-row mb-4">
              <div className="col">
                Title:
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  required
                />
              </div>
              <div className="col">
               Description:
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <input
              type="submit"
              value="New Forum"
              className="btn btn-primary btn-block"
            />
          </form>
        </section>
      </div>
  </div>
    )
}

export default Forum;