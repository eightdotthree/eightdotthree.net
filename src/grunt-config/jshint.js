module.exports = function(grunt, options){
  return {
    options: {
      jshintrc: '.jshintrc'
    },
    all: [
      '<%= yeoman.app %>/js/{,*/}*.js',
      'test/spec/{,*/}*.js'
    ]
  }
};