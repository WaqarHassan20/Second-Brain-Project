export function Welcome() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <p className="lg:text-4xl text-2xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-2">
          Welcome to
        </p>

        <div className="flex justify-center items-center gap-4">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-18 h-18 stroke-current text-black dark:text-white" // Tailwind classes for size and color
          >
            <defs>
              <style>
                {`
            .cls-1 {
              fill: none;
              stroke: currentColor;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 2px;
            }
          `}
              </style>
            </defs>
            <path
              className="cls-1"
              d="M28.46 4H29a14 14 0 0 1 14 14v12a14 14 0 0 1-14 14h-.5a4.46 4.46 0 0 1-4.5-4.46V8.46A4.46 4.46 0 0 1 28.46 4z"
            />
            <path
              className="cls-1"
              d="M9.46 4H10a14 14 0 0 1 14 14v12a14 14 0 0 1-14 14h-.5A4.46 4.46 0 0 1 5 39.54V8.46A4.46 4.46 0 0 1 9.46 4z"
              transform="rotate(180 14.5 24)"
            />
            <path
              className="cls-1"
              d="m36.53 6.48-4.92 4.21 2.85 6.41M43 17.1s-6.4 7.83-9.25 6.4M35.88 27.9l6.89 4.98M38.02 30.04l-4.27 2.13M6.08 15s6.33 2.56 6.33 7.54M9.79 17.33l3.33-3.37M8.45 38.9l4.67-8.57M10.78 34.61s3-1.44 4.47 0M17.29 4.17l-.33 4.1M20 21.79l4 1.28"
            />
            <path className="cls-1" d="M-292-20h700v700h-700z" />
          </svg>

          <h1 className="text-transparent font-extrabold text-center bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 text-3xl lg:text-5xl">
            Second Brain
          </h1>
        </div>

        <div className="w-full max-w-md bg-green-00 py-8 mx-auto px-4">
          <p className="text-gray-600 dark:text-gray-300 leading-loose text-center max-w-xl mx-auto px-4">
            {/* Welcome to{" "} */}
            <span className="font-semibold text-blue-500">Second Brain</span> -
            Save, organize, and access your most valuable links and posts - all
            in one place.
            <br />
        
            <span className="italic tracking-wider bg-fuchsia-900 rounded-sm text-gray-300 py-1 px-3 font-bold text-lg">
              Great ideas come from collaboration
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
