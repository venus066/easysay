import inject from "@rollup/plugin-inject";
import { resolve } from 'path'

export default {
    root: resolve(__dirname, 'src'),
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    // plugins: [
    //     inject({
    //         $: 'jquery',
    //           jQuery: 'jquery',
    //     }),
    // ],
    server: {
        port: 8000,
        hot: true
    }
}