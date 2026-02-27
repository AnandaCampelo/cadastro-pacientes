import { takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginSuccess } from "./authSlice";
import type { LoginResponse } from "@/types/auth";

function* handleLoginSuccess(
  action: PayloadAction<LoginResponse>
): Generator {
  try {
    if (action.payload.accessToken) {
      yield localStorage.setItem("accessToken", action.payload.accessToken);
    }
  } catch {
  }
}

export function* authSaga() {
  yield takeLatest(loginSuccess.type, handleLoginSuccess);
}
