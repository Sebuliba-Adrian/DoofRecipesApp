import React from "react";
import axios from "axios"; // v0.15.3
import renderer from "react-test-renderer";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Dashboard from "../components/dashboard";
import { APIUrl } from "../App";

global.localStorage = {
  setItem: () => {},
  removeItem: () => {},
  getItem: () => "t0k3n"
};
const props = {
  history: {
    replace: jest.fn()
  }
};

jest.useFakeTimers();

describe("Dashboard tests", () => {
  configure({ adapter: new Adapter() });
  const dashboard = mount(<Dashboard {...props} />);
  const instance = dashboard.instance();

  it("renders correctly", () => {
    const dashbrd = renderer.create(<Dashboard {...props} />).toJSON();
    expect(dashbrd).toMatchSnapshot();
  });

  it("shows categories", () => {
    instance.viewCategories();
    // expect(global.fetch).toHaveBeenCalled();
  });

  it("searches categories", () => {
    instance.search("");
    // expect(global.fetch).toHaveBeenCalled();
  });
  it("can update page size", () => {
    instance.updatePageSize(3);
    // expect(global.fetch).toHaveBeenCalled();
  });

  it("can do a GET network call for categories", () => {
      instance.request("getCategories", "categories/1", "GET","");
      // expect(global.fetch).toHaveBeenCalled();
    });

  it("can add categories", () => {
    instance.request("addCategories", "categories/1", "POST", "");
    // expect(global.fetch).toHaveBeenCalled();
  }); 
  
   it("can update categories", () => {
     instance.request("updateCategory", "categories/1", "UPDATE", "");
     // expect(global.fetch).toHaveBeenCalled();
   });
   
   it("can delete categories", () => {
     instance.request("deleteCategory", "categories/1", "DELETE", "");
     // expect(global.fetch).toHaveBeenCalled();
   }); 

   it("can add recipe", () => {
     instance.request("addRecipe", "categories", "POST", "");
     // expect(global.fetch).toHaveBeenCalled();
   });  

   it("can update recipe", () => {
     instance.request("updateRecipe", "categories/1/recipe/1", "UPDATE", "");
     // expect(global.fetch).toHaveBeenCalled();
   });
   
   it("can delete recipe", () => {
     instance.request("deleteRecipe", "categories/1/recipe/1", "DELETE", "");
     // expect(global.fetch).toHaveBeenCalled();
   });  

   it("can navigate properly", () => {
     instance.request("navigateRecipes", "categories/1/recipe/1", "GET", "");
     // expect(global.fetch).toHaveBeenCalled();
   });  
  
  it("can do a GET network call  for recipes", () => {
       instance.request("getRecipes", "categories/1/recipes", "GET", "");
       // expect(global.fetch).toHaveBeenCalled();
     });

  it("can navigate through categories", () => {
    instance.onNavigateCategories("/categories?page=1");
    // expect(global.fetch).toHaveBeenCalled();
  });   
   it("can navigate through recipes", () => {
     instance.onNavigateRecipes("/categories/1/recipes?page=1");
     // expect(global.fetch).toHaveBeenCalled();
   }); 
    it("can logout a user", () => {
      instance.request("logoutUser", "", "GET", "");
      // expect(global.fetch).toHaveBeenCalled();
    }); 

   it("can load from the server", () => {
     instance.loadFromServer(2);
     // expect(global.fetch).toHaveBeenCalled();
   }); 

  it("shows recipes", () => {
    instance.viewRecipes({
      id: 1,
      name: "Selected Category",
      description: "This is the selected category",
      date_created: "Wed, 20 Sep 2018 11:31:50 GMT",
      date_updated: "Wed, 20 Sep 2018 11:31:50 GMT"
    });
    // expect(global.fetch).toHaveBeenCalled();
  });

});
