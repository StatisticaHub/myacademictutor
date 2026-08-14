"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import {
  getPythonLessonChallenge,
} from "@/lib/python-practice/python-for-data-analysis";

import {
  restartPythonRuntime,
  runPython,
} from "@/lib/python-runtime/client";

import type {
  PythonRunResult,
} from "@/lib/python-runtime/types";


type Props = {
  title: string;
  code: string;
  language?: string;
  expectedOutput?: string;
  note?: string;
  caption?: string;
};


function getLessonKey(
  pathname:
    string
) {
  const parts =
    pathname
    .split("/")
    .filter(
      Boolean
    );


  const index =
    parts.indexOf(
      "learn"
    );


  return index >=
      0
    ? parts[
        index +
        1
      ] ??
      ""
    : "";
}


function OutputPanel({
  result,
  running,
  error,
}: {
  result:
    PythonRunResult |
    null;
  running:
    boolean;
  error:
    string;
}) {
  const text =
    [
      result?.stdout,
      result?.stderr,
      result?.result,
    ]
    .filter(
      Boolean
    )
    .join(
      "\n"
    );


  return (
    <div className="live-python-output">
      <div className="live-python-output-head">
        <span>
          Output
        </span>

        {result && (
          <small>
            {result.durationMs}
            ms
          </small>
        )}
      </div>

      {running && (
        <div className="live-python-runtime-message">
          <span className="live-python-spinner" />

          Preparing Python and running your code…
        </div>
      )}

      {!running &&
        error && (
        <div className="live-python-friendly-error">
          <strong>
            Python could not run this code.
          </strong>

          <pre>
            {error}
          </pre>
        </div>
      )}

      {!running &&
        !error &&
        text && (
        <pre>
          {text}
        </pre>
      )}

      {!running &&
        !error &&
        !result && (
        <div className="live-python-empty">
          Run the code to see its output here.
        </div>
      )}

      {!running &&
        !error &&
        result &&
        !text &&
        result.figures.length ===
          0 && (
        <div className="live-python-empty">
          Code completed successfully.
        </div>
      )}

      {result?.figures.map(
        (
          figure,
          index
        ) => (
          <div
            className="live-python-figure"
            key={`${index}-${figure.slice(0, 18)}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`Python-generated figure ${index + 1}`}
              src={`data:image/png;base64,${figure}`}
            />
          </div>
        )
      )}
    </div>
  );
}


function LessonChallenge({
  lessonKey,
}: {
  lessonKey:
    string;
}) {
  const challenge =
    getPythonLessonChallenge(
      lessonKey
    );


  if (
    !challenge
  ) {
    return null;
  }


  const activeChallenge =
    challenge;


  const challengePackages =
    activeChallenge.packages ??
    [];


  const storageKey =
    `mat-python-challenge:${lessonKey}`;


  const [
    code,
    setCode,
  ] =
    useState(
      activeChallenge.starterCode
    );


  const [
    result,
    setResult,
  ] =
    useState<
      PythonRunResult |
      null
    >(
      null
    );


  const [
    running,
    setRunning,
  ] =
    useState(
      false
    );


  const [
    error,
    setError,
  ] =
    useState(
      ""
    );


  const [
    showHint,
    setShowHint,
  ] =
    useState(
      false
    );


  const [
    showSolution,
    setShowSolution,
  ] =
    useState(
      false
    );


  useEffect(
    () => {
      const saved =
        window.localStorage.getItem(
          storageKey
        );


      if (
        saved !==
        null
      ) {
        setCode(
          saved
        );
      }
    },
    [
      storageKey,
    ]
  );


  useEffect(
    () => {
      window.localStorage.setItem(
        storageKey,
        code
      );
    },
    [
      code,
      storageKey,
    ]
  );


  const tests =
    result?.tests ??
    [];


  const passedCount =
    tests.filter(
      (
        item
      ) =>
        item.passed
    ).length;


  const allPassed =
    tests.length >
      0 &&
    passedCount ===
      tests.length;


  async function execute(
    check:
      boolean
  ) {
    setRunning(
      true
    );

    setResult(
      null
    );

    setError(
      ""
    );


    try {
      const next =
        await runPython({
          action:
            check
              ? "check"
              : "run",
          code,
          packages:
            challengePackages,
          tests:
            check
              ? activeChallenge.tests
              : undefined,
        });


      setResult(
        next
      );


      if (
        !next.ok
      ) {
        setError(
          next.error ||
          "Python could not complete this run."
        );
      }
    } catch (
      nextError
    ) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : String(
              nextError
            )
      );
    } finally {
      setRunning(
        false
      );
    }
  }


  function reset() {
    setCode(
      activeChallenge.starterCode
    );

    setResult(
      null
    );

    setError(
      ""
    );

    setShowSolution(
      false
    );

    window.localStorage.removeItem(
      storageKey
    );
  }


  return (
    <section className="python-lesson-challenge">
      <div className="python-challenge-kicker">
        Lesson coding challenge
      </div>

      <div className="python-challenge-heading">
        <div>
          <h4>
            {activeChallenge.title}
          </h4>

          <p>
            {activeChallenge.instructions}
          </p>
        </div>

        <div className="python-package-pills">
          {(challengePackages.length
            ? challengePackages
            : [
                "Python",
              ]
          ).map(
            (
              item
            ) => (
              <span
                key={item}
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>

      <textarea
        aria-label={`${activeChallenge.title} Python code`}
        className="live-python-editor python-challenge-editor"
        onChange={(event) =>
          setCode(
            event.target.value
          )
        }
        onKeyDown={(event) => {
          if (
            (
              event.metaKey ||
              event.ctrlKey
            ) &&
            event.key ===
              "Enter"
          ) {
            event.preventDefault();

            void execute(
              false
            );
          }
        }}
        spellCheck={false}
        value={code}
      />

      <div className="live-python-toolbar">
        <button
          className="live-python-run"
          disabled={running}
          onClick={() =>
            void execute(
              false
            )
          }
          type="button"
        >
          {running
            ? "Running…"
            : "Run"}
        </button>

        <button
          className="live-python-check"
          disabled={running}
          onClick={() =>
            void execute(
              true
            )
          }
          type="button"
        >
          Check answer
        </button>

        <button
          disabled={running}
          onClick={reset}
          type="button"
        >
          Reset
        </button>
      </div>

      <OutputPanel
        error={error}
        result={result}
        running={running}
      />

      {tests.length >
        0 && (
        <div className={`python-test-results ${
          allPassed
            ? "passed"
            : ""
        }`}>
          <div className="python-test-summary">
            <strong>
              {passedCount}
              /
              {tests.length}
              {" "}
              tests passed
            </strong>

            {allPassed && (
              <span>
                {activeChallenge.successMessage}
              </span>
            )}
          </div>

          <div className="python-test-grid">
            {tests.map(
              (
                item
              ) => (
                <div
                  className={
                    item.passed
                      ? "passed"
                      : "failed"
                  }
                  key={item.name}
                >
                  <span>
                    {item.passed
                      ? "✓"
                      : "×"}
                  </span>

                  <div>
                    <p>
                      {item.name}
                    </p>

                    {item.message && (
                      <small>
                        {item.message}
                      </small>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div className="python-challenge-help">
        <button
          onClick={() =>
            setShowHint(
              (
                current
              ) =>
                !current
            )
          }
          type="button"
        >
          {showHint
            ? "Hide hint"
            : "Show hint"}
        </button>

        <button
          onClick={() =>
            setShowSolution(
              (
                current
              ) =>
                !current
            )
          }
          type="button"
        >
          {showSolution
            ? "Hide solution"
            : "Show solution"}
        </button>
      </div>

      {showHint && (
        <div className="python-hint">
          <strong>
            Hint
          </strong>

          <p>
            {activeChallenge.hint}
          </p>
        </div>
      )}

      {showSolution && (
        <div className="python-solution">
          <div>
            <strong>
              One solution
            </strong>

            <button
              onClick={() =>
                setCode(
                  activeChallenge.solution
                )
              }
              type="button"
            >
              Load into editor
            </button>
          </div>

          <pre>
            <code>
              {activeChallenge.solution}
            </code>
          </pre>
        </div>
      )}

      <div className="python-local-save">
        Your practice code is saved automatically in this browser.
      </div>
    </section>
  );
}


export default function RunnablePythonExample({
  title,
  code:
    initialCode,
  language =
    "python",
  expectedOutput,
  note,
  caption,
}: Props) {
  const pathname =
    usePathname();


  const lessonKey =
    useMemo(
      () =>
        getLessonKey(
          pathname
        ),
      [
        pathname,
      ]
    );


  const challenge =
    getPythonLessonChallenge(
      lessonKey
    );


  const showChallenge =
    challenge
      ?.anchorTitle ===
    title;


  const storageKey =
    `mat-python-example:${pathname}:${title}`;


  const [
    code,
    setCode,
  ] =
    useState(
      initialCode
    );


  const [
    result,
    setResult,
  ] =
    useState<
      PythonRunResult |
      null
    >(
      null
    );


  const [
    running,
    setRunning,
  ] =
    useState(
      false
    );


  const [
    error,
    setError,
  ] =
    useState(
      ""
    );


  const [
    showReference,
    setShowReference,
  ] =
    useState(
      false
    );


  useEffect(
    () => {
      const saved =
        window.localStorage.getItem(
          storageKey
        );


      if (
        saved !==
        null
      ) {
        setCode(
          saved
        );
      }
    },
    [
      storageKey,
    ]
  );


  useEffect(
    () => {
      window.localStorage.setItem(
        storageKey,
        code
      );
    },
    [
      code,
      storageKey,
    ]
  );


  async function execute() {
    setRunning(
      true
    );

    setResult(
      null
    );

    setError(
      ""
    );


    try {
      const next =
        await runPython({
          action:
            "run",
          code,
        });


      setResult(
        next
      );


      if (
        !next.ok
      ) {
        setError(
          next.error ||
          "Python could not complete this run."
        );
      }
    } catch (
      nextError
    ) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : String(
              nextError
            )
      );
    } finally {
      setRunning(
        false
      );
    }
  }


  function reset() {
    setCode(
      initialCode
    );

    setResult(
      null
    );

    setError(
      ""
    );

    window.localStorage.removeItem(
      storageKey
    );
  }


  return (
    <>
      <section className="lesson-code-example live-python-example">
        <div className="lesson-code-header live-python-head">
          <div>
            <span>
              {language}
            </span>

            <strong>
              {title}
            </strong>
          </div>

          <div className="live-python-badges">
            <span>
              Live
            </span>

            <span>
              Browser Python
            </span>
          </div>
        </div>

        <textarea
          aria-label={`${title} Python editor`}
          className="live-python-editor"
          onChange={(event) =>
            setCode(
              event.target.value
            )
          }
          onKeyDown={(event) => {
            if (
              (
                event.metaKey ||
                event.ctrlKey
              ) &&
              event.key ===
                "Enter"
            ) {
              event.preventDefault();

              void execute();
            }
          }}
          spellCheck={false}
          value={code}
        />

        <div className="live-python-toolbar">
          <button
            className="live-python-run"
            disabled={running}
            onClick={() =>
              void execute()
            }
            type="button"
          >
            {running
              ? "Running…"
              : "Run Python"}
          </button>

          <button
            disabled={running}
            onClick={reset}
            type="button"
          >
            Reset code
          </button>

          <button
            disabled={running}
            onClick={() => {
              restartPythonRuntime();

              setResult(
                null
              );

              setError(
                ""
              );
            }}
            type="button"
          >
            Restart runtime
          </button>
        </div>

        <OutputPanel
          error={error}
          result={result}
          running={running}
        />

        {expectedOutput && (
          <div className="live-python-reference">
            <button
              onClick={() =>
                setShowReference(
                  (
                    current
                  ) =>
                    !current
                )
              }
              type="button"
            >
              {showReference
                ? "Hide reference output"
                : "Show reference output"}
            </button>

            {showReference && (
              <pre>
                <code>
                  {expectedOutput}
                </code>
              </pre>
            )}
          </div>
        )}

        {note && (
          <p className="lesson-code-note">
            {note}
          </p>
        )}

        {caption && (
          <p className="live-python-caption">
            {caption}
          </p>
        )}

        <div className="python-local-save">
          Your edits are saved automatically on this device.
        </div>
      </section>

      {showChallenge && (
        <LessonChallenge
          lessonKey={
            lessonKey
          }
        />
      )}
    </>
  );
}
