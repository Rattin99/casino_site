import TitleSection from "@/components/TitleSection";
import BlogList from "@/components/BlogList";

const Blogs = () => {
  const props = {
    title: "Our Blogs",
    description:
      "Stay updated with the latest news, tips, and strategies from the world of betting and casinos. Read our expert articles to enhance your gaming experience.",
    image: "/offer-hero.png",
  };

  return (
    <>
      <TitleSection
        title={props.title}
        description={props.description}
        image={props.image}
      />
      <BlogList />
    </>
  );
};

export default Blogs;
