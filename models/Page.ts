import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// USER SCHEMA
const pageSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      trim: true,
      unique: true,
    },
    assets: {
      type: Object,
    },
    components: {
      type: Object,
    },
    css: {
      type: String,
    },
    html: {
      type: String,
    },
    style: {
      type: String,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
pageSchema.plugin(toJSON);

export default mongoose.models.Page || mongoose.model("Page", pageSchema);
