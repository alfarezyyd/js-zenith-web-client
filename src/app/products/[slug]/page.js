// pages/products/[slug].js

const ProductPage = ({params}) => {
  const {slug} = params.slug;

  return (
    <div>
      <h1>Product Page: {params.slug}</h1>
      {/* Tampilkan informasi produk berdasarkan slug */}
    </div>
  );
};

export default ProductPage;
