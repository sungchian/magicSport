const getters = {
  isLogin: (state) => "memberId" in state.user,
  isAdmin: () => true,
  //isAgent: () => false,
};

export default getters;
