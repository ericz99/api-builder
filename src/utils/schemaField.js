const SCHEMA_FIELD = {
  propertyName: {
    input: "input",
    name: "Property Name",
    required: true,
  },
  array: {
    input: "select",
    options: ["true", "false"],
    name: "Array",
    required: true,
  },
  type: {
    input: "select",
    options: ["String", "Number", "Date", "Buffer", "Boolean", "ObjectId"],
    name: "Type",
    required: true,
  },
  default: {
    input: "input",
    name: "Default Value",
    required: false,
  },
  required: {
    input: "select",
    options: ["true", "false"],
    name: "Required",
    required: true,
  },
  unique: {
    input: "select",
    options: ["true", "false"],
    name: "Unique",
    required: true,
  },
};

export default SCHEMA_FIELD;
