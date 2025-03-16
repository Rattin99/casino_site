const TitleSection = ({ title, description, image }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center pt-12 relative flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600">
          {title}
        </h1>
        <p className="text-gray-600 max-w-2xl mt-4">{description} </p>
      </div>
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img
          src={image}
          alt="Casino Hero"
          className="w-full max-w-sm md:max-w-md"
        />
      </div>
    </div>
  );
};

export default TitleSection;
