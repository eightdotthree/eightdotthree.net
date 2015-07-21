module.exports = function(grunt, options){

  return {

    files: {
      src: ['dist/**/*.{js,css}', '!dist/js/shims/**']
    }

  }

};