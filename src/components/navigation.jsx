import React from 'react';

export default function NavBar(props) {
  function logoutUser(event) {
    event.preventDefault();
    props.request('logoutUser', 'logout', 'GET');
  }
  function viewCategories(event) {
    event.preventDefault();
    props.viewCategories();
  }
  function triggerSearch(event) {
    props.search(event.target.value);
  }
  return (
    <div className="">
      <div className="row">
        <div className="col-md-4">
          <a
            href="#/"
            onClick={viewCategories}
            className="navbar-brand logo text-white"
          >
            <h3>
              <span className="fa fa-lg fa-cutlery mr-3 ml-3" />| &nbsp; Doof!
              recipes
            </h3>
          </a>
        </div>
        <div className="col-md-4 text-center">
          <input
            className="form-control mr-sm-2 search-box"
            type="text"
            placeholder="Search e.g c:the category name"
            onKeyDown={triggerSearch}
          />
        </div>
        <div className="col-md-4 text-right">
          <div className="dropdown logout-dropdown">
            <div
              className="fa fa-user-circle fa-lg text-white dropdown-toggle"
              id="dropdownMenuLink"
              data-toggle="dropdown"
            >
              &nbsp;<span className="logo">
                <b> {localStorage.getItem('username')} </b>
                </span>
            </div>
            <div
              className="dropdown-menu dropdown-cust"
              aria-labelledby="dropdownMenuLink"
            >
              <a
                id="logoutLink"
                className="dropdown-item"
                href="#/"
                onClick={logoutUser}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
