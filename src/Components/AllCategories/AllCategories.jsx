import { CircularProgress, Container, Fade } from "@mui/material";
import CategoryCard from "../CategoryCard/CategoryCard";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { useEffect, useState } from "react";
import loader from "../../assets/gifs/loader.gif";
const AllCategories = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  window.scroll({ top: 0 });
  const getCategoryData = async () => {
    try {
      
      const response = await axios.get(BASE_URL + "category");

      setCategory(response.data);
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <main className="min-h-screen space-y-5 pt-20 mb-9">
      <Fade in={true}>
        <Container className="xl:space-y-10 sm:space-y-8 space-y-6">
          {/* Title */}
          <h1 className="pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize">
            All Categories
          </h1>
          {/* All Category Cards */}
          {loading ? (
            <div className="w-full h-full grid place-items-center">

<CircularProgress />
            </div>
           
          ) : (
            <section className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
              {category.map((data) => (
                <CategoryCard key={data.id} shadow={true} category={data} />
              ))}
            </section>
          )}
        </Container>
      </Fade>
    </main>
  );
};

export default AllCategories;
