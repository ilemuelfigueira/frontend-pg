import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function SubHeader({
  mainColumnList = [],
  className = "",
  ...props
}) {
  if (mainColumnList.length == 0) return "";
  return (
    <aside
      className={twMerge(
        "absolute left-0 top-0 z-10 mt-16 h-fit grid w-screen grid-cols-1 gap-6 overflow-visible bg-black/95 px-[72px] py-[28px] md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      onFocus={() => console.log('focus')}
      onBlur={() => console.log('blur')}
      {...props}
    >
      {mainColumnList.map((list, mainColumnListIndex) => (
        <ul key={'mainColumn-' + mainColumnListIndex} className="grid h-fit w-full grid-flow-row grid-cols-1 place-items-start gap-4">
          {list.map((column) => (
            <li key={column.title}>
              <span className="text-xs font-normal text-[#929292]">
                {column.title}
              </span>
              <ul className="flex w-full flex-col items-start gap-1">
                {column.items.map((item) => (
                  <li
                    key={item.href + item.label}
                    data-is-big={mainColumnListIndex == 0}
                    className="text-sm text-white data-[is-big=true]:text-2xl data-[is-big=true]:font-semibold"
                  >
                    <Link href={item.href} target="_blank">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ))}
    </aside>
  );
}
