const isScrolling = (callback: () => void) => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){
      return;
    }

    return callback;
  }

  export default isScrolling;