module.exports = { // options...
    devServer: {
        disableHostCheck: true
    },
  publicPath: process.env.NODE_ENV === "production" ? "/TGC9-Proj2-PokeLegends-vue/" : "/"
}