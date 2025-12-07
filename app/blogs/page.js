import TitleSection from "@/components/TitleSection";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600 text-lg">
          Latest blog posts coming soon!
        </p>
      </div>
    </>
  );
};

export default Blogs;
