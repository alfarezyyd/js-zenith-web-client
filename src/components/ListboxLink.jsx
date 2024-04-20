import {Listbox, ListboxItem} from "@nextui-org/react";
import {Link} from "@nextui-org/react";

export default function ListboxLink() {
  return (
    <Listbox
      aria-label="Actions"
      onAction={(key) => alert(key)}
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      <ListboxItem key="new" color="default"><Link href="#" size="sm" underline="hover">Default
        Link</Link></ListboxItem>
      <ListboxItem key="copy"><Link href="#" size="sm" underline="hover">Default Link</Link></ListboxItem>
      <ListboxItem key="copy"><Link href="#" size="sm" underline="hover">Default Link</Link></ListboxItem>
      <ListboxItem key="copy"><Link href="#" size="sm" underline="hover">Default Link</Link></ListboxItem>
    </Listbox>
  );
}
