const path = require('path'); // подключаем path к конфигу вебпак (просто надо по умолчанию)
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Подключить плагин для HTML
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Подключить плагин для очистки dist каждый раз после запуска скрипта Webpack

// Подключить к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
    //Задать входную точку для Webpack - по умолчанию это просто index.js (который находится в корне .src), поэтому меняем
    entry: { main: './src/pages/index.js' },
    output: {
        //Выходная точка - папка с названием dist в корневом каталоге mesto, файл main.js
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    //В данном разделе указывается, что нужно делать в режиме разработчика Webpack
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true // сайт будет открываться сам при запуске npm run dev
    },
    //Описание работы модулей
    module: {
        //Правила для работы Babel
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/'
        },
        
        {
            //Правила для работы файлов в .src - шрифтов и изображений
            // добавили правило для обработки файлов
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource'
        },

        {
            // Обработка css-файлов - применять это правило только к CSS-файлам
            test: /\.css$/,
            // при обработке этих файлов нужно использовать
            // MiniCssExtractPlugin.loader и css-loader
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: { importLoaders: 1 }
            },
            // Добавить в обработку postcss-loader
            'postcss-loader']
        }, 
        ]
    },

    //В этом разделе указываются применямые плагины
    plugins: [
        //Плагин для сборки html-файлов
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(), // использовали плагин очистки dist после запуска
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов css
    ]
};