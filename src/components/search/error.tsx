import { Result, ResultCode } from "@/lib/types";
import React from "react";

export default function ErrorMessages({
  state,
}: {
  state: Result | undefined;
}) {
  if (state?.code === ResultCode.UnknownError) {
    return (
      <div className="text-red-600">
        <h3>An error occurred, please try again.</h3>
      </div>
    );
  }

  if (state?.code === ResultCode.MinLengthError) {
    return (
      <div className="text-red-600">
        <h3>
          Please enter at least 2 characters to start searching wikipedia.
        </h3>
      </div>
    );
  }

  return null;
}
