// src/utils/ErrorEmitter.js
import EventEmitter from "events";

const errorEmitter = new EventEmitter();

export const emitError = (message) => {
  errorEmitter.emit("error", message);
};

export const onError = (callback) => {
  errorEmitter.on("error", callback);
};

export const offError = (callback) => {
  errorEmitter.off("error", callback);
};
