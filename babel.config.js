module.exports = api => {
    api.cache(true);
    return {
        "presets":[
            ["@babel/preset-env", {
                targets: [
                    "last 1 version",
                    "> 1%",
                    "maintained node versions",
                    "not dead"
                ],
                useBuiltIns: "usage",
                corejs: 3
            }],
            [
            "@babel/preset-react",
                {
                    "runtime": "automatic"
                }
            ]
        ],
        "plugins":[
             "@babel/plugin-transform-react-jsx",
        ],
    }
}