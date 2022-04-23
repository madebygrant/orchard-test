module.exports.options = {

    onError: (err) => {
        notify.onError({
            title   : 'Gulp',
            subtitle: 'Failure!',
            message : 'Error: <%= error.message %>',
            sound   : 'Beep'
        })(err);
        this.emit('end');
    },
}

module.exports.paths = {

    root: './../',

    src : {
        base                : './../src/',
        js                  : './../src/assets/js/',
        css                 : './../src/assets/css/',
        scss                : './../src/assets/scss/',
    },

    dist : {
        base                : './../dist/',
        js                  : './../dist/assets/js/',
        css                 : './../dist/assets/css/',
        scss                : './../dist/assets/scss/',
    },

    watch: {
        html                : './../src/**/*.html',
        scss                : './../src/assets/scss/**/*.scss',
        js                  : [ './../src/assets/js/**/*.js', '!' + './../src/assets/js/**/*.min.js' ]
    }

};