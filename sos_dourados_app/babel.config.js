module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "module:react-native-dotenv",
    ]
    //presets: ["module:metro-react-native-babel-preset", "module:react-native-dotenv"],
  };
};
