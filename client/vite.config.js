// const path = require('path')
import { resolve } from 'path'

export default {
    root: resolve(__dirname, 'src'),
    server: {
        port: 8000,
        hot: true
    }
}