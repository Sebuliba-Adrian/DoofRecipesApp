import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios
        .post("http://127.0.0.1:5000/auth/login", credentials)
        .then(res => res.data),

    logout: token =>
      axios({
        method: "post",
        url: "http://127.0.0.1:5000/auth/logout",
        headers: { Authorization: token }
      }),

    signup: user =>
      axios
        .post("http://127.0.0.1:5000/auth/register", user)
        .then(res => res.data),

    getCategories: token =>
      axios({
        method: "get",
        url: "http://127.0.0.1:5000/categories",
        headers: { Authorization: token }
      }).then(res => res.data),

    postCategory: (token, data) =>
      axios({
        method: "post",
        url: "http://127.0.0.1:5000/categories",
        data,
        headers: { Authorization: token }
      }).then(res => res.data),

    deleteCategory: (token, id) =>
      axios({
        method: "delete",
        url: `http://127.0.0.1:5000/categories/${id}`,
        headers: { Authorization: token }
      }).then(res => res.data),
      

    putCategory: (token, data, id) =>
      axios({
        method: "put",
        url: `http://127.0.0.1:5000/categories/${id}`,
        data,
        headers: { Authorization: token }
      }).then(res => res.data),

    getRecipes: (token, category_id) =>
      axios({
        method: "get",
        url: `http://127.0.0.1:5000/categories/${category_id}/recipes`,
        headers: { Authorization: token }
      }).then(res => res.data)
  }
};
