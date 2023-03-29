import LinearTracking from "components/CanvasComponents/MouseTracking/LinearTracking"
import Wave from "components/CanvasComponents/Wave/Wave"
import { useWidthHeight } from "hooks/useWidthHwight"
import { PropsWithChildren, useRef, useState } from "react"
import styles from "./CommonLoading.module.css"
interface Props {
  isLoading?: boolean
}
const CommonLoading = function ({
  isLoading = true,
  children,
}: PropsWithChildren<Props>) {
  const divRef = useRef<HTMLDivElement>(null)
  const { width, height } = useWidthHeight(divRef)

  return (
    <>
      <div className={`w-full h-full blur-sm canvas-under-bg-container`}>
        <Wave canvasWidth={width} canvasHeight={height} />
      </div>
      <div
        ref={divRef}
        className="h-full w-full flex items-center justify-center"
      >
        <LinearTracking canvasWidth={width} canvasHeight={height} />
      </div>
      <div className="absolute h-auto w-auto top-[20%] left-[50%] z-50 translate-x-[-50%]">
        {children}
      </div>
      <div
        className={`absolute bottom-0 box-border h-full w-full flex flex-row items-center gap-0 ${
          styles[`loading-container`]
        }`}
      >
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_0.11s_infinite]`}
        ></div>
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_0.22s_infinite]`}
        ></div>
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_0.33s_infinite]`}
        ></div>
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_0.44s_infinite]`}
        ></div>
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_0.55s_infinite]`}
        ></div>
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_0.66s_infinite]`}
        ></div>
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_0.77s_infinite]`}
        ></div>
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_0.88s_infinite]`}
        ></div>
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_0.99s_infinite]`}
        ></div>
        <div
          className={`box-border ${
            styles[`loading-bar`]
          } animate-[loading-box_4s_ease-in-out_1.1s_infinite]`}
        ></div>
      </div>
    </>
  )
}

export default CommonLoading
