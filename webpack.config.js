const HtmlWebpackPlugin = require("html-webpack-plugin")
moudle.exports = {
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: "日志云",
                template: "./public/index.html"
            }
        )
    ]
}