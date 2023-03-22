import {
  PropsWithChildren,
  memo,
  RefObject,
  useState,
  useCallback,
} from "react"
import { useCanvas } from "../../../hooks/useCanvas"
// import { SecondWaveBackground } from "./SecondWaveBackground"

interface Props {
  canvasWidth: number
  canvasHeight: number
  videoRef: RefObject<HTMLVideoElement>
}

const WebCam = function ({
  canvasWidth,
  canvasHeight,
  videoRef,
}: PropsWithChildren<Props>) {
  const [imgURL, setImgURL] = useState<string>("")
  const animate = useCallback(
    function (ctx: CanvasRenderingContext2D): void {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      if (videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, canvasWidth, canvasHeight)
        if (canvasRef.current) {
          const url = canvasRef.current?.toDataURL()
          setImgURL(() => url.slice(22))
          // console.log("하이")
        }
      }
    },
    [videoRef.current],
  )

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return (
    <>
      <canvas ref={canvasRef} />
      {/* <img src={imgURL} /> */}
    </>
  )
}

export default memo(WebCam)
