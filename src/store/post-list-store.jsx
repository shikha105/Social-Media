import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});
const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = () => {};

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to London",
    body: "Hi Friends, I am going to London for my vacation, hope to enjoy a lot. Peace out",
    reactions: 0,
    userId: "user-9",
    tags: ["vacation", "london", "enjoying"],
  },
  {
    id: "2",
    title: "Pass ho gye",
    body: "4 saal ki masti ke baad hogye hain pass, hard to believe",
    reactions: 15,
    userId: "user-8",
    tags: ["results", "btech", "pass"],
  },
];

export default PostListProvider;
