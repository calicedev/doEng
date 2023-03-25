import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "axios"

const InteractionComp = function () {
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { taleId, sceneorder } = useParams()
  // const { isLoading, error, data } = useQuery(
  //   [`tale`, taleId, sceneorder],
  //   function () {
  //     return apiRequest({ method: `get`, url: ``, data: {} }).then(
  //       (res) => res.data,
  //     )
  //   },
  // )
  const { mutate, mutateAsync } = useMutation(function () {
    return apiRequest({
      method: ``,
      url: ``,
    })
  }, {})

  const getUserCamera = function () {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user", frameRate: { ideal: 20, max: 30 } },
        audio: false,
      })
      .then((stream) => {
        if (videoRef.current) {
          let video = videoRef.current
          video.srcObject = stream
          video.play()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const setCanvas = useCallback(function (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) {
    const devicePixelRatio = window.devicePixelRatio ?? 1
    if (canvas && ctx) {
      canvas.style.width = 640 + "px"
      canvas.style.height = 480 + "px"
      canvas.width = 640 * devicePixelRatio
      canvas.height = 480 * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
  },
  [])
  const [imgURL, setImgURL] = useState<string>("")

  const animate = useCallback(
    function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      ctx.clearRect(0, 0, 640, 480)
      if (videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, 640, 480)
      }
    },
    [videoRef],
  )

  useEffect(
    function () {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext(`2d`)
      if (canvas && ctx) {
        setCanvas(canvas, ctx)
        let requestId: number
        const requestAnimation = function () {
          requestId = window.requestAnimationFrame(requestAnimation)
          animate(ctx, canvas)
        }

        requestAnimation()
        return function () {
          window.cancelAnimationFrame(requestId)
        }
      }
    },
    [animate, canvasRef, setCanvas],
  )

  useEffect(
    function () {
      getUserCamera()
    },
    [videoRef],
  )

  useEffect(
    function () {
      const a = setInterval(function () {
        const url = canvasRef.current?.toDataURL()!
        setImgURL(() => url)
        // console.log(url)
        console.log("ㅎㅇ")
      }, 1000)

      // return clearInterval(a)
      if (!canvasRef.current) {
        return clearInterval(a)
      }
    },
    [canvasRef],
  )

  return (
    <>
      <video ref={videoRef} className="hidden" />
      {!isDrawing ? (
        <canvas ref={canvasRef} className={`interaction-video`} />
      ) : (
        <canvas />
      )}
    </>
  )
}

export default InteractionComp
