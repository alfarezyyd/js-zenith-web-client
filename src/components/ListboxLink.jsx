import {Link} from "@nextui-org/react";

export default function ListboxLink() {
  return (
    <div
      aria-label="Actions"
      className="flex flex-col gap-4 p-3 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
    >
      <Link href="#" color="foreground" underline="hover">Foreground</Link>
      <Link href="#" color="foreground" underline="hover">Primary</Link>
      <Link href="#" color="foreground" underline="hover">Secondary</Link>
      <Link href="#" color="foreground" underline="hover">Success</Link>
      <Link href="#" color="foreground" underline="hover">Warning</Link>
      <Link href="#" color="foreground" underline="hover">Danger</Link>
    </div>
  );
}
