import { createStore } from "vuex";
import { Todo } from "./todo";

export const store = createStore({
  modules: {
    todo: Todo,
  },
});
