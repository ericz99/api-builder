/* eslint-disable import/no-anonymous-default-export */

const formatObj = (data) => {
  return `
    ${data.propertyName}: {
      type: ${data.array ? `[${data.type}]` : data.type},
      required: ${data.required},
      unique: ${data.unique},
      default: ${data.defaultValue}
    }`;
};

const getRequiredModule = () => {
  return `const mongoose = require('mongoose');\n const Schema = mongoose.Schema;`;
};

const generateModel = (datas, modelName) => {
  let newArr = datas.map((data) => formatObj(data));
  const template = `${getRequiredModule()}\n\n const ${modelName} = new mongoose.Schema({\t\t\t\t${newArr.join(
    ","
  )} \n})`;
  return template;
};

export default generateModel;
