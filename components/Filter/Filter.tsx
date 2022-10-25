import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const filteroptions = [
  { title: "UI/UX" },
  { title: "Frontend" },
  { title: "Backend" },
  { title: "Fullstack" },
  { title: "Mobile" },
  { title: "DevOps" },
  { title: "Data Science" },
  { title: "Machine Learning" },
]

const Filter = () => {
  return (
    <div className="sticky top-[0px] z-20 flex w-full flex-col">
      <span className="-mb-[10px] h-[40px] w-full bg-black" />
      <div className="mb-[30px] flex min-h-min flex-col gap-[10px] bg-black pb-[20px] shadow-xl shadow-black md:flex-row md:gap-[30px]">
        <div className="flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white border-opacity-20 bg-white bg-opacity-5 py-[10px] px-[20px] text-sm text-white transition hover:border-opacity-50 focus:border-opacity-100 focus:bg-opacity-50 md:w-max">
          <MagnifyingGlassIcon className="h-[18px] w-[18px]" />
          <input
            className="w-min bg-transparent placeholder:text-white focus:outline-none"
            type="text"
            placeholder="Cari lomba..."
          />
        </div>
        <div className="flex flex-row gap-[20px]">
          {filteroptions.map((option) => (
            <div className="flex items-center gap-[10px] text-sm">
              <input type="checkbox" />
              <p>{option.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filter