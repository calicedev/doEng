interface commonButtonProp {
  size: string
  w?: string
  h?: string
  br?: string
  p?: string
  m?: string
  color?: string
}

const commonLoginButtonClasses: () => string = function () {
  return `sign-outlet-container h-full w-full rounded-[22px] flex items-center justify-center`
}

const customButtonClasses = function (): string {
  let classes: string

  return ``
}

export { commonLoginButtonClasses }
