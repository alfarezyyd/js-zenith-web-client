// pages/products/[slug].js
import {useRouter} from 'next/router';

const ProductPage = () => {
  const router = useRouter();
  const {slug} = router.query;

  return (
    <div>
      <h1>Product Page: {slug}</h1>
      {/* Tampilkan informasi produk berdasarkan slug */}
    </div>
  );
};

export default ProductPage;
