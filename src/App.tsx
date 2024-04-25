import { ChangeEvent, useEffect, useState } from "react";
import Car from "./components/cars";
import { CarTypes } from "./types";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

function App() {
  const [cars, setCars] = useState<CarTypes[]>([]);
  const [limit, setLimit] = useState<number>(localStorage.getItem("limit") ? JSON.parse(localStorage.getItem("limit")!) : 6);
  const [currentPage, setCurrentPage] = useState<number>(localStorage.getItem("page") ? JSON.parse(localStorage.getItem("page")!) : 1);
  const [total, setTotal] = useState<number>(1);
  const navigate = useNavigate();
  const params = useParams();

  async function getData(limit: number, currentPage: number) {
    try {
      const data = await fetch(
        `http://localhost:3000/machines?limit=${limit}&page=${params.id}`
      );
      const response = await data.json();
      setCars(response.results);
      setTotal(response.total);
      console.log(currentPage);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData(limit, currentPage);
  }, []);

  function handleChange(e: ChangeEvent<unknown>, count: number) {
    console.log(e);
    setCurrentPage(count);
    localStorage.setItem("page", JSON.stringify(count));
  }

  useEffect(() => {
    getData(limit, currentPage);
  }, [currentPage, limit]);

  return (
    <>
      <h1 className="text-center mt-3 text-lg">Cars</h1>
      <select
        defaultValue={limit}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setLimit(Number(e.target?.value));
          localStorage.setItem("limit", JSON.stringify(e.target?.value))
        }}
        style={{ width: "80px", height: "30px", outline: "none" }}
        name="select"
        className="d-block fs-5 mx-auto"
        id="select"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
      <div className="container mt-3 d-flex justify-content-between flex-wrap">
        {cars && cars.map((el, index) => <Car data={el} key={index} />)}
      </div>
      <div className="container py-5">
        <Pagination
          defaultPage={currentPage}
          onChange={(event: ChangeEvent<unknown>, page: number) => {
            handleChange(event, page);
            navigate(`/${page}`);
          }}
          count={Math.trunc(total / limit)}
          variant="outlined"
          color="secondary"
        />
      </div>
    </>
  );
}

export default App;