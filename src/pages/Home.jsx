import ListboxLink from "../components/ListboxLink.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  return (
    <div className="flex mt-4">
      <div className="w-1/3 text-left">
        <ListboxLink/>
      </div>
      <div className="h-56 sm:h-64 xl:h-80 w-2/3 2xl:h-96">

      </div>
      <div className="xl:mt-14">
        <h1 className="text-left text-2xl font-semibold subpixel-antialiased">Explore Our Products</h1>
        <div className="grid xl:grid-cols-4 gap-3.5 mt-5">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </div>
    </div>
  )
}