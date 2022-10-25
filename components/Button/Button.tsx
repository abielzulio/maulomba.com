import { ButtonProps } from "types/component"

const Button = (props: ButtonProps) => {
  const { icon = "+", title = "Button", kind = "primary" } = props
  return (
    <button
      className={`flex w-full items-center gap-[10px] rounded-full border-[1.5px] py-[10px] px-[20px] text-sm transition md:w-max ${
        kind === "primary"
          ? `border-white border-opacity-20 bg-blue-500 text-white hover:shadow-xl hover:shadow-blue-500/40`
          : `border-blue-500 border-opacity-20 bg-blue-500 bg-opacity-10 text-blue-500 hover:border-opacity-50`
      }`}
      {...props}
    >
      {icon}
      <span className="text-left font-semibold">{title}</span>
    </button>
  )
}

export default Button