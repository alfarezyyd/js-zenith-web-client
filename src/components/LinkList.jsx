export default function LinkList() {
  return (
    <div className="flex">
      <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400 text-left">
        <li>
          At least 10 characters (and up to 100 characters)
        </li>
        <li>
          At least one lowercase character
        </li>
        <li>
          Inclusion of at least one special character, e.g., ! @ # ?
        </li>
      </ul>
      <div
        className="ml-2 rounded inline-block h-56 sm:h-64 xl:h-80 2xl:h-96 min-h-[1em] w-0.5 self-stretch bg-gray-300 dark:bg-white/10"></div>
    </div>
  )
}