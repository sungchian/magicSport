const state = () => {
  return {
    apiQueue: [],
    // breadcrumb: [],
    alert: {
      type: "default",
      message: null,
      timestamp: 0,
    },
  };
};

export default state;
