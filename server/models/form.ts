import mongoose, { Schema } from "mongoose";

const FormSchema = new Schema(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bgCode: {
      type: String,
      required: true,
    },
    colorCode: {
      type: String,
      required: true,
    },
    sections: {
      required: true,
      type: [
        {
          title: {
            type: String,
          },
          description: {
            type: String,
          },
          fields: {
            required: true,
            type: [
              {
                title: String,
                description: String,
                fieldType: {
                  type: String,
                  required: true,
                },
                options: {
                  default: null,
                  type: [String],
                },
                other: {
                  default: false,
                  type: Boolean,
                },
                rules: {
                  default: {},
                  type: {
                    required: {
                      value: Boolean,
                      message: Boolean,
                    },
                    pattern: {
                      value: Boolean,
                      message: String,
                    },
                    minlength: {
                      value: Boolean,
                      message: Boolean,
                    },
                    maxlength: {
                      value: Boolean,
                      message: String,
                    },
                    min: {
                      value: Boolean,
                      message: Boolean,
                    },
                    max: {
                      value: Boolean,
                      message: String,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Form", FormSchema);
