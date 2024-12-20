import Banner from "@/components/banner";
import Container from "@/components/container";
import Facilities from "@/components/facilities";
import ProductList from "@/components/productList";

export default function Home() {
  return (
    <Container className="py-10">
      <Banner />
      <Facilities />
      <ProductList />
    </Container>
  );
}
