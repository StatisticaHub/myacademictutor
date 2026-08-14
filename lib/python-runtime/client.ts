import type {
  PythonRunRequest,
  PythonRunResult,
} from "@/lib/python-runtime/types";


type PendingRequest = {
  resolve:
    (
      result:
        PythonRunResult
    ) => void;
  reject:
    (
      error:
        Error
    ) => void;
  timeout:
    ReturnType<
      typeof setTimeout
    >;
};


let worker:
  Worker |
  null =
    null;


const pending =
  new Map<
    string,
    PendingRequest
  >();


function rejectAll(
  message:
    string
) {
  for (
    const [
      id,
      request,
    ]
    of pending
  ) {
    clearTimeout(
      request.timeout
    );

    request.reject(
      new Error(
        message
      )
    );

    pending.delete(
      id
    );
  }
}


function createWorker() {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Python practice is available in the browser only."
    );
  }


  const nextWorker =
    new Worker(
      "/workers/python-course-worker.mjs",
      {
        type:
          "module",
      }
    );


  nextWorker.onmessage =
    (
      event:
        MessageEvent<
          PythonRunResult
        >
    ) => {
      const request =
        pending.get(
          event.data.id
        );


      if (
        !request
      ) {
        return;
      }


      clearTimeout(
        request.timeout
      );

      pending.delete(
        event.data.id
      );

      request.resolve(
        event.data
      );
    };


  nextWorker.onerror =
    (
      event
    ) => {
      rejectAll(
        event.message ||
        "The Python runtime stopped unexpectedly."
      );

      nextWorker.terminate();

      if (
        worker ===
        nextWorker
      ) {
        worker =
          null;
      }
    };


  return nextWorker;
}


function getWorker() {
  if (
    !worker
  ) {
    worker =
      createWorker();
  }


  return worker;
}


export function restartPythonRuntime() {
  if (
    worker
  ) {
    worker.terminate();

    worker =
      null;
  }


  rejectAll(
    "Python runtime restarted."
  );
}


export function runPython(
  request:
    Omit<
      PythonRunRequest,
      "id"
    >,
  timeoutMs =
    30000
) {
  const id =
    crypto.randomUUID();


  const payload:
    PythonRunRequest = {
      ...request,
      id,
    };


  return new Promise<
    PythonRunResult
  >(
    (
      resolve,
      reject
    ) => {
      const runtime =
        getWorker();


      const timeout =
        setTimeout(
          () => {
            pending.delete(
              id
            );

            runtime.terminate();

            if (
              worker ===
              runtime
            ) {
              worker =
                null;
            }


            reject(
              new Error(
                "Execution exceeded 30 seconds. The Python runtime was restarted."
              )
            );
          },
          timeoutMs
        );


      pending.set(
        id,
        {
          resolve,
          reject,
          timeout,
        }
      );


      runtime.postMessage(
        payload
      );
    }
  );
}
